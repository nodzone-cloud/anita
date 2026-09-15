"""ANITA 0.4.0 order service.

Server-side order creation + email delivery for ANITA.
This module deliberately contains no credentials. Configure SMTP with environment variables.
Intended to be imported by anita_engine.py and called by POST /order/submit.
"""
from __future__ import annotations

import json
import os
import re
import smtplib
import sqlite3
import ssl
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path
from typing import Any, Dict

DB_PATH = Path(os.environ.get("ANITA_ORDER_DB", r"C:\ProgramData\ANITA\orders.sqlite3"))
SMTP_HOST = os.environ.get("ANITA_SMTP_HOST", "posti.zoner.fi")
SMTP_PORT = int(os.environ.get("ANITA_SMTP_PORT", "465"))
SMTP_USER = os.environ.get("ANITA_SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("ANITA_SMTP_PASSWORD", "")
SMTP_FROM = os.environ.get("ANITA_SMTP_FROM", SMTP_USER or "AN@alexnode.fi")
ORDER_TO = os.environ.get("ANITA_ORDER_TO", "AN@alexnode.fi")
SMTP_SSL = os.environ.get("ANITA_SMTP_SSL", "1").strip().lower() not in {"0", "false", "no"}
ORDER_PREFIX = os.environ.get("ANITA_ORDER_PREFIX", "AN").strip().upper() or "AN"


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as con:
        con.execute("PRAGMA journal_mode=WAL")
        con.execute(
            """
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_number TEXT UNIQUE,
                client_token TEXT NOT NULL,
                contact_name TEXT NOT NULL,
                contact_email TEXT,
                contact_phone TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'sent'
            )
            """
        )
        con.execute(
            """
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                project_type TEXT NOT NULL,
                title TEXT,
                payload_json TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY(order_id) REFERENCES orders(id)
            )
            """
        )
        con.execute("CREATE INDEX IF NOT EXISTS idx_orders_client ON orders(client_token)")
        con.execute("CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_id)")


def _clean(value: Any, limit: int = 5000) -> str:
    return str(value or "").strip()[:limit]


def _normalize_order_number(value: Any) -> str:
    s = _clean(value, 32).upper().replace(" ", "")
    if not s:
        return ""
    if not s.startswith("#"):
        s = "#" + s
    if not re.fullmatch(r"#[A-Z]{2,8}-\d{4,12}", s):
        raise ValueError("INVALID_ORDER_NUMBER")
    return s


def _validate_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    if not isinstance(payload, dict):
        raise ValueError("INVALID_PAYLOAD")
    client_token = _clean(payload.get("client_token"), 160)
    if not client_token:
        raise ValueError("MISSING_CLIENT_TOKEN")
    contact = payload.get("contact") or {}
    if not isinstance(contact, dict):
        raise ValueError("INVALID_CONTACT")
    name = _clean(contact.get("name"), 160)
    email = _clean(contact.get("email"), 320)
    phone = _clean(contact.get("phone"), 80)
    if not name:
        raise ValueError("MISSING_CONTACT_NAME")
    if not email and not phone:
        raise ValueError("MISSING_CONTACT_METHOD")
    if email and not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
        raise ValueError("INVALID_EMAIL")
    project = payload.get("project") or {}
    if not isinstance(project, dict):
        raise ValueError("INVALID_PROJECT")
    project_type = _clean(project.get("type") or "other_service", 80)
    title = _clean(project.get("title") or project_type, 240)
    if len(json.dumps(project, ensure_ascii=False)) > 100_000:
        raise ValueError("PROJECT_TOO_LARGE")
    requested = _normalize_order_number(payload.get("requested_order_number")) if payload.get("requested_order_number") else ""
    return {
        "client_token": client_token,
        "contact": {"name": name, "email": email, "phone": phone},
        "project": project,
        "project_type": project_type,
        "title": title,
        "requested_order_number": requested,
        "language": _clean(payload.get("language"), 12),
        "source_url": _clean(payload.get("source_url"), 1000),
    }


def _format_project(project: Dict[str, Any]) -> str:
    ptype = _clean(project.get("type"), 80)
    lines = [f"Project type: {ptype or 'other_service'}"]
    if project.get("title"):
        lines.append(f"Title: {_clean(project.get('title'), 500)}")
    if ptype == "website":
        b = project.get("brief") or {}
        if isinstance(b, dict):
            labels = [
                ("Business", "business"),
                ("Business description", "businessDescription"),
                ("Website goal", "goal"),
                ("Website size", "size"),
                ("Purchase flow", "commerceMode"),
                ("Suggested structure", "recommendedStructure"),
                ("Recommended package", "recommendedPackage"),
            ]
            for label, key in labels:
                if b.get(key):
                    lines.append(f"{label}: {_clean(b.get(key), 3000)}")
            req = b.get("requirements") or []
            if isinstance(req, list) and req:
                lines.append("Confirmed requirements: " + ", ".join(_clean(x, 300) for x in req[:100]))
            lines.append("Needs Alex technical review: " + ("yes" if b.get("needsAlexReview") else "no"))
    else:
        if project.get("request"):
            lines.append("Request: " + _clean(project.get("request"), 5000))
        if project.get("details"):
            lines.append("Details: " + _clean(project.get("details"), 10000))
    return "\n".join(lines)


def _email_body(order_number: str, data: Dict[str, Any], mode: str) -> str:
    c = data["contact"]
    p = [
        "ANITA ORDER",
        f"Order number: {order_number}",
        f"Mode: {'added to existing order' if mode == 'append' else 'new order'}",
        "",
        "CLIENT",
        f"Name: {c['name']}",
        f"Email: {c['email'] or '-'}",
        f"Phone: {c['phone'] or '-'}",
        "",
        "PROJECT",
        _format_project(data["project"]),
    ]
    if data.get("source_url"):
        p += ["", "Source: " + data["source_url"]]
    p += ["", "Prepared and sent automatically by ANITA on alexnode.fi"]
    return "\n".join(p)


def _send_email(order_number: str, data: Dict[str, Any], mode: str) -> None:
    if not SMTP_USER or not SMTP_PASSWORD:
        raise RuntimeError("SMTP_NOT_CONFIGURED")
    msg = EmailMessage()
    msg["From"] = SMTP_FROM
    msg["To"] = ORDER_TO
    action = "Updated order" if mode == "append" else "New order"
    msg["Subject"] = f"[ANITA] {action} {order_number} — {data['title']}"
    msg.set_content(_email_body(order_number, data, mode))
    if SMTP_SSL:
        ctx = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ctx, timeout=20) as smtp:
            smtp.login(SMTP_USER, SMTP_PASSWORD)
            smtp.send_message(msg)
    else:
        ctx = ssl.create_default_context()
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as smtp:
            smtp.ehlo()
            smtp.starttls(context=ctx)
            smtp.ehlo()
            smtp.login(SMTP_USER, SMTP_PASSWORD)
            smtp.send_message(msg)


