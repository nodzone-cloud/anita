(function(){
const C=ANITA50_CONFIG,W=window.ANITA50=window.ANITA50||{};

const n=s=>(s||"").toLowerCase()
  .replace(/[?!.,:;()"']/g," ")
  .replace(/\s+/g," ")
  .trim();

const lng=t=>/[А-Яа-яЁё]/.test(t)?"ru":"en";
const say=(l,en,ru)=>l==="ru"?ru:en;

function cleanBusiness(s){
  let v=(s||"").trim()
    .replace(/[.!?]+$/,"")
    .replace(/\s+/g," ");
  v=v.replace(/\bpetshop\b/ig,"pet shop");
  v=v.split(/\s+(?:where|that|which|so that|because|and i want|with visitors)\s+/i)[0].trim();
  return v;
}

function extractName(text){
  const m=(text||"").match(/\b(?:my name is|call me)\s+([A-Za-zÀ-ÖØ-öø-ÿА-Яа-яЁё-]{2,40})\b/i);
  return m?m[1].trim():null;
}

function extractBusiness(text){
  const t=(text||"").trim();
  const patterns=[
    /\b(?:website|site)\s+for\s+my\s+(.+?)(?:[.!?]|$)/i,
    /\b(?:website|site)\s+for\s+(?:a|an)\s+(.+?)(?:[.!?]|$)/i,
    /\bmy\s+business\s+is\s+(?:a|an\s+)?(.+?)(?:[.!?]|$)/i,
    /\bi\s+(?:run|own)\s+(?:a|an\s+)?(.+?)(?:[.!?]|$)/i,
    /\bсайт\s+для\s+(?:моего|моей|моих)\s+(.+?)(?:[.!?]|$)/i,
    /\bмой\s+бизнес\s*[-—:]?\s*(.+?)(?:[.!?]|$)/i
  ];
  for(const re of patterns){
    const m=t.match(re);
    if(m){
      const b=cleanBusiness(m[1]);
      if(b && b.length<=100) return b;
    }
  }
  return null;
}

function memoryWith(ctx,patch){
  return Object.assign(
    {name:null,business:null,businessRaw:null},
    ctx.clientMemory||{},
    patch||{}
  );
}

function briefSummary(ctx,l){
  const b=ctx.websiteBrief||{};
  const m=ctx.clientMemory||{};
  const business=b.business||m.business;
  const parts=[];
  if(business) parts.push(l==="ru"?`бизнес: ${business}`:`business: ${business}`);
  if(b.goal) parts.push(l==="ru"?`цель сайта: ${b.goal}`:`website goal: ${b.goal}`);
  if(b.size) parts.push(l==="ru"?`размер: ${b.size}`:`size: ${b.size}`);
  if(b.recommendedPackage){
    const price=(C.packages[b.recommendedPackage]||{}).price;
    parts.push(l==="ru"?`пакет: ${b.recommendedPackage}${price?` (${price})`:""}`:`package: ${b.recommendedPackage}${price?` (${price})`:""}`);
  }
  if(b.recommendedStructure) parts.push(l==="ru"?`структура: ${b.recommendedStructure}`:`structure: ${b.recommendedStructure}`);
  if(!parts.length) return null;
  return l==="ru"
    ? `Вот что я помню о вашем проекте 😊 ${parts.join("; ")}.`
    : `Here’s what I remember about your project 😊 ${parts.join("; ")}.`;
}

function recallBrief(text,l,ctx,memory){
  const x=n(text);
  const b=ctx.websiteBrief||{};

  if(/what did i want visitors to do|what should visitors do|what was my website goal|what was the goal of my website|do you remember my website goal|что я хотел.*посетител|какая была цель.*сайт|ты помнишь.*цель.*сайт/.test(x)){
    if(b.goal) return{
      kind:"answer",role:"secretary",language:l,memory,pose:"professional",
      text:say(l,`You wanted visitors to: ${b.goal} 😊`,`Вы хотели, чтобы посетители: ${b.goal} 😊`)
    };
    return{
      kind:"answer",role:"secretary",language:l,memory,pose:"professional",
      text:say(l,"I don't have your website goal saved yet 😊","Цель сайта у меня пока не сохранена 😊")
    };
  }

  if(/what size website did i want|how big.*website|how many pages.*(?:did i want|we discuss|did we discuss)|what website size.*(?:did i|we)|какой размер.*сайт|сколько страниц.*(?:хотел|обсуждали)/.test(x)){
    if(b.size) return{
      kind:"answer",role:"secretary",language:l,memory,pose:"professional",
      text:say(l,`You wanted: ${b.size} 😊`,`Вы хотели: ${b.size} 😊`)
    };
    return{
      kind:"answer",role:"secretary",language:l,memory,pose:"professional",
      text:say(l,"I don't have the website size saved yet 😊","Размер сайта у меня пока не сохранён 😊")
    };
  }

  if(/which package did you recommend|what package did you recommend|what was your package recommendation|do you remember.*package|какой пакет.*рекоменд|что ты рекомендовал.*пакет/.test(x)){
    if(b.recommendedPackage){
      const price=(C.packages[b.recommendedPackage]||{}).price;
      return{
        kind:"answer",role:"secretary",language:l,memory,pose:"professional",
        text:say(l,`I recommended ${b.recommendedPackage}${price?` (${price})`:""} for your project 😊`,`Для вашего проекта я рекомендовала ${b.recommendedPackage}${price?` (${price})`:""} 😊`)
      };
    }
    return{
      kind:"answer",role:"secretary",language:l,memory,pose:"professional",
      text:say(l,"I haven't saved a package recommendation for this project yet 😊","Рекомендация по пакету для этого проекта у меня пока не сохранена 😊")
    };
  }

  if(/what do you remember about my website|what do you remember about my project|remind me.*(?:website|project)|summari[sz]e.*my.*(?:website|project)|что ты помнишь.*(?:сайт|проект)|напомни.*(?:сайт|проект)/.test(x)){
    const summary=briefSummary(ctx,l);
    return{
      kind:"answer",role:"secretary",language:l,memory,pose:"professional",
      text:summary||say(l,"I don't have a website brief saved for you yet 😊","У меня пока нет сохранённого брифа вашего сайта 😊")
    };
  }

  if(/can we continue.*(?:website|project)|continue.*my.*(?:website|project)|let's continue.*(?:website|project)|продолжим.*(?:сайт|проект)|можем продолжить.*(?:сайт|проект)/.test(x)){
    const summary=briefSummary(ctx,l);
    if(summary){
      const next=ctx.pending
        ? say(l,"Let's continue from the next missing detail.","Продолжим со следующего недостающего пункта.")
        : say(l,"The main brief is already complete. I can prepare a short project summary for Alex or help refine the structure.","Основной бриф уже собран. Я могу подготовить короткое резюме проекта для Алекса или помочь уточнить структуру.");
      return{kind:"answer",role:"secretary",language:l,memory,pose:"professional",text:`${summary} ${next}`};
    }
    return{
      kind:"answer",role:"secretary",language:l,memory,pose:"professional",
      text:say(l,"We can start your website brief now 😊 Tell me what kind of business the site is for.","Можем начать бриф сайта сейчас 😊 Расскажите, для какого бизнеса нужен сайт.")
    };
  }

  return null;
}

function consult(text,l,ctx){
  const x=n(text);
  const b=Object.assign({},ctx.websiteBrief||{});
  const foundBusiness=extractBusiness(text);

  if(/i want a website|i need a website|need a site|want a site|хочу сайт|нужен сайт/.test(x)){
    if(foundBusiness){
      b.business=foundBusiness;
      return{
        kind:"answer",role:"secretary",language:l,
        topic:"website_consultation",pending:"goal",
        brief:b,
        memory:memoryWith(ctx,{business:foundBusiness,businessRaw:text}),
        text:say(
          l,
          `Absolutely 😊 A website for ${foundBusiness}. What should visitors mainly do there — learn about the business, request a quote, contact you, book a service, view prices, buy something, or something else?`,
          `Конечно 😊 Сайт для бизнеса «${foundBusiness}». Что посетители должны в первую очередь делать на сайте — узнать о бизнесе, оставить заявку, связаться с вами, записаться, посмотреть цены, купить что-то или другое?`
        )
      };
    }
    return{
      kind:"answer",role:"secretary",language:l,
      topic:"website_consultation",pending:"business",
      brief:b,
      memory:memoryWith(ctx),
      text:say(
        l,
        "Absolutely 😊 Before price, tell me what kind of business the site is for and what visitors should do there.",
        "Конечно 😊 Прежде чем говорить о цене, расскажите, для какого бизнеса нужен сайт и что посетители должны делать на нём."
      )
    };
  }

  if(ctx.topic==="website_consultation"&&ctx.pending==="business"){
    const business=foundBusiness||cleanBusiness(text);
    b.business=business;
    return{
      kind:"answer",role:"secretary",language:l,
      topic:"website_consultation",pending:"goal",
      brief:b,
      memory:memoryWith(ctx,{business,businessRaw:text}),
      text:say(
        l,
        `Got it 😊 ${business}. What should the site mainly achieve: present the business, get enquiries, show services/prices, take bookings, sell products, or something else?`,
        `Поняла 😊 ${business}. Какая главная задача сайта: представить бизнес, получать заявки, показать услуги и цены, принимать бронирования, продавать товары или что-то другое?`
      )
    };
  }

  if(ctx.topic==="website_consultation"&&ctx.pending==="goal"){
    b.goal=text;
    return{
      kind:"answer",role:"secretary",language:l,
      topic:"website_consultation",pending:"size",
      brief:b,memory:memoryWith(ctx),
      text:say(
        l,
        "Roughly how large: one landing page, a few separate pages, or a larger multi-page site?",
        "Примерно какой объём нужен: одна посадочная страница, несколько отдельных страниц или более крупный многостраничный сайт?"
      )
    };
  }

  if(ctx.topic==="website_consultation"&&ctx.pending==="size"){
    b.size=text;
    let p="MEDIUM",s="Home → About → Services → Prices → Contact";
    if(/one|single|1 page|landing|одн|1 стра/.test(n(text))){
      p="START";s="Hero → About → Services → Prices → Contact";
    }else if(/2|3|few|couple|несколько|пару/.test(n(text))){
      p="LIGHT";s="Home → Services → About / Contact";
    }else if(/custom|interactive|нестандарт|интерактив/.test(n(text))){
      p="CODE";s="Custom structure based on functionality";
    }
    b.recommendedPackage=p;
    b.recommendedStructure=s;
    return{
      kind:"answer",role:"secretary",language:l,
      topic:"website_consultation",pending:null,
      brief:b,memory:memoryWith(ctx),
      text:say(
        l,
        `Based on what you've told me, I’d start with: ${s}. The closest package is ${p} (${C.packages[p].price}). Alex can confirm the exact scope after reviewing the project.`,
        `По вашему описанию я бы начала со структуры: ${s}. Ближе всего пакет ${p} (${C.packages[p].price}). Точный объём Алекс подтвердит после просмотра проекта.`
      )
    };
  }

  if(ctx.topic==="website_consultation"&&!ctx.pending&&/^(ok|okay|great|thanks|thank you|хорошо|ок|спасибо)$/.test(x)){
    const business=b.business||(ctx.clientMemory||{}).business;
    const p=b.recommendedPackage;
    return{
      kind:"answer",role:"secretary",language:l,
      topic:"website_consultation",pending:null,
      brief:b,memory:memoryWith(ctx),
      pose:"professional",
      text:say(
        l,
        `Great 😊 I have the main information${business?` about your ${business} website`:""}. ${p?`My current package recommendation is ${p} (${C.packages[p].price}). `:""}I can now prepare a short project summary for Alex instead of starting the questions again.`,
        `Отлично 😊 Основную информацию${business?` о сайте для ${business}`:""} я уже собрала. ${p?`Сейчас я рекомендую пакет ${p} (${C.packages[p].price}). `:""}Теперь я могу подготовить короткое резюме проекта для Алекса, а не начинать вопросы заново.`
      )
    };
  }

  return null;
}

W.roles={
  route(text){
    const ctx=W.state.context();
    const x=n(text);
    const l=lng(text);

    const foundName=extractName(text);
    const foundBusiness=extractBusiness(text);
    let memory=memoryWith(ctx);
    if(foundName) memory=memoryWith(ctx,{name:foundName});
    if(foundBusiness) memory=Object.assign({},memory,{business:foundBusiness,businessRaw:text});

    if(foundName){
      return{
        kind:"answer",role:ctx.role||"guide",language:l,
        memory,pose:"neutral",
        text:say(l,`Nice to meet you, ${foundName} 😊`,`Приятно познакомиться, ${foundName} 😊`)
      };
    }

    if(/what is my name|what's my name|do you remember my name|как меня зовут|ты помнишь мое имя|ты помнишь моё имя/.test(x)){
      if(memory.name){
        return{
          kind:"answer",role:ctx.role||"guide",language:l,
          memory,pose:"neutral",
          text:say(l,`Your name is ${memory.name} 😊`,`Вас зовут ${memory.name} 😊`)
        };
      }
      return{
        kind:"answer",role:ctx.role||"guide",language:l,
        memory,pose:"neutral",
        text:say(l,"I don't know your name yet 😊 What should I call you?","Я пока не знаю вашего имени 😊 Как мне к вам обращаться?")
      };
    }

    if(/what kind of business did i tell you about|what is my business|what's my business|do you remember my business|какой у меня бизнес|что у меня за бизнес|ты помнишь мой бизнес/.test(x)){
      if(memory.business){
        return{
          kind:"answer",role:"secretary",language:l,
          memory,pose:"professional",
          text:say(
            l,
            `You told me about your ${memory.business} 😊`,
            `Вы рассказывали мне о своём бизнесе: ${memory.business} 😊`
          )
        };
      }
      return{
        kind:"answer",role:"secretary",language:l,
        memory,pose:"professional",
        text:say(
          l,
          "I don't have your business type saved yet 😊 Tell me what business the project is for and I'll keep it with your website brief.",
          "Тип вашего бизнеса у меня пока не сохранён 😊 Расскажите, для какого бизнеса проект, и я сохраню это вместе с брифом."
        )
      };
    }

    const recalled=recallBrief(text,l,ctx,memory);
    if(recalled)return recalled;

    const c=consult(text,l,ctx);
    if(c)return c;

    if(foundBusiness){
      // Remember the client fact before the AI fallback, even outside the consultation flow.
      memory=Object.assign({},memory,{business:foundBusiness,businessRaw:text});
    }

    if(/guide me|website tour|покажи.*сайт|проведи.*сайт/.test(x))
      return{kind:"tour",role:"guide",language:l,memory};

    if(/book|appointment|meeting|calendar|запис|встреч|календар/.test(x))
      return{
        kind:"answer",role:"secretary",language:l,memory,pose:"professional",
        text:say(
          l,
          `I can prepare the appointment request, but direct calendar booking is not enabled yet. ${C.contact.phone} · ${C.contact.email}`,
          `Я могу подготовить заявку на встречу, но прямое бронирование календаря пока не включено. ${C.contact.phone} · ${C.contact.email}`
        )
      };

    if(/computer|windows|printer|wifi|pc|laptop|компьютер|виндов|принтер|ноутбук/.test(x))
      return{
        kind:"answer",role:"it",language:l,memory,pose:"important",
        text:say(
          l,
          "I can help as IT Assistance. Tell me exactly what happens and whether you see an error message.",
          "Я могу помочь как IT Assistance. Расскажите, что именно происходит и появляется ли ошибка."
        )
      };

    if(/^(hi|hello|hey|привет|здравствуй)$/.test(x))
      return{
        kind:"answer",role:"guide",language:l,memory,pose:"neutral",
        text:say(l,"Hi 😊 How can I help you today?","Привет 😊 Чем могу помочь?")
      };

    if(/price|pricing|how much.*website|цена.*сайт|стоимость.*сайт/.test(x))
      return{
        kind:"answer",role:"secretary",language:l,memory,pose:"professional",
        text:say(
          l,
          "START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE from 700 €. Describe the site you want and I can suggest the structure and package first.",
          "START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE от 700 €. Опишите сайт, и я сначала предложу структуру и подходящий пакет."
        )
      };

    return{kind:"engine",role:ctx.role||"guide",language:l,memory};
  }
};
})();
