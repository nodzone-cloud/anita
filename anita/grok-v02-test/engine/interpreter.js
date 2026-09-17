/* ANITA Engine Experiment — Interpreter (Human-Tech)
   Single decision point. Context first, then words.
*/
(function (root) {
  "use strict";
  const W = (root.ANITA50 = root.ANITA50 || {});

  function say(lang, en, ru, fi) { if (lang === "ru") return ru; if (lang === "fi") return fi || en; return en; }
  function detectRole(text, state) { const x = (text || "").toLowerCase(); if (/\b(windows|wifi|wi-fi|printer|драйвер|driver|компьютер|computer|ноутбук|ошибка|error|синий экран|bsod|не работает|роутер|router|антивирус|тормозит|зависает|принтер)\b/i.test(x)) return "it_assistant"; if (/\b(хочу сайт|нужен сайт|сделать сайт|заказать сайт|website|verkkosivu|landing|лендинг|мой бизнес|автомастерск)\b/i.test(x)) return "business_consultant"; if (/\b(guide me|покажи сайт|проведи|где цены|portfolio|услуги|services|контакты|where are)\b/i.test(x)) return "guide"; return state.role || "guide"; }
  function isGreeting(text) { return /^(hi|hello|hey|привет|здравствуй|здравствуйте|добрый день|hei|moi|moikka)([!.]?)$/i.test(String(text || "").trim()); }
  function isSmallTalk(text) { const x = String(text || "").toLowerCase(); return /\b(как дела|how are you|что делаешь|спасибо|thank you|thanks|круто|cool)\b/i.test(x); }
  function isIdentityQuestion(text) { const x = String(text || "").toLowerCase(); return /\b(ты (ии|ai|бот|робот|человек)|are you (ai|a bot|human|real)|how do you work|как ты работаешь|что ты такое|who are you|ты кто)\b/i.test(x); }

  const Interpreter = {
    async handle(userText) {
      const DS = W.engine.DialogueState, Pending = W.engine.Pending, TG = W.engine.TurnGuard, Brief = W.engine.BriefFlow, Extract = W.engine.Extract;
      if (!DS || !Pending || !TG) return { error: "engine_not_ready", replies: [] };
      const turnId = TG.beginTurn(); let state = DS.get(); let language = state.language || Pending.detectLanguage(userText);
      if (!state.language) { DS.setLanguage(language); state = DS.get(); }
      const text = String(userText || "").trim(); if (!text) return { turnId, language, role: state.role, replies: [], actions: [] };
      DS.update({ lastUser: text });
      if (isIdentityQuestion(text) && W.engine.Human) return { turnId, language, role: state.role || "guide", replies: [{ text: W.engine.Human.identityReply(language), pose: "neutral" }], usedAI: false };

      if (state.pendingQuestion) {
        const interp = Pending.interpret(state.pendingQuestion, text, language);
        if (interp.kind === "clarification") return { turnId, language, role: state.role, replies: [{ text: interp.text, pose: "neutral" }], pendingQuestion: state.pendingQuestion, showButtons: !!(state.pendingQuestion.options && state.pendingQuestion.options.length), usedAI: false };

        if (interp.kind === "side_question" && state.pendingQuestion && state.pendingQuestion.id === "confirm_brief") {
          let sideText = null;
          if (Brief && typeof Brief.answerConfirmSideQuestion === "function") sideText = Brief.answerConfirmSideQuestion(text, language);
          if (sideText) return { turnId, language, role: "business_consultant", replies: [{ text: sideText, pose: "professional" }], pendingQuestion: state.pendingQuestion, showButtons: true, usedAI: false };
          if (W.engine.AI && typeof W.engine.AI.ask === "function") {
            const guarded = TG.guard(turnId, function () { return W.engine.AI.ask(text, language, { role: "business_consultant", topic: "confirm_side_question", brief: DS.get().websiteBrief }); });
            const aiResult = await guarded();
            if (aiResult !== TG.STALE && aiResult && aiResult.ok && aiResult.answer) {
              const soft = language === "ru" ? (aiResult.answer + "\n\nЕсли хотите — можем поправить бриф или подтвердить, когда будете готовы.") : (aiResult.answer + "\n\nIf you like, we can adjust the brief or confirm when you're ready.");
              return { turnId, language, role: "business_consultant", replies: [{ text: soft, pose: "neutral" }], pendingQuestion: state.pendingQuestion, showButtons: true, usedAI: true };
            }
          }
          const fallback = language === "ru" ? "Хороший вопрос 😊 Могу рассказать про пакеты START / LIGHT / MEDIUM / CODE и цены, или изменить бриф. Что вам интереснее?" : "Good question 😊 I can explain START / LIGHT / MEDIUM / CODE and prices, or change the brief. What do you need?";
          return { turnId, language, role: "business_consultant", replies: [{ text: fallback, pose: "neutral" }], pendingQuestion: state.pendingQuestion, showButtons: true, usedAI: false };
        }

        if (interp.kind === "unsure") return { turnId, language, role: state.role, replies: [{ text: say(language, "No worries 😊 " + Pending.promptOf(state.pendingQuestion, language), "Ничего 😊 " + Pending.promptOf(state.pendingQuestion, language), "Ei se mitään 😊 " + Pending.promptOf(state.pendingQuestion, language)), pose: "neutral" }], pendingQuestion: state.pendingQuestion, showButtons: true, usedAI: false };
        if (interp.kind === "answer" && Brief) { const next = Brief.applyAnswer(state.pendingQuestion, interp.value, language, turnId); if (next && TG.isActive(turnId)) return Object.assign({ turnId, language, usedAI: false }, next); }
        if (state.conversationState === "brief" || state.topic === "website_order") { if (Brief && Extract) { const facts = Extract.extractFacts(text); const rich = facts.business || facts.size || facts.requirements.length || facts.goal; if (rich) { const next = await Brief.absorb(text, language, turnId); if (next && TG.isActive(turnId)) return Object.assign({ turnId, language, usedAI: false }, next); } } }
        if (interp.kind === "unknown") return { turnId, language, role: state.role, replies: [{ text: say(language, "Just to be sure — " + Pending.promptOf(state.pendingQuestion, language), "Уточню 😊 " + Pending.promptOf(state.pendingQuestion, language), "Varmistan 😊 " + Pending.promptOf(state.pendingQuestion, language)), pose: "neutral" }], pendingQuestion: state.pendingQuestion, showButtons: !!(state.pendingQuestion.options && state.pendingQuestion.options.length), usedAI: false };
      }

      if (isGreeting(text) || isSmallTalk(text)) {
        DS.setRole("guide"); let reply;
        if (isGreeting(text)) reply = say(language, "Hi 😊 I'm ANITA — Alex Node IT Assistance. How can I help?", "Привет 😊 Я ANITA — Alex Node IT Assistance. Чем могу помочь?", "Hei 😊 Olen ANITA — Alex Node IT Assistance. Kuinka voin auttaa?");
        else if (/как дела|how are you/i.test(text)) reply = say(language, "All good, thanks 😊 What about you — what brings you here?", "Всё хорошо, спасибо 😊 А у вас как — что привело на сайт?", "Kaikki hyvin, kiitos 😊 Entä sinä — mikä tuo sinut tänne?");
        else if (/спасибо|thank/i.test(text)) reply = say(language, "Glad to help 😊 Anything else?", "Рада помочь 😊 Что-то ещё?", "Ilo auttaa 😊 Vieläkö jotain?");
        else reply = say(language, "I'm here 😊 What would you like to do?", "Я здесь 😊 Что хотите сделать?", "Olen täällä 😊 Mitä haluaisit tehdä?");
        const flags = DS.get().flags || {};
        if (!flags.askedGoal) { const goalQ = Pending.get("goal"); DS.update({ flags: { askedGoal: true, greeted: true }, pendingQuestion: goalQ, conversationState: "asking_goal", role: "guide" }); return { turnId, language, role: "guide", replies: [{ text: reply, pose: "neutral" }, { text: Pending.promptOf(goalQ, language), pose: "ready" }], pendingQuestion: goalQ, usedAI: false }; }
        return { turnId, language, role: "guide", replies: [{ text: reply, pose: "neutral" }], usedAI: false };
      }

      const role = detectRole(text, state); DS.setRole(role);
      if (role === "business_consultant" && Brief && Extract) { const next = await Brief.absorb(text, language, turnId); if (next && TG.isActive(turnId)) return Object.assign({ turnId, language, usedAI: false }, next); }
      if (role === "guide" && /\b(цен|price|pricing|hinnat)\b/i.test(text)) return { turnId, language, role, replies: [{ text: say(language, "Website packages: START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE from 700 €. If you're planning a project, I can help figure out what fits.", "Пакеты на сайты: START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE от 700 €. Если думаете о проекте — могу помочь понять, что подойдёт.", "Verkkosivupaketit: START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE alkaen 700 €. Jos mietit projektia, voin auttaa valitsemaan."), pose: "professional" }], usedAI: false };
      if (!DS.get().flags.askedGoal) { const goalQ = Pending.get("goal"); DS.update({ flags: { askedGoal: true }, pendingQuestion: goalQ, conversationState: "asking_goal", role: "guide" }); if (/\b(сайт|website|sivusto|лендинг)\b/i.test(text) && Brief) { const next = await Brief.absorb(text, language, turnId); if (next) return Object.assign({ turnId, language, usedAI: false }, next); } return { turnId, language, role: "guide", replies: [{ text: Pending.promptOf(goalQ, language), pose: "ready" }], pendingQuestion: goalQ, usedAI: false }; }
      if (W.engine.AI && typeof W.engine.AI.ask === "function") { const guarded = TG.guard(turnId, function () { return W.engine.AI.ask(text, language, { role: DS.get().role, topic: DS.get().topic, brief: DS.get().websiteBrief }); }); const aiResult = await guarded(); if (aiResult === TG.STALE) return { turnId, language, role: DS.get().role, replies: [], stale: true, usedAI: true }; if (aiResult && aiResult.ok && aiResult.answer) return { turnId, language, role: DS.get().role, replies: [{ text: aiResult.answer, pose: "neutral" }], usedAI: true }; }
      return { turnId, language, role: DS.get().role, replies: [{ text: say(language, "I'm with you 😊 Website, IT help, or a walk around the site — what do you need?", "Я на связи 😊 Сайт, IT-помощь или пройтись по сайту — что нужно?", "Olen mukana 😊 Verkkosivu, IT-apu vai kierros sivustolla — mitä tarvitset?"), pose: "neutral" }], usedAI: false };
    }
  };

  W.engine = W.engine || {}; W.engine.Interpreter = Interpreter;
  console.log("[ANITA Engine] interpreter ready (Human-Tech)");
})(typeof window !== "undefined" ? window : globalThis);
