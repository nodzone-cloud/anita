(function (w) {
  'use strict';
  const AN = w.ANVoiceSite = w.ANVoiceSite || {};

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[“”„\"'`´.,!?;:()[\]{}<>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const languageCommands = [
    {
      lang:'ru',
      terms:/(русский|по русски|на русском|переключи на русский|включи русский|russian|switch to russian|venajaksi|venäjäksi)/
    },
    {
      lang:'fi',
      terms:/(финский|по фински|на финском|переключи на финский|включи финский|finnish|switch to finnish|suomeksi|vaihda suomeksi)/
    },
    {
      lang:'en',
      terms:/(английский|по английски|на английском|переключи на английский|включи английский|english|switch to english|englanniksi|vaihda englanniksi)/
    }
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
    { id:'pricing', terms:/(price|prices|cost|costs|cheap|affordable|package|packages|plan|pricing|цен|цена|цены|стои|стоимость|дешев|пакет|тариф|hinta|hinnat|maks|edull|paket|hinnoittelu)/ },
    { id:'process', terms:/(process|workflow|how do you work|work process|create|build|develop|development|процесс|как работаете|как вы работаете|созда|разработ|miten toimitte|miten tyoskentelette|miten työskentelette|tyoprosessi|työprosessi|toteut|rakenn)/ },
    { id:'anita', terms:/(anita|анит|assistant|virtual assistant|ассистент|виртуальн\w* ассистент|avustaja|virtuaaliassistentti)/ },
    { id:'benefits', terms:/(benefit|benefits|why voice|why useful|useful|польз|зачем голос|почему голос|hyoty|hyödyt|miksi puhe)/ },
    { id:'experience', terms:/(try|demo|preview|test voice|попроб|демо|пример|kokeile|esimerkki)/ },
    { id:'human-tech', terms:/(human tech|human technology|хуман тек|хьюман тек|human tech filosofia|human tech philosophy)/ },
    { id:'contact', terms:/(address|location|where are you|адрес|где вы|sijainti|osoite|missä olette)/ }
  ];

  const externalRoutes = [
    {
      url:'https://alexnode.fi/boook',
      terms:/(book|alex node book|книга|книгу|kirja|alex node kirja)/
    },
    {
      url:'https://alexnode.fi/antest',
      terms:/(open anita|try anita|test anita|открой аниту|попробовать аниту|тест аниты|avaa anita|kokeile anitaa)/
    },
    {
      url:'https://alexnode.fi',
      terms:/(main site|main website|alex node website|главный сайт|сайт alex node|paasivu|pääsivu|alex node sivu)/
    }
  ];

  AN.normalizeVoiceText = normalize;

  AN.routeRequest = function routeRequest(utterance) {
    const text = normalize(utterance);
    if (!text) return { handled:false, type:'none', text:'' };

    const lang = languageCommands.find(item => item.terms.test(text));
    if (lang) return { handled:true, type:'language', lang:lang.lang, text };

    const external = externalRoutes.find(item => item.terms.test(text));
    if (external) return { handled:true, type:'external', url:external.url, text };

    const route = sectionRoutes.find(item => item.terms.test(text));
    if (route) return { handled:true, type:'section', id:route.id, text };

    return { handled:false, type:'none', text };
  };
})(window);
