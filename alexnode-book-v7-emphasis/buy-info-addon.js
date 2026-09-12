/* ALEX NODE BOOK — BUY INFO ADD-ON
   Adds explanatory purchase text to #buyView.
   Works on desktop + mobile.
   Follows the current RU / EN / FI language buttons.
*/
(function(){
  "use strict";

  const ID = "an-buy-info-addon";

  const COPY = {
    ru:{
      title:"Как купить книгу",
      intro:"Выберите нужное издание ниже. Перед покупкой вы можете открыть книгу и посмотреть её. Когда определитесь, нажмите кнопку покупки у выбранного издания.",
      steps:[
        ["Выберите издание","Русская или английская версия."],
        ["Посмотрите книгу","Откройте книгу и ознакомьтесь с содержанием перед покупкой."],
        ["Перейдите к покупке","Нажмите кнопку покупки у выбранного издания и продолжите оформление."]
      ]
    },
    en:{
      title:"How to buy the book",
      intro:"Choose the edition you want below. You can open and preview the book before buying. When you are ready, use the purchase button for the selected edition.",
      steps:[
        ["Choose an edition","Select the Russian or English version."],
        ["Preview the book","Open the book and look through it before purchasing."],
        ["Continue to purchase","Use the purchase button for the selected edition and continue with checkout."]
      ]
    },
    fi:{
      title:"Kirjan ostaminen",
      intro:"Valitse alta haluamasi painos. Voit avata ja esikatsella kirjaa ennen ostamista. Kun olet valmis, käytä valitun painoksen ostopainiketta.",
      steps:[
        ["Valitse painos","Valitse venäjän- tai englanninkielinen versio."],
        ["Esikatsele kirjaa","Avaa kirja ja tutustu siihen ennen ostamista."],
        ["Jatka ostoon","Paina valitun painoksen ostopainiketta ja jatka tilaukseen."]
      ]
    }
  };

  function normLang(v){
    v=String(v||"").toLowerCase();
    if(v.startsWith("en")) return "en";
    if(v.startsWith("fi")) return "fi";
    return "ru";
  }

  function currentLang(){
    const active=document.querySelector('.languages button.active[data-lang]');
    if(active) return normLang(active.dataset.lang);
    return normLang(document.documentElement.lang);
  }

  function build(){
    const buyView=document.getElementById("buyView");
    if(!buyView) return null;

    const card=buyView.querySelector(".buy-hub-card");
    if(!card) return null;

    let el=document.getElementById(ID);
    if(el) return el;

    el=document.createElement("section");
    el.id=ID;
    el.className="an-buy-info-addon";
    el.setAttribute("aria-label","Book purchase information");

    const grid=card.querySelector("#buyBooksGrid");
    if(grid) card.insertBefore(el,grid);
    else card.appendChild(el);

    return el;
  }

  function render(){
    const el=build();
    if(!el) return;

    const lang=currentLang();
    const c=COPY[lang];

    el.innerHTML=
      '<h2>'+c.title+'</h2>'+
      '<p>'+c.intro+'</p>'+
      '<div class="an-buy-steps">'+
        c.steps.map(function(step,i){
          return '<div class="an-buy-step">'+
            '<div class="an-buy-step-num">'+(i+1)+'</div>'+
            '<strong>'+step[0]+'</strong>'+
            '<span>'+step[1]+'</span>'+
          '</div>';
        }).join("")+
      '</div>';
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",render,{once:true});
  }else{
    render();
  }

  document.addEventListener("click",function(e){
    const btn=e.target.closest && e.target.closest(".languages button[data-lang]");
    if(btn) setTimeout(render,0);
  });
})();
