/* ANITA v25.1 — Expression / Visual Reaction Layer
   - Happy image inside chat after clear satisfaction / solved-problem feedback.
   - Focused image temporarily covers the portrait for 2 seconds when the user
     reports a problem, difficult situation, something wrong, or strong frustration.
   - Visuals are presentation only; they do not classify malware or change diagnostics.
*/
(function(){
  "use strict";

  const VERSION = "25.1";
  const BASE = "https://nodzone-cloud.github.io/anita/";
  const HAPPY_IMAGE = BASE + "anita-happy.png?v=" + VERSION;
  const FOCUS_IMAGE = BASE + "anita-focus.png?v=" + VERSION;

  let pendingHappyImage = false;
  let focusTimer = null;

  function norm(text){
    return String(text || "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function language(l){
    const x = String(l || "").toLowerCase();
    if(x === "ru" || x === "fi" || x === "en") return x;
    try{
      const m = window.ANITA_MEMORY && window.ANITA_MEMORY.state && window.ANITA_MEMORY.state.language;
      if(m === "ru" || m === "fi" || m === "en") return m;
    }catch(_){ }
    return "en";
  }

  function satisfaction(text){
    const t = norm(text);
    if(!t) return false;

    const strong = [
      /\bthank(?:s| you)?\b/,
      /\bthanks a lot\b/,
      /\bappreciate it\b/,
      /\bthat helped\b/,
      /\byou helped\b/,
      /\bit works(?: now)?\b/,
      /\bworking now\b/,
      /\bfixed(?: it| now)?\b/,
      /\bproblem (?:is )?solved\b/,
      /\bsolved it\b/,
      /\bспасибо\b/,
      /\bспс\b/,
      /\bблагодарю\b/,
      /\bпомогло\b/,
      /\bзаработало\b/,
      /\bтеперь работает\b/,
      /\bвс[её] работает\b/,
      /\bполучилось\b/,
      /\bрешено\b/,
      /\bkiitos\b/,
      /\bkiitti\b/,
      /\btoimii nyt\b/,
      /\bnyt toimii\b/,
      /\bse auttoi\b/,
      /\bratkesi\b/,
      /\bonnistui\b/
    ];
    return strong.some(r => r.test(t));
  }

  function frustration(text){
    const t = norm(text);
    if(!t) return false;
    return [
      /\bfuck\b/, /\bfucking\b/, /\bfuck you\b/, /\bomfg\b/, /\bwtf\b/,
      /\bbullshit\b/, /\bbitch\b/, /\bgo to hell\b/, /\bthis sucks\b/,
      /\banita sucks\b/, /\bshit\b/, /\bdamn\b/,
      /\bбля(?:ть|дь)?\b/, /\bсука\b/, /\bхерн(?:я|и)\b/, /\bдерьмо\b/,
      /\bпошла ты\b/, /\bиди к черту\b/, /\bиди к ч[её]рту\b/,
      /\bvittu\b/, /\bperkele\b/, /\bpaska\b/
    ].some(r => r.test(t));
  }

  function problemSignal(text){
    const t = norm(text);
    if(!t) return false;

    // Deliberately broad: this controls only a 2-second facial/pose reaction.
    // It does NOT decide what the technical problem is.
    return [
      /\bproblem\b/, /\bissue\b/, /\btrouble\b/, /\bsomething(?:'s| is) wrong\b/,
      /\bnot working\b/, /\bdoesn(?:'t|t) work\b/, /\bstopped working\b/,
      /\berror\b/, /\bfailed\b/, /\bfailure\b/, /\bcrash(?:ed|ing|es)?\b/,
      /\bfreez(?:e|es|ing|en)\b/, /\bslow\b/, /\bsluggish\b/, /\blag(?:gy|ging|s)?\b/,
      /\bvirus\b/, /\bmalware\b/, /\bthreat\b/, /\bblue screen\b/, /\bbsod\b/,
      /\bпроблем(?:а|ы|у|ой)\b/, /\bне работает\b/, /\bперестал[аои]? работать\b/,
      /\bошибк(?:а|и|у|ой)\b/, /\bзавис(?:ает|ло|ает постоянно)?\b/,
      /\bтормозит\b/, /\bлагает\b/, /\bмедленно\b/, /\bвирус\b/,
      /\bongelma\b/, /\bei toimi\b/, /\bvirhe\b/, /\bhidas\b/, /\blagaa\b/,
      /\bkaatuu\b/, /\bjumittuu\b/, /\bhaittaohjelma\b/
    ].some(r => r.test(t));
  }

  function happyReply(l){
    const lang = language(l);
    if(lang === "ru"){
      return "Рада, что смогла помочь 😊 Если есть ещё вопрос или проблема с компьютером — рассказывай.";
    }
    if(lang === "fi"){
      return "Kiva, että pystyin auttamaan 😊 Jos tietokoneessa on vielä jotain, kerro vain.";
    }
    return "Happy I could help 😊 If there’s anything else with your computer, tell me and we’ll take a look.";
  }

  function ensureStyle(){
    if(document.getElementById("anitaExpressionStyle")) return;
    const style = document.createElement("style");
    style.id = "anitaExpressionStyle";
    style.textContent = `
      #anitaDemoRoot .anitaExpressionChatImage{
        display:block;
        width:min(320px,100%);
        max-height:360px;
        object-fit:cover;
        object-position:center top;
        margin:10px 0 2px;
        border-radius:14px;
        border:1px solid rgba(0,0,0,.08);
        box-shadow:0 8px 24px rgba(0,0,0,.10);
      }
      #anitaDemoRoot .anitaPortraitExpression{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        object-fit:cover;
        object-position:center top;
        z-index:2;
        opacity:0;
        transition:opacity .14s ease;
        pointer-events:none;
        background:#111;
      }
      #anitaDemoRoot .anitaPortraitExpression.show{opacity:1}
      #anitaDemoRoot .anitaPortraitBadge{z-index:4}
      #anitaDemoRoot .anitaIntroSoundStart{z-index:5}
    `;
    document.head.appendChild(style);
  }

  function appendHappyImage(messageNode){
    if(!messageNode || messageNode.querySelector(".anitaExpressionChatImage")) return;
    const img = document.createElement("img");
    img.className = "anitaExpressionChatImage";
    img.src = HAPPY_IMAGE;
    img.alt = "ANITA smiling, winking and giving a thumbs up";
    img.loading = "lazy";
    img.decoding = "async";
    img.onerror = function(){ this.remove(); };
    messageNode.appendChild(img);
  }

  function ensurePortraitExpression(){
    const portrait = document.querySelector("#anitaDemoRoot .anitaPortrait");
    if(!portrait) return null;
    let img = portrait.querySelector(".anitaPortraitExpression");
    if(!img){
      img = document.createElement("img");
      img.className = "anitaPortraitExpression";
      img.alt = "ANITA focused on a difficult computer problem";
      img.src = FOCUS_IMAGE;
      img.decoding = "async";
      img.onerror = function(){ this.classList.remove("show"); };
      portrait.appendChild(img);
    }
    return img;
  }

  function showFocusedPortrait(duration){
    ensureStyle();
    const img = ensurePortraitExpression();
    if(!img) return;
    if(focusTimer){
      clearTimeout(focusTimer);
      focusTimer = null;
    }
    requestAnimationFrame(function(){ img.classList.add("show"); });
    focusTimer = setTimeout(function(){
      img.classList.remove("show");
      focusTimer = null;
    }, Math.max(500, Number(duration) || 2000));
  }

  function observeChat(){
    const chat = document.getElementById("chat");
    if(!chat || chat.dataset.anitaExpressionsObserved === "1") return;
    chat.dataset.anitaExpressionsObserved = "1";

    const observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        mutation.addedNodes.forEach(function(node){
          if(!node || node.nodeType !== 1) return;

          const inspect = [];
          if(node.matches && node.matches(".msg")) inspect.push(node);
          if(node.querySelectorAll){
            node.querySelectorAll(".msg").forEach(function(x){ inspect.push(x); });
          }

          inspect.forEach(function(msg){
            if(msg.classList.contains("user")){
              const txt = msg.textContent || "";
              if(frustration(txt) || problemSignal(txt)){
                showFocusedPortrait(2000);
              }
            }
            else if(msg.classList.contains("bot") && pendingHappyImage){
              pendingHappyImage = false;
              appendHappyImage(msg);
              try{ chat.scrollTop = chat.scrollHeight; }catch(_){ }
            }
          });
        });
      });
    });

    observer.observe(chat,{childList:true,subtree:true});
  }

  function wrapConversation(){
    if(!window.ANITA_V7 || typeof window.ANITA_V7.handle !== "function") return false;
    if(window.ANITA_V7.__expressionLayer25_1) return true;

    const previous = window.ANITA_V7.handle.bind(window.ANITA_V7);
    window.ANITA_V7.handle = function(text,l){
      if(satisfaction(text)){
        pendingHappyImage = true;
        return {type:"answer", text:happyReply(l)};
      }
      // Visual reaction only; normal diagnostic engine still receives the message.
      if(frustration(text) || problemSignal(text)){
        showFocusedPortrait(2000);
      }
      return previous(text,l);
    };
    window.ANITA_V7.__expressionLayer25_1 = true;
    return true;
  }

  function init(){
    ensureStyle();
    observeChat();
    wrapConversation();
  }

  window.ANITA_EXPRESSIONS = {
    version:VERSION,
    happyImage:HAPPY_IMAGE,
    focusImage:FOCUS_IMAGE,
    isSatisfied:satisfaction,
    isFrustrated:frustration,
    hasProblemSignal:problemSignal,
    showFocused:function(){ showFocusedPortrait(2000); }
  };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init, {once:true});
  }else{
    init();
  }

  console.log("[ANITA v25.1] Expression Visual Layer loaded");
})();
