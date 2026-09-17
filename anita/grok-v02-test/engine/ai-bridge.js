/* ANITA Engine Experiment — AI bridge (optional fallback) */
(function (root) {
  "use strict";
  const W = (root.ANITA50 = root.ANITA50 || {});
  const C = root.ANITA50_CONFIG || {};

  function isLocal() {
    return location.protocol === "file:" ||
      ["localhost", "127.0.0.1"].includes(location.hostname);
  }

  const AI = {
    endpoint() {
      return C.engineUrl || (isLocal() ? C.localDevEngineUrl : "") || "";
    },

    async ask(text, language, meta) {
      const url = this.endpoint();
      if (!url) return { ok: false, reason: "no_endpoint" };

      const human = (W.engine.Human && W.engine.Human.promptAddition)
        ? W.engine.Human.promptAddition(language)
        : "";

      const body = {
        message: text,
        session_id: (W.state && W.state.visitorId) || "engine-exp",
        current_page: typeof location !== "undefined" ? location.href : "",
        client_context: {
          language,
          role: (meta && meta.role) || "general",
          topic: (meta && meta.topic) || null,
          website_brief: (meta && meta.brief) || null,
          human_instruction: human,
          rules: [
            "Never say you are an AI, language model or bot.",
            "Speak as ANITA — warm virtual character from Alex Node.",
            "IT assistance is a core specialty.",
            "Do not invent contact details or fixed custom prices.",
            "Do not turn suggestions into confirmed requirements."
          ]
        }
      };

      try {
        const r = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const d = await r.json();
        if (!r.ok || !d.ok) throw new Error(d.error || ("HTTP " + r.status));
        let answer = (d.answer || "").trim();
        if (W.engine.Human && W.engine.Human.soften) {
          answer = W.engine.Human.soften(answer, language);
        }
        return { ok: true, answer, topic: d.topic };
      } catch (e) {
        return { ok: false, reason: String(e.message || e) };
      }
    }
  };

  W.engine = W.engine || {};
  W.engine.AI = AI;

  console.log("[ANITA Engine] ai-bridge ready");
})(typeof window !== "undefined" ? window : globalThis);
