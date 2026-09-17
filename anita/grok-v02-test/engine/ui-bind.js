/* ANITA Engine Experiment — UI binding + buttons from pendingQuestion schema */
(function (root) {
  "use strict";
  const W = (root.ANITA50 = root.ANITA50 || {});

  function ensureStyle() {
    if (document.getElementById("anita-engine-btn-style")) return;
    const s = document.createElement("style");
    s.id = "anita-engine-btn-style";
    s.textContent = `
      .anita-engine-choices{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;max-width:100%;}
      .anita-engine-choices button{
        padding:8px 12px;border-radius:18px;border:1px solid #c9c9c9;
        background:#fff;cursor:pointer;font-size:13px;line-height:1.2;
      }
      .anita-engine-choices button.primary{background:#2d6a4f;color:#fff;border-color:#2d6a4f;}
      .anita-engine-choices button.help{background:#f6f6f6;}
      @media (max-width:600px){
        .anita-engine-choices button{font-size:12px;padding:7px 10px;}
      }
    `;
    document.head.appendChild(s);
  }

  function bubbleEl() {
    return document.getElementById("an50-bubble") || document.getElementById("anita-live-bubble") || document.querySelector("[data-anita-bubble]");
  }

  function renderButtons(pending, language) {
    ensureStyle(); const host=bubbleEl(); if(!host||!pending||!pending.options||!pending.options.length)return;
    let box=host.querySelector(".anita-engine-choices"); if(box)box.remove(); box=document.createElement("div"); box.className="anita-engine-choices";
    pending.options.forEach((opt)=>{const bt=document.createElement("button");bt.type="button";bt.textContent=(opt.labels&&(opt.labels[language]||opt.labels.en))||opt.value;if(opt.value==="yes")bt.classList.add("primary");bt.addEventListener("click",()=>{const input=document.getElementById("an50-input")||document.getElementById("anita-mini-input"),send=document.getElementById("an50-send")||document.getElementById("anita-mini-send");if(input&&send){input.value=opt.value==="yes"?(language==="ru"?"Да":"Yes"):opt.value==="no"?(language==="ru"?"Нет":"No"):(opt.labels&&opt.labels[language])||opt.value;send.click();}});box.appendChild(bt);});
    if(pending.clarification){const help=document.createElement("button");help.type="button";help.className="help";help.textContent=language==="ru"?"В чём разница?":language==="fi"?"Mitä eroa?":"What's the difference?";help.addEventListener("click",()=>{const input=document.getElementById("an50-input")||document.getElementById("anita-mini-input"),send=document.getElementById("an50-send")||document.getElementById("anita-mini-send");if(input&&send){input.value=language==="ru"?"А в чём разница?":"What's the difference?";send.click();}});box.appendChild(help);}host.appendChild(box);
  }

  function showReplies(result){if(!result||!result.replies)return;const TG=W.engine.TurnGuard,texts=result.replies.map(r=>r.text).filter(Boolean);if(!texts.length)return;const apply=()=>{if(W.ui&&W.ui.bubbleText)W.ui.bubbleText(texts.join("\n\n"));else if(W.ui&&W.ui.showBubble)W.ui.showBubble(texts.join("\n\n"),{autoHide:false});else{const el=bubbleEl();if(el){el.textContent=texts.join("\n\n");el.classList.add("show");}}if(result.showButtons&&result.pendingQuestion)setTimeout(()=>renderButtons(result.pendingQuestion,result.language||"en"),30);if(W.ui&&W.ui.setPose&&result.replies[0].pose)W.ui.setPose(result.replies[0].pose);};if(TG&&result.turnId!=null)TG.applyUI(result.turnId,apply);else apply();}
  async function onUserSend(text){const Interpreter=W.engine&&W.engine.Interpreter;if(!Interpreter)return;const result=await Interpreter.handle(text);if(result&&!result.stale)showReplies(result);}
  function bind(){const input=document.getElementById("an50-input")||document.getElementById("anita-mini-input"),send=document.getElementById("an50-send")||document.getElementById("anita-mini-send");if(!input||!send||send.dataset.engineBound)return;send.dataset.engineBound="1";const run=async(e)=>{if(e){e.preventDefault();e.stopPropagation();}const text=input.value.trim();if(!text)return;input.value="";await onUserSend(text);};send.addEventListener("click",run,true);input.addEventListener("keydown",(e)=>{if(e.key==="Enter")run(e);},true);}
  function greetIfHome(){const path=(location.pathname||"/").replace(/\/+$/,"")||"/";if(path!=="/")return;const DS=W.engine&&W.engine.DialogueState;if(!DS)return;const st=DS.get();if(st.flags&&st.flags.greeted)return;const lang=st.language||((navigator.language||"").toLowerCase().startsWith("ru")?"ru":(navigator.language||"").toLowerCase().startsWith("fi")?"fi":"en");DS.setLanguage(lang);DS.update({flags:{greeted:true},role:"guide",conversationState:"greeting"});const text=lang==="ru"?"Привет 😊 Я ANITA, Alex Node IT Assistance. Могу помочь с компьютером, сайтом или провести по сайту.":lang==="fi"?"Hei 😊 Olen ANITA, Alex Node IT Assistance. Voin auttaa tietokoneissa, verkkosivuissa tai opastaa sivustolla.":"Hi 😊 I’m ANITA, Alex Node IT Assistance. I can help with computers, websites, or show you around.";showReplies({turnId:DS.currentTurn(),language:lang,replies:[{text,pose:"ready"}],showButtons:false});}
  function boot(){bind();setTimeout(greetIfHome,500);console.log("[ANITA Engine] ui-bind ready");}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  W.engine=W.engine||{};W.engine.UIBind={showReplies,renderButtons,bind,onUserSend};
})(typeof window !== "undefined" ? window : globalThis);
