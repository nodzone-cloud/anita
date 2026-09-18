/* ANITA Engine Experiment — BriefFlow (Human-Tech conversation)
   Deterministic extract first → if weak, AI structured extract →
   high confidence → confirmed; low → clarify (never guess into confirmed).
*/
(function(root){
"use strict";
const W=(root.ANITA50=root.ANITA50||{});
function say(lang,en,ru,fi){if(lang==="ru")return ru;if(lang==="fi")return fi||en;return en;}
function packageExplain(language,packHint){
 if(language==="ru")return "Для такого проекта предварительно подходят пакеты LIGHT или MEDIUM.\n• START — 250 € — простой лендинг\n• LIGHT — 450 € — небольшой сайт на несколько страниц\n• MEDIUM — 620 € — более объёмный многостраничный сайт\n• CODE — от 700 € — сложная разработка\n"+(packHint?"По тому, что вы описали, ближе: "+packHint+".\n":"")+"Могу подробнее рассказать, чем они отличаются, или что входит в пакет.";
 return "For a project like this, LIGHT or MEDIUM usually fits.\n• START — 250 € — simple landing page\n• LIGHT — 450 € — a few separate pages\n• MEDIUM — 620 € — larger multi-page site\n• CODE — from 700 € — custom development\n"+(packHint?"Based on what you described, closer to: "+packHint+".\n":"")+"I can explain the difference or what each package includes.";
}
function formatSummary(brief,language){
 const c=(brief&&brief.confirmed)||{},lines=[],pack=brief.inferred&&brief.inferred.recommendedPackage;
 const push=(label,val)=>{if(val)lines.push("• "+label+": "+val);};
 if(language==="ru"){
  lines.push("Отлично 😊 Кажется, я уже достаточно понимаю ваш проект.","",packageExplain("ru",pack),"","Вот что я поняла о проекте:");
  push("Бизнес / проект",c.business);push("Цель сайта",c.goal);push("Размер",c.size);if(c.requirements&&c.requirements.length)push("Пожелания",c.requirements.join(", "));
  lines.push("","Можете спросить про пакеты и цены, что-то поправить в брифе — или сказать, что всё верно, когда будете готовы.");
 }else if(language==="fi"){
  lines.push("Hienoa 😊 Näytän ymmärtävän projektin jo melko hyvin.","",packageExplain("en",pack),"","Näin ymmärsin:");push("Liiketoiminta",c.business);push("Tavoite",c.goal);push("Koko",c.size);if(c.requirements&&c.requirements.length)push("Toiveet",c.requirements.join(", "));lines.push("","Voit kysyä paketeista tai pyytää korjausta — tai sanoa että kaikki on oikein.");
 }else{
  lines.push("Great 😊 I think I understand your project well enough.","",packageExplain("en",pack),"","Here's what I've got:");push("Business / project",c.business);push("Website goal",c.goal);push("Size",c.size);if(c.requirements&&c.requirements.length)push("Needs",c.requirements.join(", "));lines.push("","You can ask about packages and prices, change something in the brief — or say everything looks right when you're ready.");
 }
 return lines.join("\n");
}
function answerConfirmSideQuestion(text,language){
 const x=String(text||"").toLowerCase();
 if((/light|лайт/i.test(x)&&/medium|медиум|средний/i.test(x))||/чем.*отлича|difference between|разниц/i.test(x))return say(language,"LIGHT (450 €) is for a smaller site with a few pages. MEDIUM (620 €) is for a larger multi-page structure and more content sections. START (250 €) is a single landing page. CODE (from 700 €) is when you need custom features.\n\nIf you want, we can adjust the brief — or confirm when you're ready.","LIGHT (450 €) — небольшой сайт на несколько страниц. MEDIUM (620 €) — более объёмный многостраничный сайт и больше разделов. START (250 €) — один лендинг. CODE (от 700 €) — когда нужна сложная разработка.\n\nМожем поправить бриф или подтвердить, когда будете готовы.","LIGHT (450 €) sopii pienemmälle sivustolle. MEDIUM (620 €) isommalle monisivuiselle. START (250 €) on yksi sivu. CODE alkaen 700 € räätälöityyn työhön.");
 if(/\blight\b|лайт|что входит.*light|what.*light/i.test(x))return say(language,"LIGHT is 450 € — typically a compact multi-page site (about a few separate pages), clear structure, contact, and core content. Good when you need more than one landing block but not a large portal.\n\nAny other question, or shall we confirm the brief?","LIGHT — 450 €: обычно небольшой сайт на несколько страниц, понятная структура, контакты и основной контент. Когда одной страницы мало, но большой портал не нужен.\n\nЕсть ещё вопрос — или подтвердим бриф?","LIGHT maksaa 450 € — kompakti muutaman sivun sivusto.");
 if(/\bmedium\b|медиум|почему.*дорож|why.*more|why.*medium/i.test(x))return say(language,"MEDIUM is 620 € because it usually means more pages, more structure and content work than LIGHT. If your needs are smaller, LIGHT or even START may fit better — we can adjust the brief.\n\nWant to change size, or another question?","MEDIUM — 620 €, потому что обычно больше страниц, структуры и контента, чем в LIGHT. Если задача проще — ближе LIGHT или START. Можем поправить бриф.\n\nИзменим размер или есть другой вопрос?","MEDIUM maksaa 620 €, koska sivuja ja sisältöä on yleensä enemmän kuin LIGHTissa.");
 if(/цен|price|сколько|cost|hinta|start|пакет/i.test(x))return say(language,"Packages: START 250 € · LIGHT 450 € · MEDIUM 620 € · CODE from 700 €. I can match one to your brief once you're happy with it.\n\nQuestions welcome — or say when the brief looks right.","Пакеты: START 250 € · LIGHT 450 € · MEDIUM 620 € · CODE от 700 €. Когда бриф вас устроит, подберём пакет точнее.\n\nСпрашивайте — или скажите, когда всё верно.","Paketit: START 250 € · LIGHT 450 € · MEDIUM 620 € · CODE alkaen 700 €.");
 if(/кто такой alex|who is alex|алекс кто|кто alex/i.test(x))return say(language,"Alex is the founder of Alex Node — the design studio behind this site. I help collect the project details; when you're ready to continue, Alex can take the next step with you.\n\nAnything else about the brief or packages?","Alex — основатель Alex Node, студии за этим сайтом. Я помогаю собрать детали проекта; когда будете готовы продолжить, Alex сможет взять следующий шаг.\n\nЕщё вопрос по брифу или пакетам?","Alex on Alex Noden perustaja. Autan keräämään projektin tiedot; kun olet valmis, Alex voi jatkaa.");
 if(/дешевле|cheaper|подешевле|can.*cheaper/i.test(x))return say(language,"We can look at START (250 €) if a single strong page is enough, or simplify the brief toward LIGHT. Tell me what matters most — budget or more pages — and I'll adjust.\n\nWhat should we change?","Можем смотреть в сторону START (250 €), если хватит одной сильной страницы, или упростить бриф до LIGHT. Что важнее — бюджет или больше страниц? Подстрою.\n\nЧто меняем?","Voimme katsoa START-pakettia (250 €) tai keventää briefiä kohti LIGHT-pakettia.");
 return null;
}
function nextMissingQuestion(language){
 const DS=W.engine.DialogueState,Pending=W.engine.Pending,Extract=W.engine.Extract,miss=Extract.missingFields(DS.get().websiteBrief);
 if(!miss.length){const q=Pending.get("confirm_brief");DS.setPending(q);DS.setConversationState("confirming");return{role:"business_consultant",replies:[{text:formatSummary(DS.get().websiteBrief,language),pose:"professional"}],pendingQuestion:q,showButtons:true};}
 const key=miss[0],q=Pending.get(key);DS.setPending(q);const bridges={business:say(language,"Got it 😊 Tell me a bit about the business or project — what do you do?","Поняла 😊 Расскажите немного о бизнесе или проекте — чем занимаетесь?","Selvä 😊 Kerro hieman liiketoiminnasta — mitä teet?"),site_goal:say(language,"Nice 😊 And what should people mainly do on the site?","Хорошо 😊 А что в первую очередь должны делать люди на сайте?","Hienoa 😊 Mitä ihmisten pitäisi lähinnä tehdä sivustolla?"),size:say(language,"Almost there 😊 Roughly what size of site are you thinking of?","Почти всё 😊 Какого примерно размера сайт вы видите?","Melkein valmista 😊 Minkä kokoista sivustoa mietit?")};return{role:"business_consultant",replies:[{text:bridges[key]||Pending.promptOf(q,language),pose:"professional"}],pendingQuestion:q,showButtons:!!(q.options&&q.options.length)};
}
function ackFromFacts(facts,language){const bits=[];if(facts.business)bits.push(language==="ru"?"бизнес: "+facts.business:facts.business);if(facts.size)bits.push(language==="ru"?"размер сайта":"site size");if(facts.goal)bits.push(language==="ru"?"цель":"goal");if(facts.requirements&&facts.requirements.length)bits.push(facts.requirements.join(", "));if(!bits.length)return"";return say(language,"Thanks — I noted: "+bits.join("; ")+". ","Спасибо — зафиксировала: "+bits.join("; ")+". ","Kiitos — merkitsin: "+bits.join("; ")+". ");}
const BriefFlow={
 answerConfirmSideQuestion,packageExplain,
 async absorb(text,language,turnId){
  const DS=W.engine.DialogueState,Extract=W.engine.Extract,AiExtract=W.engine.AiExtract,TG=W.engine.TurnGuard,Pending=W.engine.Pending;if(!TG.isActive(turnId))return null;
  const raw=String(text||"").trim();let facts=Extract.extractFacts(raw),strength=Extract.deterministicStrength?Extract.deterministicStrength(facts):(facts.business||facts.size||facts.goal||(facts.requirements&&facts.requirements.length)?1:0);
  const wantsSite=/\b(сайт|website|sivusto|лендинг|landing)\b/i.test(raw)||DS.get().topic==="website_order"||DS.get().conversationState==="brief";
  if(raw&&strength<2&&wantsSite&&AiExtract&&typeof AiExtract.extractStructured==="function"){
   const guarded=TG.guard(turnId,()=>AiExtract.extractStructured(raw,language,DS.get().websiteBrief)),ai=await guarded();if(ai===TG.STALE)return null;
   if(ai&&ai.ok&&ai.facts){if(ai.confidence>=AiExtract.HIGH){const m=AiExtract.mergeAiFacts(DS.get().websiteBrief,ai.facts,ai.confidence);DS.update({role:"business_consultant",topic:"website_order",conversationState:"brief",flags:{briefStarted:true,askedGoal:true},websiteBrief:{confirmed:m.confirmed,inferred:m.inferred,rejected:m.rejected}});facts=ai.facts;strength=2;}else if(ai.confidence<AiExtract.MEDIUM||ai.uncertain){DS.update({role:"business_consultant",topic:"website_order",conversationState:"brief",flags:{briefStarted:true,askedGoal:true}});const q=Pending.get("business");DS.setPending(q);return{role:"business_consultant",replies:[{text:AiExtract.clarificationPrompt(language,ai.facts),pose:"neutral"}],pendingQuestion:q,showButtons:false,usedAI:true};}else{const m=AiExtract.mergeAiFacts(DS.get().websiteBrief,ai.facts,ai.confidence);DS.update({role:"business_consultant",topic:"website_order",conversationState:"brief",flags:{briefStarted:true,askedGoal:true},websiteBrief:{confirmed:m.confirmed,inferred:m.inferred,rejected:m.rejected}});}}
  }
  if(strength>0){const merged=Extract.mergeIntoBrief(DS.get().websiteBrief,facts);DS.update({role:"business_consultant",topic:"website_order",conversationState:"brief",flags:{briefStarted:true,askedGoal:true},websiteBrief:merged});}else DS.update({role:"business_consultant",topic:"website_order",conversationState:"brief",flags:{briefStarted:true,askedGoal:true}});
  const ack=ackFromFacts(facts,language),next=nextMissingQuestion(language);if(ack&&next.replies&&next.replies[0])next.replies[0].text=ack+next.replies[0].text;return next;
 },
 start(language,turnId){return this.absorb("",language,turnId);},
 applyAnswer(pending,value,language,turnId){
  const DS=W.engine.DialogueState,Pending=W.engine.Pending,Extract=W.engine.Extract,TG=W.engine.TurnGuard;if(!TG.isActive(turnId))return null;
  if(pending.id==="confirm_brief"){
   if(value==="yes"){DS.setConversationState("ready_handoff");DS.clearPending();return{role:"business_consultant",replies:[{text:say(language,"Wonderful 😊 Then we can continue when you like — I can pass the brief to Alex, or answer anything else about packages and the site first. What would you prefer?","Отлично 😊 Тогда можем продолжить, когда удобно: могу передать бриф Alex или сначала ответить на вопросы по пакетам и сайту. Как вам комфортнее?","Hienoa 😊 Voimme jatkaa kun sinulle sopii — välitän briefin Alexille tai vastaan ensin kysymyksiin."),pose:"success"}],pendingQuestion:null,showButtons:false,offerHandoff:true};}
   if(value==="no"){DS.update({conversationState:"brief_edit"});DS.setPending({id:"brief_edit_what",field:null,type:"free_text",prompt:{en:"Of course — what should we change?",ru:"Конечно — что именно нужно изменить?",fi:"Totta kai — mitä pitäisi muuttaa?"},allowFreeText:true});return{role:"business_consultant",replies:[{text:say(language,"Of course 😊 What exactly should we change?","Конечно 😊 Что именно нужно изменить?","Totta kai 😊 Mitä tarkalleen pitäisi muuttaa?"),pose:"neutral"}],pendingQuestion:DS.get().pendingQuestion,showButtons:false};}
  }
  if(pending.id==="brief_edit_what"){
   const facts=Extract.extractFacts(String(value)),x=Extract.norm(String(value)),brief=DS.get().websiteBrief,confirmed=Object.assign({},brief.confirmed);
   if(/страниц|size|размер|siv/i.test(x)&&facts.size)confirmed.size=facts.size;if(/бизнес|business|проект/i.test(x)&&(facts.business||value))confirmed.business=facts.business||String(value).trim();if(/цел|goal|tehtäv/i.test(x)&&(facts.goal||value))confirmed.goal=facts.goal||String(value).trim();if(facts.requirements.length)confirmed.requirements=facts.requirements;if(facts.rejected.length)confirmed.requirements=(confirmed.requirements||[]).filter(r=>facts.rejected.indexOf(r)===-1);if(!facts.business&&!facts.size&&!facts.goal&&!facts.requirements.length)confirmed.business=String(value).trim();
   const merged=Extract.mergeIntoBrief({confirmed,inferred:brief.inferred,rejected:brief.rejected},facts);DS.update({websiteBrief:merged});const q=Pending.get("confirm_brief");DS.setPending(q);DS.setConversationState("confirming");return{role:"business_consultant",replies:[{text:say(language,"Updated 😊\n\n","Обновила 😊\n\n","Päivitetty 😊\n\n")+formatSummary(DS.get().websiteBrief,language),pose:"professional"}],pendingQuestion:q,showButtons:true};
  }
  const textVal=Array.isArray(value)?value.join(", "):String(value),brief=DS.get().websiteBrief,confirmed=Object.assign({},brief.confirmed),inferred=Object.assign({},brief.inferred),rejected=Object.assign({},brief.rejected);
  // Human-Tech rule: an answer to a targeted question confirms ONLY that field.
  // Example: "book shop" is a business description; "book" must not become booking
  // and "shop" must not silently become an online-store requirement.
  let merged={confirmed,inferred,rejected};
  if(pending.id==="website_business"){
   merged.confirmed.business=textVal.trim();
  }else{
   const facts=Extract.extractFacts(textVal);
   if(pending.id==="website_goal")merged.confirmed.goal=facts.goal||textVal.trim();
   if(pending.id==="website_size")merged.confirmed.size=facts.size||textVal.trim();
   if(pending.id==="website_requirements")merged.confirmed.requirements=facts.requirements.length?facts.requirements:(/ничего|nothing|not sure|не знаю/i.test(textVal)?[]:[textVal.trim()]);
   // Merge extra facts only after the business-name question, where ordinary words
   // such as "book" or "shop" can otherwise be mistaken for requested features.
   merged=Extract.mergeIntoBrief(merged,facts);
   if(pending.id==="website_goal")merged.confirmed.goal=confirmed.goal=facts.goal||textVal.trim();
   if(pending.id==="website_size")merged.confirmed.size=confirmed.size=facts.size||textVal.trim();
  }
  DS.update({role:"business_consultant",topic:"website_order",conversationState:"brief",flags:{briefStarted:true,askedGoal:true},websiteBrief:merged});
  return nextMissingQuestion(language);
 }
};
W.engine=W.engine||{};W.engine.BriefFlow=BriefFlow;console.log("[ANITA Engine] briefFlow ready (AI extract fallback)");
})(typeof window!=="undefined"?window:globalThis);
