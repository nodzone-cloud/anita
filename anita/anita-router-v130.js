(function(){
  const W = window.ANITA = window.ANITA || {};
  function norm(s){ return (s||"").toLowerCase().replace(/ё/g,"е").replace(/[?!.,:;()"']/g," ").replace(/\s+/g," ").trim(); }
  function lang(text){
    if(/[А-Яа-яЁё]/.test(text)) return "ru";
    if(/\b(kuka|mikä|oletko|palvelut|hinnat|portfolio|yhteystiedot|opasta)\b/i.test(text)) return "fi";
    return "en";
  }
  function say(en,ru,fi,l){ return l==="ru"?ru:l==="fi"?fi:en; }

  W.router = {
    local(text){
      const x = norm(text), l = lang(text);

      if(/^(guide me|show me around|show me the website|give me a tour|website tour|take me through the website|проведи меня по сайту|покажи сайт|покажи мне сайт|opasta minua|näytä sivusto)$/i.test(x))
        return {kind:"tour",language:l};

      if(/^(what are you|who are you|what exactly are you|who exactly are you|кто ты|что ты такое|kuka olet|mikä olet)$/i.test(x))
        return {kind:"answer",pose:"neutral",language:l,text:say(
          "I'm ANITA, Alex Node IT Assistance — an original virtual character created by Alex Node. 😊 My main role is IT assistance. I also help visitors learn about Alex Node services and guide them through the website.",
          "Я ANITA, Alex Node IT Assistance — оригинальный виртуальный персонаж Alex Node. 😊 Моя основная специализация — IT-помощь. Также я помогаю посетителям узнать об услугах Alex Node и ориентироваться на сайте.",
          "Olen ANITA, Alex Node IT Assistance — Alex Noden alkuperäinen virtuaalihahmo. 😊 Päätehtäväni on IT-tuki. Autan myös kävijöitä tutustumaan Alex Noden palveluihin ja liikkumaan verkkosivustolla.", l)};

      if(/^(are you a real person|are you real|are you human|are you alive|ты настоящий человек|ты реальный человек|ты человек|oletko oikea ihminen|oletko ihminen)$/i.test(x))
        return {kind:"answer",pose:"neutral",language:l,text:say(
          "No 😊 I'm not a real person. I'm ANITA, Alex Node IT Assistance — an original virtual character created by Alex Node.",
          "Нет 😊 Я не настоящий человек. Я ANITA, Alex Node IT Assistance — оригинальный виртуальный персонаж Alex Node.",
          "En 😊 En ole oikea ihminen. Olen ANITA, Alex Node IT Assistance — Alex Noden alkuperäinen virtuaalihahmo.", l)};

      if(/is your image taken from a real person|are you based on a real person|is your appearance based on a real person|твоя внешность.*реальн|твой образ.*реальн.*человек|ulkonäkö.*oikea.*henkilö/i.test(x))
        return {kind:"answer",pose:"neutral",language:l,text:say(
          "No 😊 My appearance was created specifically for ANITA. I'm an original Alex Node virtual character and I'm not based on any specific real person.",
          "Нет 😊 Моя внешность была создана специально для ANITA. Я оригинальный виртуальный персонаж Alex Node и не основана на каком-либо конкретном реальном человеке.",
          "En 😊 Ulkonäköni luotiin erityisesti ANITAa varten. Olen Alex Noden alkuperäinen virtuaalihahmo, enkä perustu kehenkään tiettyyn oikeaan henkilöön.", l)};

      if(/this is new to me|never seen.*like this|didn't expect this|this is different|oh wow|это для меня ново|никогда такого не видел|впервые такое вижу|tämä on minulle uutta|en ole nähnyt tällaista/i.test(x))
        return {kind:"answer",pose:"neutral",language:l,text:say(
          "I get that 😊 ANITA can feel a little different at first. My main role is IT assistance, and I can also explain Alex Node services and guide you around the website. You can just talk to me normally.",
          "Понимаю 😊 ANITA сначала может показаться чем-то необычным. Моя основная роль — IT Assistance, а ещё я могу объяснять услуги Alex Node и проводить вас по сайту. Со мной можно просто разговаривать обычным образом.",
          "Ymmärrän 😊 ANITA voi aluksi tuntua hieman erilaiselta. Päätehtäväni on IT-tuki, ja voin myös selittää Alex Noden palveluja sekä opastaa sivustolla. Voit puhua minulle aivan normaalisti.", l)};

      if(/^(hi|hello|hey|привет|здравствуй|hei|moi|moikka)$/i.test(x))
        return {kind:"answer",pose:"neutral",language:l,text:say(
          "Hi 😊 How can I help you today? You can also say “guide me” and I'll show you around the Alex Node website.",
          "Привет 😊 Чем могу помочь? Можете также написать «покажи мне сайт», и я проведу вас по Alex Node.",
          "Hei 😊 Kuinka voin auttaa? Voit myös sanoa “opasta minua”, niin esittelen Alex Noden sivuston.", l)};

      if(/i love you|i like you|you are cool|you're cool|awesome|amazing|so cool|ты классная|мне нравится анита|круто|mahtava|siisti/i.test(x))
        return {kind:"answer",pose:"heart",language:l,text:say(
          "Thank you so much! ❤️ I'm really glad you like ANITA.",
          "Большое спасибо! ❤️ Я очень рада, что вам нравится ANITA.",
          "Kiitos paljon! ❤️ Olen todella iloinen, että pidät ANITAsta.", l)};

      if(/website prices?|pricing|how much.*website|цена.*сайт|стоимость.*сайт|hinnat|verkkosiv.*hinta/i.test(x))
        return {kind:"navigate",page:"services",target:"anita-pricing",pose:"ready",language:l,text:say(
          "I'll show you the Alex Node website prices 😊",
          "Сейчас покажу цены Alex Node на сайты 😊",
          "Näytän sinulle Alex Noden verkkosivujen hinnat 😊", l)};

      if(/portfolio|show me your work|projects|портфолио|проекты|projektit/i.test(x))
        return {kind:"navigate",page:"portfolio",target:"anita-portfolio",pose:"ready",language:l,text:say(
          "Sure 😊 I'll show you the Alex Node portfolio.",
          "Конечно 😊 Покажу вам портфолио Alex Node.",
          "Totta kai 😊 Näytän Alex Noden portfolion.", l)};

      if(/services|what do you offer|what does alex node offer|услуги|что предлагает alex node|palvelut/i.test(x))
        return {kind:"navigate",page:"services",target:"anita-services",pose:"professional",language:l,text:say(
          "I'll show you the main Alex Node services.",
          "Сейчас покажу основные услуги Alex Node.",
          "Näytän sinulle Alex Noden tärkeimmät palvelut.", l)};

      if(/contact|phone number|email address|how to contact|контакт|телефон|почта|yhteystiedot|puhelin|sähköposti/i.test(x))
        return {kind:"navigate",page:"contacts",target:"anita-contacts",pose:"professional",language:l,text:say(
          "I'll show you the Alex Node contact details.",
          "Сейчас покажу контакты Alex Node.",
          "Näytän sinulle Alex Noden yhteystiedot.", l)};

      return {kind:"engine",language:l};
    }
  };
})();