/* ANITA Engine Experiment — pendingQuestion schema + helpers */
(function (root) {
  "use strict";
  const W = (root.ANITA50 = root.ANITA50 || {});

  /**
   * Schema:
   * {
   *   id: string,
   *   field: string,           // e.g. "websiteBrief.confirmed.size"
   *   type: "choice" | "choice_or_count" | "free_text" | "confirm_yes_no",
   *   prompt: { en, ru, fi },
   *   options?: [{ value, labels: { en, ru, fi } }],
   *   allowFreeText: boolean,
   *   clarification?: { en, ru, fi }  // optional pre-baked "what's the difference"
   * }
   */

  const QUESTIONS = {
    goal: {
      id: "visit_goal", field: null, type: "free_text",
      prompt: { en: "What brings you to Alex Node today? Looking for a website, IT help, or just exploring?", ru: "Что вас интересует? Нужен сайт, помощь с компьютером, или просто смотрите?", fi: "Mikä tuo sinut Alex Nodeen tänään? Tarvitsetko verkkosivua, IT-apua vai selailetko vain?" },
      allowFreeText: true
    },
    business: {
      id: "website_business", field: "websiteBrief.confirmed.business", type: "free_text",
      prompt: { en: "Tell me a bit about your business or project — what do you do?", ru: "Расскажите немного о вашем бизнесе или проекте — чем вы занимаетесь?", fi: "Kerro hieman liiketoiminnastasi tai projektistasi — mitä teet?" }, allowFreeText: true
    },
    site_goal: {
      id: "website_goal", field: "websiteBrief.confirmed.goal", type: "free_text",
      prompt: { en: "What should visitors be able to do on the site? (contact you, book a service, buy something, learn about you…)", ru: "Что посетители должны делать на сайте? (связаться, записаться, купить, узнать о вас…)", fi: "Mitä kävijöiden pitäisi voida tehdä sivustolla? (ottaa yhteyttä, varata, ostaa, tutustua…)" }, allowFreeText: true
    },
    size: {
      id: "website_size", field: "websiteBrief.confirmed.size", type: "choice_or_count",
      prompt: { en: "Roughly what size of site do you need?", ru: "Какого примерно размера сайт нужен?", fi: "Minkä kokoista sivustoa tarvitset?" },
      options: [
        { value: "one landing page", labels: { en: "One page", ru: "Одна страница", fi: "Yksi sivu" } },
        { value: "a few separate pages", labels: { en: "A few pages", ru: "Несколько страниц", fi: "Muutama sivu" } },
        { value: "a larger multi-page site", labels: { en: "Larger multi-page", ru: "Большой многостраничный", fi: "Monisivuinen" } }
      ], allowFreeText: true,
      clarification: { en: "One page = a single landing page (menu items can scroll to sections). A few pages = separate pages like About / Services / Contact. Larger multi-page = many sections with their own URLs.", ru: "Одна страница = лендинг (пункты меню могут прокручивать к блокам). Несколько страниц = отдельные страницы вроде О нас / Услуги / Контакты. Большой многостраничный = много разделов со своими адресами.", fi: "Yksi sivu = laskeutumissivu (valikko voi vierittää osioihin). Muutama sivu = erilliset sivut kuten Meistä / Palvelut / Yhteystiedot. Monisivuinen = useita osioita omilla osoitteillaan." }
    },
    requirements: {
      id: "website_requirements", field: "websiteBrief.confirmed.requirements", type: "free_text",
      prompt: { en: "Anything specific you already know you need? (booking, shop, blog, contact form, multiple languages…)\nYou can say “nothing special” or “not sure yet”.", ru: "Есть ли что-то конкретное, что уже точно нужно? (запись, магазин, блог, форма, несколько языков…)\nМожно сказать «ничего особенного» или «пока не знаю».", fi: "Onko jotain erityistä, mitä jo tiedät tarvitsevasi? (ajanvaraus, kauppa, blogi, lomake, useita kieliä…)\nVoit sanoa “ei mitään erityistä” tai “en ole varma vielä”." }, allowFreeText: true
    },
    confirm_brief: {
      id: "confirm_brief", field: null, type: "confirm_yes_no",
      prompt: { en: "Did I understand everything correctly?", ru: "Всё правильно поняла?", fi: "Ymmärsinkö kaiken oikein?" },
      options: [
        { value: "yes", labels: { en: "Yes, correct ✓", ru: "Да, всё верно ✓", fi: "Kyllä, oikein ✓" } },
        { value: "no", labels: { en: "I want to change something", ru: "Хочу что-то изменить", fi: "Haluan muuttaa jotain" } },
        { value: "side:prices", labels: { en: "What are the prices?", ru: "Какие цены?", fi: "Mitkä hinnat?" } },
        { value: "side:light", labels: { en: "What's in LIGHT?", ru: "Что входит в LIGHT?", fi: "Mitä LIGHTiin kuuluu?" } }
      ], allowFreeText: true
    }
  };

  function norm(s) { return String(s || "").toLowerCase().replace(/ё/g, "е").replace(/[?!.,:;()"'«»]/g, " ").replace(/\s+/g, " ").trim(); }
  function detectLanguage(text) { if (/[А-Яа-яЁё]/.test(text || "")) return "ru"; if (/\b(kuka|mikä|oletko|palvelut|hinnat|opasta|hei|moi|sivusto)\b/i.test(text || "")) return "fi"; return "en"; }
  function promptOf(q, language) { if (!q || !q.prompt) return ""; return q.prompt[language] || q.prompt.en || ""; }
  function clarificationOf(q, language) { if (!q || !q.clarification) return null; return q.clarification[language] || q.clarification.en || null; }

  function interpret(pending, text, language) {
    if (!pending) return { kind: "no_pending" };
    const x = norm(text), lang = language || "en";
    if (/(?:в чем|какая|объясни|поясни|что значит|чем).{0,40}(?:разниц|отлич)|difference|what(?:'s| is) the difference|mitä eroa|selitä/i.test(x) || /^(а )?(в чём|в чем) разница/i.test(x)) {
      return { kind: "clarification", text: clarificationOf(pending, lang) || (lang === "ru" ? "Могу объяснить варианты 😊 Напишите, что именно сравнить." : "I can explain the options 😊 Tell me what you’d like compared.") };
    }
    if (/^(не знаю|не уверен|не уверена|затрудняюсь|i don't know|not sure|unsure|en tiedä|en ole varma)$/i.test(x)) return { kind: "unsure" };
    if (pending.type === "confirm_yes_no") {
      if (/^side:/i.test(String(text || "").trim()) || /каки[ея] цен|what are the prices|что входит в light|what.*light|чем light|difference.*medium/i.test(x)) return { kind: "side_question", text: text.trim() };
      if (/^(да|yes|верно|правильно|всё верно|все верно|всё правильно|все правильно|ok|okay|looks good|kyllä|joo|да всё верно|да все верно)([!.]?)$/i.test(x) || /^(да|yes)[,.]?\s*(всё|все|верно|правильно|correct)/i.test(x)) return { kind: "answer", value: "yes" };
      if (/^(нет|no|не совсем|not really|ei|неверно)([!.]?)$/i.test(x) || /^(нет|no)[,.]?\s*(не так|неверно|не всё|не все)/i.test(x) || /^(хочу изменить|надо изменить|нужно изменить|change that|want to change)/i.test(x)) return { kind: "answer", value: "no" };
      return { kind: "side_question", text: text.trim() };
    }
    if (pending.options && pending.options.length) {
      const ordinalMap = { first:1,"1st":1,первый:1,первая:1,ensimmainen:1,"ensimmäinen":1,second:2,"2nd":2,второй:2,вторая:2,toinen:2,third:3,"3rd":3,третий:3,третья:3,kolmas:3,fourth:4,"4th":4,четвертый:4,четвертая:4,"neljäs":4 };
      for (const [k, idx] of Object.entries(ordinalMap)) { if (new RegExp("(^|\\s)" + k + "(\\s|$)", "i").test(x) || new RegExp("вариант\\s*" + idx, "i").test(x)) { if (idx >= 1 && idx <= pending.options.length) return { kind: "answer", value: pending.options[idx - 1].value }; } }
      const numMatch = x.match(/(?:вариант|option)?\s*(\d{1,2})/i);
      if (numMatch) { const n = parseInt(numMatch[1], 10); if (pending.type === "choice" && n >= 1 && n <= pending.options.length) return { kind: "answer", value: pending.options[n - 1].value }; if (pending.type === "choice_or_count" && pending.id === "website_size") { if (n === 1) return { kind: "answer", value: "one landing page" }; if (n >= 2 && n <= 5) return { kind: "answer", value: "a few separate pages" }; if (n > 5) return { kind: "answer", value: "a larger multi-page site" }; } }
      if (/one|landing|лендинг|одна|yksi|single/i.test(x)) { const opt = pending.options.find(o => o.value.includes("one") || o.value.includes("landing")); if (opt) return { kind: "answer", value: opt.value }; }
      if (/few|several|несколько|пару|muutama|couple|2|3|4|5/i.test(x) && !/вариант|option/i.test(x)) { const opt = pending.options.find(o => o.value.includes("few")); if (opt) return { kind: "answer", value: opt.value }; }
      if (/large|multi|больш|многостранич|monisivu/i.test(x)) { const opt = pending.options.find(o => o.value.includes("larger") || o.value.includes("multi")); if (opt) return { kind: "answer", value: opt.value }; }
      for (const opt of pending.options) { const labels = Object.values(opt.labels || {}); for (const lab of labels) { if (norm(lab) === x || x.includes(norm(lab)) || norm(lab).includes(x)) return { kind: "answer", value: opt.value }; } if (norm(opt.value) === x) return { kind: "answer", value: opt.value }; }
    }
    if (pending.allowFreeText && x.length > 0) { if (pending.id === "website_size" && /н+есколько|пару|нескольк/i.test(x)) return { kind: "answer", value: "a few separate pages" }; if (pending.id === "website_requirements" && /ничего|nothing|not sure|не знаю|ei mitään/i.test(x)) return { kind: "answer", value: [] }; return { kind: "answer", value: text.trim() }; }
    return { kind: "unknown" };
  }

  W.engine = W.engine || {};
  W.engine.Pending = { QUESTIONS, get: (id) => QUESTIONS[id] || null, interpret, promptOf, clarificationOf, detectLanguage, norm };
  console.log("[ANITA Engine] pending ready");
})(typeof window !== "undefined" ? window : globalThis);
