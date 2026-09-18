# ANITA 51 — Human-Tech dialogue core

ANITA 51 is a clean experimental architecture. It does not modify `anita50` or `grok-v02-test`.

## Principle
Human speaks naturally. Code owns truth, state and actions. AI helps understand meaning and phrase natural replies.

Pipeline:
1. Context + current pending question
2. Intent classification
3. Sector routing: Human / Guide / Secretary / IT
4. Sector logic updates state
5. AI may interpret ambiguous language or phrase a reply
6. Deterministic facts/actions are never invented by AI

## Hard rules
- One central DialogueState is the source of truth.
- A pending question survives clarification/side questions.
- Confirmed facts and inferred suggestions are separate.
- Never promote an inference into a confirmed fact without user evidence.
- Prices, contacts, handoff results and other business facts come from deterministic data/actions.
- Natural language does not require exact scripted phrases.
- Buttons are fallbacks generated from pending-question options.
- A single message may contain small talk + real intent; real intent must not be discarded.

## Regression invariant
If Secretary asks what business/project the site is for and the user answers `book shop`, only `business = "book shop"` is confirmed. ANITA must next ask what visitors should be able to do. It must NOT infer booking, online store, page count, or a completed brief.