def submit_order(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Create/append an order and send the project to Alex Node.

    sent=True is returned only after SMTP accepts the message. If anything fails,
    the DB transaction rolls back and the UI must keep the project marked NOT sent.
    """
    data = _validate_payload(payload)
    init_db()
    now = utc_now()
    con = sqlite3.connect(DB_PATH, timeout=20)
    try:
        con.execute("PRAGMA foreign_keys=ON")
        con.execute("BEGIN IMMEDIATE")
        requested = data["requested_order_number"]
        mode = "new"
        if requested:
            row = con.execute(
                "SELECT id, order_number FROM orders WHERE order_number=? AND client_token=?",
                (requested, data["client_token"]),
            ).fetchone()
            if not row:
                raise ValueError("ORDER_NOT_FOUND_FOR_CLIENT")
            order_id, order_number = int(row[0]), str(row[1])
            mode = "append"
            con.execute(
                "UPDATE orders SET contact_name=?, contact_email=?, contact_phone=?, updated_at=? WHERE id=?",
                (data["contact"]["name"], data["contact"]["email"], data["contact"]["phone"], now, order_id),
            )
        else:
            cur = con.execute(
                "INSERT INTO orders(order_number,client_token,contact_name,contact_email,contact_phone,created_at,updated_at,status) VALUES(NULL,?,?,?,?,?,?,?)",
                (data["client_token"], data["contact"]["name"], data["contact"]["email"], data["contact"]["phone"], now, now, "pending"),
            )
            order_id = int(cur.lastrowid)
            order_number = f"#{ORDER_PREFIX}-{order_id:04d}"
            con.execute("UPDATE orders SET order_number=? WHERE id=?", (order_number, order_id))
        con.execute(
            "INSERT INTO projects(order_id,project_type,title,payload_json,created_at) VALUES(?,?,?,?,?)",
            (order_id, data["project_type"], data["title"], json.dumps(data["project"], ensure_ascii=False), now),
        )
        _send_email(order_number, data, mode)
        con.execute("UPDATE orders SET status='sent', updated_at=? WHERE id=?", (now, order_id))
        con.commit()
        return {"ok": True, "sent": True, "order_number": order_number, "mode": mode}
    except Exception:
        con.rollback()
        raise
    finally:
        con.close()
