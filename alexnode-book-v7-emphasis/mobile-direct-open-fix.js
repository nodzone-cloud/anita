/* Alex Node Book — mobile direct-open fix
   Desktop behavior is untouched.

   Mobile flow:
   RU/EN cover (or RU/EN badge)
        -> existing app selects that edition
        -> immediately opens the selected book
   The desktop focus card is skipped entirely.
*/
(function(){
  "use strict";

  const MOBILE_MAX = 640;

  function isMobile(){
    return window.matchMedia("(max-width:"+MOBILE_MAX+"px)").matches;
  }

  function getEditionItem(el){
    return el && el.closest ? el.closest(".edition-item") : null;
  }

  function getCover(item){
    return item ? item.querySelector(".edition-cover") : null;
  }

  function openSelectedBookAfterApp(){
    /*
      app.js owns selection/language/book data.
      We do not duplicate or replace that logic.
      We wait for app.js to finish its edition click handler, then press
      the existing Open Book control programmatically.
    */
    window.setTimeout(function(){
      if(!isMobile()) return;

      const open = document.getElementById("openBookButton");
      const reader = document.getElementById("reader");

      /* If the reader is already open, there is nothing to do. */
      if(reader && reader.getAttribute("aria-hidden")==="false") return;

      if(open){
        open.click();
      }
    }, 70);
  }

  /*
    Important:
    This listener is NOT capture-mode.
    The original app.js click handler therefore gets the edition first,
    sets the selected RU/EN book, cover, text source, etc.
    Then we skip only the visual focus step.
  */
  document.addEventListener("click", function(e){
    if(!isMobile()) return;

    const cover = e.target.closest(".edition-cover");
    if(cover){
      openSelectedBookAfterApp();
      return;
    }

    const badge = e.target.closest(".edition-badge");
    if(badge){
      const item = getEditionItem(badge);
      const editionCover = getCover(item);
      if(editionCover){
        e.preventDefault();
        editionCover.click();
      }
    }
  });

  /*
    Safety net: if app.js adds .show to #focusZone on mobile,
    strip it immediately. CSS already hides it; this keeps state clean.
  */
  const focus = document.getElementById("focusZone");
  if(focus && "MutationObserver" in window){
    new MutationObserver(function(){
      if(isMobile() && focus.classList.contains("show")){
        focus.classList.remove("show");
        focus.setAttribute("aria-hidden","true");
      }
    }).observe(focus,{attributes:true,attributeFilter:["class","aria-hidden"]});
  }
})();
