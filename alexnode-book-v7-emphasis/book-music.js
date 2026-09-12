(() => {
  "use strict";

  const MUSIC_URL = "https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/alexnode-book-v7-emphasis/the-next-page.mp3";
  const DEFAULT_VOLUME = 0.22;

  let audio = null;
  let button = null;
  let userMuted = false;

  function ensureAudio(){
    if(audio) return audio;

    audio = new Audio(MUSIC_URL);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    return audio;
  }

  function ensureButton(){
    if(button) return button;

    button = document.createElement("button");
    button.id = "bookMusicToggle";
    button.type = "button";
    button.className = "book-music-toggle";
    button.setAttribute("aria-label", "Toggle reading music");
    button.title = "Reading music";
    button.textContent = "♫";
    document.body.appendChild(button);

    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const a = ensureAudio();

      userMuted = !userMuted;
      if(userMuted){
        a.pause();
        button.classList.add("muted");
        button.textContent = "♪";
      }else{
        button.classList.remove("muted");
        button.textContent = "♫";
        if(document.getElementById("reader")?.classList.contains("show")){
          a.play().catch(()=>{});
        }
      }
    });

    return button;
  }

  function playMusic(){
    const a = ensureAudio();
    const b = ensureButton();
    b.classList.add("show");

    if(userMuted) return;
    a.volume = DEFAULT_VOLUME;
    a.play().catch(err => {
      console.warn("[AN BOOK MUSIC] playback blocked until next user tap", err);
    });
  }

  function stopMusic(reset=true){
    if(audio){
      audio.pause();
      if(reset){
        try{ audio.currentTime = 0; }catch(_e){}
      }
    }
    if(button) button.classList.remove("show");
  }

  function bind(){
    ensureButton();

    const reader = document.getElementById("reader");
    const openBtn = document.getElementById("openBookButton");
    const focusFront = document.getElementById("focusFront");
    const closeBtn = document.getElementById("closeReader");

    if(!reader || !openBtn || !focusFront || !closeBtn){
      setTimeout(bind, 250);
      return;
    }

    const startFromUserTap = () => {
      const focusZone = document.getElementById("focusZone");
      if(focusZone?.classList.contains("buy-preview-mode")) return;
      playMusic();
    };

    openBtn.addEventListener("click", startFromUserTap, false);
    focusFront.addEventListener("click", startFromUserTap, false);
    closeBtn.addEventListener("click", () => stopMusic(true), false);

    const observer = new MutationObserver(() => {
      if(reader.classList.contains("show")){
        if(!userMuted) playMusic();
      }else{
        stopMusic(true);
      }
    });

    observer.observe(reader, {attributes:true, attributeFilter:["class"]});
    window.addEventListener("pagehide", () => stopMusic(true));

    console.log("[AN BOOK MUSIC] loaded at 22% volume");
  }

  const style = document.createElement("style");
  style.textContent = `
    .book-music-toggle{
      position:fixed;
      right:24px;
      bottom:82px;
      z-index:99999;
      width:42px;
      height:42px;
      border-radius:50%;
      border:1px solid rgba(255,255,255,.32);
      background:rgba(8,6,10,.70);
      color:#fff;
      font-size:21px;
      line-height:1;
      cursor:pointer;
      opacity:0;
      visibility:hidden;
      pointer-events:none;
      transform:translateY(8px);
      transition:.2s ease;
      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);
      box-shadow:0 8px 22px rgba(0,0,0,.28);
    }
    .book-music-toggle.show{
      opacity:1;
      visibility:visible;
      pointer-events:auto;
      transform:translateY(0);
    }
    .book-music-toggle.muted{opacity:.62}

    @media (max-width:640px){
      .book-music-toggle{
        right:12px;
        bottom:70px;
        width:38px;
        height:38px;
        font-size:19px;
      }
    }
  `;
  document.head.appendChild(style);

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bind, {once:true});
  }else{
    bind();
  }
})();