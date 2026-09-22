(function (w) {
  'use strict';
  const AN = w.ANVoiceSite = w.ANVoiceSite || {};

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[“”„"'\`´.,!?;:()[\]{}<>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function hasAny(text, phrases) {
    return phrases.some(function (phrase) { return text.includes(phrase); });
  }

  const phraseSets = {
    nextHeading: [
      'к следующему заголовку','следующий заголовок','перейди к следующему заголовку','опусти к следующему заголовку',
      'прокрути к следующему заголовку','покажи следующий заголовок','дальше к заголовку','следующий подзаголовок',
      'next heading','go to next heading','scroll to next heading','show next heading','move to next heading',
      'next title','go to the next title','next subtitle',
      'seuraava otsikko','siirry seuraavaan otsikkoon','vierita seuraavaan otsikkoon','näytä seuraava otsikko','seuraava väliotsikko'
    ],
    prevHeading: [
      'к предыдущему заголовку','предыдущий заголовок','верни к предыдущему заголовку','подними к предыдущему заголовку',
      'покажи предыдущий заголовок','предыдущий подзаголовок',
      'previous heading','go to previous heading','scroll to previous heading','show previous heading','previous title','previous subtitle',
      'edellinen otsikko','siirry edelliseen otsikkoon','vierita edelliseen otsikkoon','näytä edellinen otsikko','edellinen väliotsikko'
    ],
    nextSection: [
      'следующий раздел','к следующему разделу','перейди к следующему разделу','опусти к следующему разделу','покажи следующий раздел',
      'дальше по странице','перейди дальше','следующий блок',
      'next section','go to next section','scroll to next section','show next section','next block','move forward on the page',
      'seuraava osio','siirry seuraavaan osioon','näytä seuraava osio','seuraava lohko','eteenpäin sivulla'
    ],
    prevSection: [
      'предыдущий раздел','к предыдущему разделу','перейди к предыдущему разделу','верни к предыдущему разделу','предыдущий блок',
      'previous section','go to previous section','scroll to previous section','show previous section','previous block',
      'edellinen osio','siirry edelliseen osioon','näytä edellinen osio','edellinen lohko'
    ],
    smallDown: [
      'чуть ниже','немного ниже','опусти ниже','опусти вниз','прокрути вниз','листай вниз','двинь вниз','сдвинь вниз',
      'прокрути чуть ниже','опусти чуть ниже','покажи ниже','давай ниже','еще ниже','ещё ниже','спустись ниже','спустись немного',
      'scroll down','a little down','scroll a little down','go down','move down','lower the page','a bit lower','slightly lower',
      'show me lower','keep going down','down a little','move a little lower','scroll lower',
      'vieritä alas','vähän alemmas','hieman alemmas','mene alas','siirry alas','näytä alempaa','alemmas vähän','vieritä vähän alas'
    ],
    smallUp: [
      'чуть выше','немного выше','подними выше','подними наверх','прокрути вверх','листай вверх','двинь вверх','сдвинь вверх',
      'прокрути чуть выше','подними чуть выше','покажи выше','давай выше','еще выше','ещё выше','верни чуть выше','поднимись немного',
      'scroll up','a little up','scroll a little up','go up','move up','raise the page','a bit higher','slightly higher',
      'show me higher','keep going up','up a little','move a little higher','scroll higher',
      'vieritä ylös','vähän ylemmäs','hieman ylemmäs','mene ylös','siirry ylös','näytä ylempää','ylemmäs vähän','vieritä vähän ylös'
    ],
    top: [
      'в самый верх','на самый верх','в начало страницы','к началу страницы','наверх страницы','покажи начало страницы',
      'top of page','go to top','scroll to top','back to top','start of page','go to the beginning',
      'sivun alkuun','ihan ylös','sivun yläosaan','takaisin alkuun','siirry alkuun'
    ],
    bottom: [
      'в самый низ','на самый низ','в конец страницы','к концу страницы','покажи конец страницы','самый низ страницы',
      'bottom of page','go to bottom','scroll to bottom','end of page','go to the end',
      'sivun loppuun','ihan alas','sivun alaosaan','siirry loppuun','näytä sivun loppu'
    ],
    cancel: [
      'закрой','закрыть','отмена','отмени','не надо','назад',
      'close','cancel','never mind','go back',
      'sulje','peruuta','ei sittenkään','takaisin'
    ]
  };

  const productTerms = {
    anita: [
      'anita','анита','аниту','аниты','виртуальный ассистент','virtual assistant','virtuaaliassistentti'
    ],
    websites: [
      'website','websites','web site','website package','site','sites',
      'сайт','сайты','веб сайт','веб сайты','создание сайта','вебсайт',
      'verkkosivu','verkkosivut','kotisivu','kotisivut'
    ],
    voice: [
      'voice package','voice paket','voice pack','voice website','voice site','voice',
      'голосовой пакет','voice пакет','голосовой сайт','голосовой','пакет голоса',
      'puhepaketti','voice paketti','puheohjaus','puheohjattu sivu'
    ]
  };

  const priceTerms = [
    'сколько стоит','какая цена','какие цены','покажи цены','покажи цену','цена','стоимость','сколько это стоит','во сколько обойдется','во сколько обойдётся',
    'how much','how much is it','how much does it cost','what does it cost','what is the price','show prices','show price','price','pricing','cost',
    'paljonko maksaa','mitä maksaa','mita maksaa','mikä hinta','mika hinta','näytä hinnat','nayta hinnat','hinta','hinnat','hinnoittelu'
  ];

  const languageCommands = [
    { lang:'ru', terms:/(русский|по русски|на русском|переключи на русский|включи русский|russian|switch to russian|venajaksi|venäjäksi)/ },
    { lang:'fi', terms:/(финский|по фински|на финском|переключи на финский|включи финский|finnish|switch to finnish|suomeksi|vaihda suomeksi)/ },
    { lang:'en', terms:/(английский|по английски|на английском|переключи на английский|включи английский|english|switch to english|englanniksi|vaihda englanniksi)/ }
  ];

  const sectionRoutes = [
    { id:'ht-01', terms:/human tech|что такое human|что значит human tech|mika human tech|mitä human tech/ },
    { id:'ht-02', terms:/technology with character|technology with personality|технологи\w* с характер|teknologia\w* persoona/ },
    { id:'ht-03', terms:/why alex node|почему alex node|почему выбрал|miksi alex node/ },
    { id:'ht-04', terms:/understand people|understands people|понимать человека|понимает человека|ymmarta\w* ihmista|ymmärtä\w* ihmistä/ },
    { id:'ht-05', terms:/fewer actions|less clicks|меньше действий|меньше кликов|vahemman vaiheita|vähemmän vaiheita|vahemman klikk|vähemmän klikk/ },
    { id:'ht-06', terms:/accessibility|accessible|доступност|ограниченн\w* возможност|saavutettavuus|esteet/ },
    { id:'ht-07', terms:/voice instead|voice navigation|голос вместо|голосов\w* навигац|голосов\w* клик|puhe\w* navig|puhe\w* klikk/ },
    { id:'ht-08', terms:/user\w* control|stay\w* in control|человек\w* главн|пользователь\w* контрол|kayttaja\w* hallin|käyttäjä\w* hallin/ },
    { id:'ht-09', terms:/anita\w* human tech|human tech\w* anita|анита\w* human tech/ },
    { id:'ht-10', terms:/future\w* interaction|будущее\w* взаимодейств|vuorovaikutuksen tulevaisuus|tulevaisuuden vuorovaikutus/ },
    { id:'contact', terms:/(phone|number|email|e mail|contact|contacts|call|telephone|телефон|номер|почт|контакт|связ|позвон|puhelin|numero|sahkopost|sähköpost|yhteys|yhteystiedot|soita)/ },
    { id:'process', terms:/(process|workflow|how do you work|work process|create|build|develop|development|процесс|как работаете|как вы работаете|созда|разработ|miten toimitte|miten tyoskentelette|miten työskentelette|tyoprosessi|työprosessi|toteut|rakenn)/ },
    { id:'anita', terms:/(tell me about anita|about anita|расскажи про аниту|об аните|kerro anitasta|anita.*human tech)/ },
    { id:'benefits', terms:/(benefit|benefits|why voice|why useful|useful|польз|зачем голос|почему голос|hyoty|hyödyt|miksi puhe)/ },
    { id:'experience', terms:/(try|demo|preview|test voice|попроб|демо|пример|kokeile|esimerkki)/ },
    { id:'human-tech', terms:/(human tech|human technology|хуман тек|хьюман тек|human tech filosofia|human tech philosophy)/ }
  ];

  const externalRoutes = [
    { url:'https://alexnode.fi/boook', terms:/(book|alex node book|книга|книгу|kirja|alex node kirja)/ },
    { url:'https://alexnode.fi/antest', terms:/(open anita|try anita|test anita|открой аниту|попробовать аниту|тест аниты|avaa anita|kokeile anitaa)/ },
    { url:'https://alexnode.fi', terms:/(main site|main website|alex node website|главный сайт|сайт alex node|paasivu|pääsivu|alex node sivu)/ }
  ];

  // Navigate to one of the ten Human Tech entries by title or number.
  const humanTechNumberWords = [
    ['один','первый','первую','one','first','yksi','ensimmäinen'],
    ['два','второй','вторую','two','second','kaksi','toinen'],
    ['три','третий','третью','three','third','kolme','kolmas'],
    ['четыре','четвертый','четвертую','four','fourth','neljä','neljas'],
    ['пять','пятый','пятую','five','fifth','viisi','viides'],
    ['шесть','шестой','шестую','six','sixth','kuusi','kuudes'],
    ['семь','седьмой','седьмую','seven','seventh','seitsemän','seitsemäs'],
    ['восемь','восьмой','восьмую','eight','eighth','kahdeksan','kahdeksas'],
    ['девять','девятый','девятую','nine','ninth','yhdeksän','yhdeksäs'],
    ['десять','десятый','десятую','ten','tenth','kymmenen','kymmenes']
  ];
  const humanTechContext = /(?:human tech|хуман тек|хьюман тек|раздел|пункт|секци|номер|section|item|topic|number|kohta|osio|numero)/;
  const humanTechAliases = [
    null,
    /(?:технологи[яюи] с характер|technology with character|technology with personality|teknologiaa persoonalla)/,
    /(?:почему alex node выбрал|why alex node chose|miksi alex node valitsi)/,
    /(?:технологи[яию] должна понимать|технологи[яию] понимает человека|technology should understand people|teknologian pitää ymmärtää)/,
    /(?:меньше действий|fewer actions|vähemmän vaiheita)/,
    /(?:доступност|accessibility|saavutettavuus)/,
    /(?:голос вместо лишних кликов|voice instead of extra clicks|puhe turhien klikkausten)/,
    /(?:человек оста[её]тся главн|user stays in control|käyttäjä säilyttää hallinnan)/,
    /(?:анита и human tech|anita and human tech|anita ja human tech)/,
    /(?:будущее взаимодействия|future of interaction|vuorovaikutuksen tulevaisuus)/
  ];

  function humanTechDestination(text) {
    const translations = AN.humanTechTranslations || {};
    for (let number = 1; number <= 10; number++) {
      const matchesTitle = ['ru','en','fi'].some(function (lang) {
        const title = translations[lang] && translations[lang]['t' + number];
        return title && text.includes(normalize(title));
      });
      if (matchesTitle || humanTechAliases[number - 1] && humanTechAliases[number - 1].test(text)) {
        return 'ht-' + String(number).padStart(2, '0');
      }
    }

    if (/(?:€|евро|euro|цен|price|cost|hinta)/.test(text)) return null;
    const numberMatch = text.match(/(?:^|\s)(?:0\s*([1-9])|(10|[1-9]))(?=\s|$)/);
    const bareNumber = /^(?:0\s*[1-9]|[1-9]|10)$/.test(text);
    if (numberMatch && (bareNumber || humanTechContext.test(text))) {
      const number = Number(numberMatch[1] || numberMatch[2]);
      return 'ht-' + String(number).padStart(2, '0');
    }

    const words = text.replace(/(?:^|\s)(?:ноль|zero|nolla)\s+/,' ').trim().split(/\s+/);
    if (words.length === 1 || humanTechContext.test(text)) {
      for (let i = 0; i < humanTechNumberWords.length; i++) {
        if (words.some(function (word) { return humanTechNumberWords[i].includes(word); })) {
          return 'ht-' + String(i + 1).padStart(2, '0');
        }
      }
    }
    return null;
  }

  function detectProduct(text) {
    if (hasAny(text, productTerms.voice)) return 'voice';
    if (hasAny(text, productTerms.anita)) return 'anita';
    if (hasAny(text, productTerms.websites)) return 'websites';
    return null;
  }

  AN.normalizeVoiceText = normalize;
  AN.voicePhraseSets = phraseSets;
  AN.productTerms = productTerms;

  AN.routeRequest = function routeRequest(utterance) {
    const text = normalize(utterance);
    if (!text) return { handled:false, type:'none', text:'' };

    if (AN.isPriceModalOpen && AN.isPriceModalOpen()) {
      if (hasAny(text, phraseSets.cancel)) return { handled:true, type:'price_cancel', text };
      const modalProduct = detectProduct(text);
      if (modalProduct) return { handled:true, type:'product', product:modalProduct, text };
    }

    if (hasAny(text, phraseSets.top)) return { handled:true, type:'scroll', action:'top', text };
    if (hasAny(text, phraseSets.bottom)) return { handled:true, type:'scroll', action:'bottom', text };
    if (hasAny(text, phraseSets.nextHeading)) return { handled:true, type:'scroll', action:'nextHeading', text };
    if (hasAny(text, phraseSets.prevHeading)) return { handled:true, type:'scroll', action:'prevHeading', text };
    if (hasAny(text, phraseSets.nextSection)) return { handled:true, type:'scroll', action:'nextSection', text };
    if (hasAny(text, phraseSets.prevSection)) return { handled:true, type:'scroll', action:'prevSection', text };
    if (hasAny(text, phraseSets.smallDown)) return { handled:true, type:'scroll', action:'smallDown', text };
    if (hasAny(text, phraseSets.smallUp)) return { handled:true, type:'scroll', action:'smallUp', text };

    const humanTechId = humanTechDestination(text);
    if (humanTechId) return { handled:true, type:'section', id:humanTechId, text };

    if (hasAny(text, priceTerms)) {
      const product = detectProduct(text);
      if (product) return { handled:true, type:'product', product, text };

      const cfg = w.AN_VOICE_CONFIG || {};
      if (cfg.pageProduct) {
        return { handled:true, type:'product', product:cfg.pageProduct, currentPagePreferred:true, text };
      }
      return { handled:true, type:'price_ambiguous', text };
    }

    const lang = languageCommands.find(function (item) { return item.terms.test(text); });
    if (lang) return { handled:true, type:'language', lang:lang.lang, text };

    const external = externalRoutes.find(function (item) { return item.terms.test(text); });
    if (external) return { handled:true, type:'external', url:external.url, text };

    const route = sectionRoutes.find(function (item) { return item.terms.test(text); });
    if (route) return { handled:true, type:'section', id:route.id, text };

    return { handled:false, type:'none', text };
  };
})(window);
