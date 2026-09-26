/* Motor Engine Voice UI — SPA continuous session + price highlight + dynamic service details */
(function () {
  'use strict';

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const A = 'assets/audio/';

  const R = {
    intro: '01_intro.mp3?v=10',
    services: '02_uslugi.mp3?v=10',
    prices: '03_ceny.mp3?v=10',
    contact: '04_kontakty.mp3?v=10',
    about: '05_o_nas.mp3?v=10',
    catalog: '06_varianty.mp3?v=10',
    detail: '07_podrobnosti.mp3?v=10',
    priceQuestion: '08_cena_chego.mp3?v=10',
    home: '09_glavnaya.mp3?v=10',
    booking: '10_zapis.mp3?v=10',
    diagnostics: '11_diagnostika.mp3?v=10',
    engine: '12_remont_dvigatelya.mp3?v=10',
    oil: '13_menyaem.mp3?v=10',
    tires: '14_shiny.mp3?v=10',
    hours: '15_chasy.mp3?v=10',
    address: '16_adres.mp3?v=10',
    phone: '17_telefon.mp3?v=10',
    unknown: '18_ne_ponyal.mp3?v=10',
    notfound: '19_ne_nashli.mp3?v=10',
    thanks: '20_rad_pomoch.mp3?v=10'
  };

  // ---------- Service detail data (one template, different content) ----------
  const SERVICE_DETAILS = {
    diagnostics: {
      title: 'Motor Engine — Диагностика',
      heading: 'Подробнее о диагностике',
      lead: 'Компьютерная диагностика двигателя и электронных систем автомобиля.',
      cards: [
        { strong: 'Что проверяем', p: 'ECU, датчики, ошибки и ключевые параметры двигателя.' },
        { strong: 'Результат', p: 'Понятное объяснение найденных проблем и рекомендаций.' },
        { strong: 'Следующий шаг', p: 'Ремонт, замена узлов или дополнительная проверка.' }
      ]
    },
    service: {
      title: 'Motor Engine — Service',
      heading: 'Подробнее о Service',
      lead: 'Плановое техническое обслуживание: масла, фильтры, жидкости и регламентные работы.',
      cards: [
        { strong: 'Что входит', p: 'Замена масла, фильтров, проверка жидкостей и базовые осмотры.' },
        { strong: 'Для кого', p: 'Регулярное обслуживание по пробегу и сезону.' },
        { strong: 'Результат', p: 'Исправный автомобиль и предсказуемый сервис.' }
      ]
    },
    performance: {
      title: 'Motor Engine — Performance',
      heading: 'Подробнее о Performance',
      lead: 'Настройка и решения для производительности автомобиля.',
      cards: [
        { strong: 'Что делаем', p: 'Диагностика узких мест, настройка и оптимизация систем.' },
        { strong: 'Подход', p: 'Точечные улучшения без лишних вмешательств.' },
        { strong: 'Результат', p: 'Более уверенная динамика и отзывчивость.' }
      ]
    }
  };

  // ---------- Static page content ----------
  const PAGES = {
    'index.html': {
      title: 'Motor Engine — Главная',
      nav: 'index',
      html: `<div class="eyebrow">Smart Website · Voice User Interface</div>
<h1>ENGINEERING THAT MOVES YOU</h1>
<p class="lead">Motor Engine — демонстрационный многостраничный сайт с голосовым управлением. Скажите, что хотите найти, и сайт откроет нужную страницу.</p>
<div class="grid">
  <div class="card"><strong>Диагностика</strong><p>Компьютерная диагностика двигателя и электронных систем.</p></div>
  <div class="card"><strong>Сервис</strong><p>Плановое обслуживание и ремонт автомобиля.</p></div>
  <div class="card"><strong>Performance</strong><p>Настройка и решения для производительности.</p></div>
</div>`
    },
    'services.html': {
      title: 'Motor Engine — Услуги',
      nav: 'services',
      html: `<div class="eyebrow">Услуги</div>
<h1>Сервис без лишних остановок</h1>
<p class="lead">Диагностика, техническое обслуживание и ремонт.</p>
<div class="grid">
  <div class="card"><strong>Диагностика двигателя</strong><p>Поиск ошибок и проверка ключевых систем.</p></div>
  <div class="card"><strong>Техническое обслуживание</strong><p>Масла, фильтры, жидкости и плановые работы.</p></div>
  <div class="card"><strong>Ремонт</strong><p>Механические и электрические работы.</p></div>
</div>`
    },
    'prices.html': {
      title: 'Motor Engine — Цены',
      nav: 'prices',
      html: `<div class="eyebrow">Цены</div>
<h1>Понятные цены</h1>
<p class="lead">Демонстрационные цены Motor Engine.</p>
<div class="grid">
  <div class="card" id="price-49"><strong>Диагностика</strong><div class="price">49 €</div></div>
  <div class="card" id="price-99"><strong>Service</strong><div class="price">99 €</div></div>
  <div class="card" id="price-120"><strong>Repair</strong><div class="price">от 120 €</div></div>
</div>`
    },
    'about.html': {
      title: 'Motor Engine — О компании',
      nav: 'about',
      html: `<div class="eyebrow">О компании</div>
<h1>Motor Engine</h1>
<p class="lead">Демонстрационный автосервис для тестирования Smart Website и Voice User Interface.</p>
<div class="grid">
  <div class="card"><strong>Точность</strong><p>Понятный процесс обслуживания.</p></div>
  <div class="card"><strong>Технологии</strong><p>Современная диагностика и цифровой сервис.</p></div>
  <div class="card"><strong>Клиент</strong><p>Информация находится быстро — в том числе голосом.</p></div>
</div>`
    },
    'contact.html': {
      title: 'Motor Engine — Контакты',
      nav: 'contact',
      html: `<div class="eyebrow">Контакты</div>
<h1>Свяжитесь с Alex Node</h1>
<p class="lead">Есть вопрос по Smart Website или другим услугам? Свяжитесь удобным способом.</p>
<div class="grid" id="contact-options">
  <div class="card" id="contact-phone"><strong>Телефон</strong><p><a href="tel:+358458525293">+358 45 852 5293</a></p></div>
  <div class="card" id="contact-email"><strong>Email</strong><p><a href="mailto:AN@alexnode.fi">AN@alexnode.fi</a></p></div>
  <div class="card" id="contact-whatsapp"><strong>WhatsApp</strong><p><a href="https://wa.me/358458525293" target="_blank" rel="noopener">Написать в WhatsApp</a></p></div>
</div>`
    },
    'catalog.html': {
      title: 'Motor Engine — Варианты',
      nav: null,
      html: `<div class="eyebrow">Варианты</div>
<h1>Доступные варианты</h1>
<p class="lead">Эту отдельную страницу сайт открывает по голосовой команде.</p>
<div class="grid">
  <div class="card"><strong>Engine Care</strong><p>Диагностика и обслуживание.</p></div>
  <div class="card"><strong>Season Check</strong><p>Сезонная проверка автомобиля.</p></div>
  <div class="card"><strong>Performance</strong><p>Дополнительные решения и настройки.</p></div>
</div>`
    }
  };

  function buildDetailHtml(key) {
    const d = SERVICE_DETAILS[key] || SERVICE_DETAILS.diagnostics;
    const cards = d.cards.map(c =>
      `<div class="card"><strong>${c.strong}</strong><p>${c.p}</p></div>`
    ).join('');
    return {
      title: d.title,
      nav: null,
      html: `<div class="eyebrow">Подробнее</div>
<h1>${d.heading}</h1>
<p class="lead">${d.lead}</p>
<div class="grid">${cards}</div>`
    };
  }

  // State
  let continuousVoice = false;
  let recognizer = null;
  let isSpeaking = false;
  let introDone = false;
  let introPlaying = false;
  let currentPage = null;
  let currentAudio = null;
  let currentDetailKey = null;

  // ---------- helpers ----------
  function hasAny(t, list) {
    return list.some(x => typeof x === 'string' ? t.includes(x) : x.test(t));
  }

  function markVoiceEnabled() {
    try {
      localStorage.setItem('motorVoiceSession', '1');
      sessionStorage.setItem('motorVoiceEnabled', '1');
    } catch (e) {}
  }

  function setStatus(text, color, title) {
    const s = document.querySelector('.status');
    if (!s) return;
    s.textContent = text;
    if (color) s.style.color = color;
    if (title) s.title = title;
  }

  // ---------- audio ----------
  function stopAudio() {
    if (currentAudio) {
      try {
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.pause();
        currentAudio.src = '';
      } catch (e) {}
      currentAudio = null;
    }
    isSpeaking = false;
  }

  function play(key) {
    const file = R[key] || key;
    if (!file) return Promise.resolve();
    if (R[key]) {
      try { sessionStorage.setItem('motorLastReply', key); } catch (e) {}
    }
    stopAudio();
    isSpeaking = true;
    if (recognizer) {
      try { recognizer.abort(); } catch (e) {}
    }
    const a = new Audio(A + file);
    a.volume = 1;
    currentAudio = a;
    return new Promise((resolve, reject) => {
      a.onended = () => {
        isSpeaking = false;
        currentAudio = null;
        if (continuousVoice) setTimeout(startListening, 280);
        resolve();
      };
      a.onerror = (e) => {
        isSpeaking = false;
        currentAudio = null;
        if (continuousVoice) setTimeout(startListening, 280);
        reject(e);
      };
      a.play().catch((e) => {
        isSpeaking = false;
        currentAudio = null;
        if (continuousVoice) setTimeout(startListening, 280);
        reject(e);
      });
    });
  }

  function repeatLastReply() {
    let k = null;
    try { k = sessionStorage.getItem('motorLastReply'); } catch (e) {}
    if (k) return play(k);
  }

  function playIntroOnce() {
    if (introDone || introPlaying) return;
    introPlaying = true;
    play('intro').then(() => {
      introDone = true;
      introPlaying = false;
      markVoiceEnabled();
    }).catch(() => { introPlaying = false; });
  }

  // ---------- highlight ----------
  function highlightTarget(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    document.querySelectorAll('.voice-target-highlight').forEach(x => x.classList.remove('voice-target-highlight'));
    el.classList.add('voice-target-highlight');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el.classList.remove('voice-target-highlight'), 5200);
  }

  // ---------- SPA navigation ----------
  function getPageKey(href) {
    if (!href) return 'index.html';
    const name = (href.split('/').pop() || '').split('?')[0].split('#')[0];
    if (!name || name === '' || name === '/' || name === '#') return 'index.html';
    return name;
  }

  function updateNav(activeKey) {
    document.querySelectorAll('.nav a').forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href') || '';
      const key = getPageKey(href);
      if (activeKey === 'index' && (key === 'index.html')) a.classList.add('active');
      else if (activeKey && key === activeKey + '.html') a.classList.add('active');
    });
  }

  function renderPage(pageKey, responseKey, targetId, push) {
    let page = PAGES[pageKey];
    if (pageKey === 'service-detail.html') {
      page = buildDetailHtml(currentDetailKey || 'diagnostics');
    }
    if (!page) return;

    const main = document.querySelector('main.content') || document.getElementById('spa-root');
    if (!main) {
      // absolute fallback
      try {
        if (responseKey) sessionStorage.setItem('motorVoiceReply', responseKey);
        if (targetId) sessionStorage.setItem('motorVoiceTarget', targetId);
        if (currentDetailKey) sessionStorage.setItem('motorDetailKey', currentDetailKey);
      } catch (e) {}
      window.location.assign(pageKey);
      return;
    }

    main.innerHTML = page.html;
    document.title = page.title;
    updateNav(page.nav);
    currentPage = pageKey;

    if (push !== false) {
      try {
        const state = { page: pageKey, detail: currentDetailKey };
        history.pushState(state, page.title, pageKey === 'service-detail.html' ? 'service-detail.html' : pageKey);
      } catch (e) {}
    }

    if (responseKey) {
      setTimeout(() => {
        play(responseKey).then(() => {
          if (targetId) setTimeout(() => highlightTarget(targetId), 60);
        }).catch(() => {
          if (targetId) setTimeout(() => highlightTarget(targetId), 60);
        });
      }, 50);
    } else if (targetId) {
      setTimeout(() => highlightTarget(targetId), 100);
    }
  }

  function go(dest, response, target) {
    // Never kill continuousVoice
    renderPage(dest, response || '', target || null, true);
  }

  function goDetail(serviceKey, responseKey) {
    currentDetailKey = serviceKey || 'diagnostics';
    try { sessionStorage.setItem('motorDetailKey', currentDetailKey); } catch (e) {}
    go('service-detail.html', responseKey || 'detail');
  }

  function callPhone() {
    window.location.href = 'tel:+358458525293';
  }
  function callWhatsApp() {
    window.location.href = 'https://wa.me/358458525293';
  }

  // ---------- PRICE DETECTION (highest priority) ----------
  // Number words RU
  const NUM_WORDS = {
    'сорок девять': 49, 'сорокдевять': 49,
    'девяносто девять': 99, 'девяностодевять': 99,
    'сто двадцать': 120, 'стодвадцать': 120,
    'сорок девять евро': 49, 'девяносто девять евро': 99, 'сто двадцать евро': 120
  };

  function detectPriceEuro(t) {
    // Must contain euro/евро/€ somehow
    const hasEuro = /евро|euro|€|eur\b/.test(t);
    if (!hasEuro) return null;

    // Digits first
    if (/\b49\b/.test(t) || /сорок\s*девять/.test(t)) return 'price-49';
    if (/\b99\b/.test(t) || /девяносто\s*девять/.test(t)) return 'price-99';
    if (/\b120\b/.test(t) || /сто\s*двадцать/.test(t) || /от\s*120/.test(t)) return 'price-120';

    // Word forms without spaces
    for (const [w, n] of Object.entries(NUM_WORDS)) {
      if (t.includes(w.replace(/\s+/g, ''))) {
        if (n === 49) return 'price-49';
        if (n === 99) return 'price-99';
        if (n === 120) return 'price-120';
      }
    }
    return null;
  }

  function handlePriceHighlight(priceId) {
    // If not on prices page — SPA navigate there first, then highlight
    if (currentPage !== 'prices.html') {
      go('prices.html', 'prices', priceId);
    } else {
      // already on prices — just highlight + optional short feedback
      highlightTarget(priceId);
      // keep listening (no forced audio if already there, but play prices reply is fine)
      play('prices').catch(() => {});
    }
  }

  // ---------- intents ----------
  const INTENTS = [
    {
      id: 'whatsappCall',
      p: [
        /(позвон|звон).*(ватсап|вацап|вотсап|whatsapp)/,
        /(ватсап|вацап|вотсап|whatsapp).*(позвон|звон)/,
        'позвонить по whatsapp', 'позвонить через whatsapp',
        'открыть whatsapp', 'связаться через whatsapp'
      ],
      run: () => callWhatsApp()
    },
    {
      id: 'phoneCall',
      p: [
        'позвони', 'позвонить', 'набери номер', 'набрать номер',
        'набери телефон', 'сделай звонок', 'хочу позвонить',
        'позвонить на телефон', 'позвонить по телефону'
      ],
      run: () => callPhone()
    },
    {
      id: 'email',
      p: ['электронная почта', 'email', 'e mail', 'имейл', 'емейл',
        'почта компании', 'куда написать письмо', 'адрес почты', 'покажи email'],
      run: () => go('contact.html', 'contact', 'contact-email')
    },
    {
      id: 'contact',
      p: [
        'контакты', 'покажи контакты', 'найди контакты',
        'с кем связаться', 'с кем можно связаться', 'как с вами связаться',
        'как связаться', 'хочу связаться', 'кому написать', 'куда написать',
        'кому позвонить', 'куда позвонить', 'у кого заказать', 'где заказать',
        'как заказать', 'хочу заказать', 'можно заказать',
        'заказать сайт', 'заказать услугу', 'заказать услуги',
        'мне нужен сайт', 'мне нужна услуга',
        'к кому обратиться', 'куда обратиться', 'с кем поговорить'
      ],
      run: () => go('contact.html', 'contact', 'contact-options')
    },
    {
      id: 'booking',
      p: ['запись', 'записаться', 'хочу записаться', 'можно записаться',
        'запиши меня', 'запись на', 'как записаться', 'запишите меня'],
      run: () => go('contact.html', 'booking')
    },
    {
      id: 'address',
      p: ['адрес', 'покажи адрес', 'где вы', 'где находитесь',
        'где вас найти', 'как доехать', 'маршрут', 'как к вам приехать'],
      run: () => go('contact.html', 'address')
    },
    {
      id: 'hours',
      p: ['часы работы', 'режим работы', 'когда вы работаете', 'когда открыты',
        'во сколько открываетесь', 'во сколько закрываетесь', 'до скольки работаете'],
      run: () => go('contact.html', 'hours')
    },
    {
      id: 'phone',
      p: ['телефон', 'номер', 'номер телефона', 'какой у вас номер',
        'покажи телефон', 'покажи номер', 'ваш телефон', 'как вам позвонить'],
      run: () => go('contact.html', 'phone', 'contact-phone')
    },
    {
      id: 'pricesQuestion',
      p: ['сколько стоит', 'во сколько обойдется', 'во сколько обойдётся',
        'какая стоимость', 'сколько это стоит', 'сколько будет стоить',
        'почем', 'почём', 'что по цене', 'сколько денег'],
      run: () => go('prices.html', 'priceQuestion')
    },
    {
      id: 'prices',
      p: ['цены', 'цена', 'прайс', 'тарифы',
        'покажи цены', 'посмотреть цены', 'какие цены',
        'открой цены', 'покажи прайс', 'сколько у вас цены'],
      run: () => go('prices.html', 'prices')
    },
    {
      id: 'services',
      p: ['услуги', 'услуга', 'посмотреть услуги', 'посмотри услуги',
        'какие услуги', 'какие есть услуги', 'покажи услуги',
        'показать услуги', 'открой услуги',
        'что вы делаете', 'чем занимаетесь', 'что можете сделать',
        'что предлагаете', 'что у вас есть', 'чем можете помочь',
        'что можно заказать', 'что можно сделать'],
      run: () => go('services.html', 'services')
    },
    // Specific service details (after price check)
    {
      id: 'diagnosticsDetail',
      p: [
        'диагностика', 'диагностировать', 'проверить машину',
        'проверить автомобиль', 'проверка машины', 'найти неисправность',
        'что сломалось', 'диагностика двигателя', 'компьютерная диагностика'
      ],
      run: () => goDetail('diagnostics', 'diagnostics')
    },
    {
      id: 'serviceDetail',
      p: [
        'service', 'сервис', 'техническое обслуживание',
        'техобслуживание', 'плановое обслуживание', 'обслуживание автомобиля',
        'масло и фильтры', 'замена фильтров'
      ],
      run: () => goDetail('service', 'detail')
    },
    {
      id: 'performanceDetail',
      p: [
        'performance', 'перформанс', 'производительность',
        'настройка производительности', 'тюнинг', 'динамика'
      ],
      run: () => goDetail('performance', 'detail')
    },
    {
      id: 'engine',
      p: [
        'ремонт двигателя', 'ремонт мотора', 'починить двигатель',
        'починить мотор', 'двигатель сломался', 'мотор сломался',
        /(ремонт|почин).*(двигател|мотор)/
      ],
      run: () => goDetail('diagnostics', 'engine')
    },
    {
      id: 'oil',
      p: ['масло', 'замена масла', 'поменять масло', 'сменить масло', 'заменить масло'],
      run: () => goDetail('service', 'oil')
    },
    {
      id: 'tires',
      p: ['шины', 'колеса', 'колёса', 'шиномонтаж',
        'поменять колеса', 'поменять колёса', 'заменить шины'],
      run: () => go('service-detail.html', 'tires') // keep generic for tires
    },
    {
      id: 'about',
      p: ['о компании', 'о вас', 'кто вы',
        'расскажи о вас', 'расскажите о вас',
        'расскажи о компании', 'расскажите о компании',
        'чем известны', 'кто такие motor engine'],
      run: () => go('about.html', 'about')
    },
    {
      id: 'catalog',
      p: ['каталог', 'варианты', 'покажи варианты', 'какие варианты',
        'что можно выбрать', 'покажи каталог', 'открой каталог',
        'что есть в каталоге', 'что выбрать'],
      run: () => go('catalog.html', 'catalog')
    },
    {
      id: 'detail',
      p: ['подробнее', 'подробности', 'расскажи подробнее',
        'покажи подробнее', 'подробнее об услуге',
        'что входит', 'что туда входит'],
      run: () => goDetail(currentDetailKey || 'diagnostics', 'detail')
    },
    {
      id: 'home',
      p: ['главная', 'на главную', 'главная страница',
        'вернись на главную', 'вернуться на главную',
        'в начало', 'домой', 'начальная страница'],
      run: () => go('index.html', 'home')
    }
  ];

  function handle(raw) {
    let t = raw.toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[?!.,]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const h = document.querySelector('.heard');
    if (h) h.textContent = 'Вы: «' + raw + '»';

    // Repeat
    if (hasAny(t, [
      /^что$/, /^чего$/, 'повтори', 'повторите',
      'скажи еще раз', 'еще раз', 'не услышал', 'не расслышал',
      'что ты сказал', 'что ты говоришь',
      'можешь повторить', 'можете повторить'
    ])) {
      return repeatLastReply();
    }

    // Soft presentation context
    if (hasAny(t, [
      'сейчас покажу сайт', 'смотри как это работает',
      'смотри как работает сайт', 'давай покажу сайт',
      'покажу презентацию', 'давай покажем презентацию'
    ])) {
      return;
    }

    // === PRIORITY 1: explicit price + euro → highlight only ===
    const priceId = detectPriceEuro(t);
    if (priceId) {
      handlePriceHighlight(priceId);
      return;
    }

    // === PRIORITY 2: normal intents ===
    const intent = INTENTS.find(x => hasAny(t, x.p));
    if (intent) return intent.run();

    // Unknown → silent ignore
  }

  // ---------- recognition ----------
  function startListening() {
    if (!recognizer || !continuousVoice || isSpeaking) return;
    try { recognizer.start(); } catch (e) {}
  }

  function compactVoiceUI() {
    const v = document.querySelector('.voice');
    if (!v) return;
    v.style.width = 'auto';
    v.style.maxWidth = 'none';
    v.style.padding = '8px 12px';
    v.style.left = 'auto';
    v.style.right = '12px';
    v.style.bottom = '12px';
    v.style.borderRadius = '999px';
    const hints = v.querySelector('.hints');
    if (hints) hints.style.display = 'none';
    const heard = v.querySelector('.heard');
    if (heard) heard.style.display = 'none';
    const s = v.querySelector('.status');
    if (s) {
      s.textContent = '●';
      s.style.color = '#35d06f';
      s.style.fontSize = '22px';
      s.title = 'Голосовая навигация активна';
    }
    const b = v.querySelector('.mic');
    if (b) b.style.display = 'none';
  }

  function showVoiceStart() {
    if (document.getElementById('voice-start')) return;
    const o = document.createElement('div');
    o.id = 'voice-start';
    o.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(5,7,12,.82);display:flex;align-items:center;justify-content:center;padding:24px';
    o.innerHTML = `
      <div style="background:linear-gradient(145deg,#171c25,#0d1016);border:1px solid #353d4b;border-radius:28px;padding:34px 28px;max-width:430px;text-align:center;box-shadow:0 28px 100px #000c">
        <div style="font-size:42px;margin-bottom:8px">🎙</div>
        <h2 style="margin:0 0 10px;font-size:26px">Используйте навигацию голосом</h2>
        <p style="margin:0 0 20px;color:#c7cbd1;line-height:1.5">Нажмите микрофон один раз, чтобы управлять сайтом голосом. После этого можно просто говорить команды.</p>
        <button id="voice-start-btn" style="border:0;border-radius:999px;padding:14px 22px;font-weight:700;cursor:pointer;background:linear-gradient(135deg,#ff6a00,#ff8a1f);color:#fff;width:100%">🎙 Включить микрофон</button>
      </div>`;
    document.body.appendChild(o);
    o.querySelector('#voice-start-btn').onclick = () => {
      const btn = o.querySelector('#voice-start-btn');
      if (btn.disabled) return;
      btn.disabled = true;
      continuousVoice = true;
      markVoiceEnabled();
      o.remove();
      compactVoiceUI();
      playIntroOnce();
    };
  }

  function installLinkInterceptor() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')) return;
      if (a.target === '_blank') return;
      const pageKey = getPageKey(href);
      if (!PAGES[pageKey] && pageKey !== 'service-detail.html') return;
      if (continuousVoice || currentPage !== null) {
        e.preventDefault();
        if (pageKey === 'service-detail.html') {
          currentDetailKey = currentDetailKey || 'diagnostics';
        }
        renderPage(pageKey, null, null, true);
      }
    }, true);
  }

  function initRecognizer() {
    if (!SR) {
      setStatus('Откройте сайт в Chrome для голосового управления', '#e5484d');
      const b = document.querySelector('.mic');
      if (b) b.disabled = true;
      return;
    }
    const r = new SR();
    recognizer = r;
    r.lang = 'ru-RU';
    r.interimResults = false;
    r.continuous = false;

    r.onstart = () => setStatus('●', '#35d06f', 'Голосовая навигация активна');
    r.onend = () => {
      if (continuousVoice && !isSpeaking) {
        setStatus('●', '#35d06f', 'Голосовая навигация активна');
        setTimeout(startListening, 280);
      }
    };
    r.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        continuousVoice = false;
        setStatus('●', '#e5484d', 'Голосовая навигация недоступна');
      } else if (e.error === 'no-speech') {
        if (continuousVoice && !isSpeaking) setTimeout(startListening, 200);
      } else {
        setStatus('●', '#e5484d', 'Ошибка распознавания — переподключение');
        setTimeout(() => {
          if (continuousVoice && !isSpeaking) {
            setStatus('●', '#35d06f', 'Голосовая навигация активна');
            startListening();
          }
        }, 700);
      }
    };
    r.onresult = (e) => {
      const heard = e.results[0][0].transcript;
      setStatus('Распознано: «' + heard + '»', '#35d06f');
      setTimeout(() => handle(heard), 60);
    };

    const mic = document.querySelector('.mic');
    if (mic) {
      mic.onclick = () => {
        continuousVoice = true;
        markVoiceEnabled();
        compactVoiceUI();
        startListening();
      };
    }
  }

  function boot() {
    currentPage = getPageKey(location.pathname);
    try {
      const dk = sessionStorage.getItem('motorDetailKey');
      if (dk) currentDetailKey = dk;
    } catch (e) {}

    // If we landed on service-detail.html, render correct content
    if (currentPage === 'service-detail.html') {
      const main = document.querySelector('main.content');
      if (main) {
        const page = buildDetailHtml(currentDetailKey || 'diagnostics');
        main.innerHTML = page.html;
        document.title = page.title;
      }
    }

    initRecognizer();
    installLinkInterceptor();

    window.addEventListener('popstate', (e) => {
      const pageKey = (e.state && e.state.page) || getPageKey(location.pathname);
      if (e.state && e.state.detail) currentDetailKey = e.state.detail;
      if (PAGES[pageKey] || pageKey === 'service-detail.html') {
        renderPage(pageKey, null, null, false);
      }
    });

    let sessionActive = false;
    try { sessionActive = localStorage.getItem('motorVoiceSession') === '1'; } catch (e) {}

    if (sessionActive) {
      continuousVoice = true;
      introDone = true;
      compactVoiceUI();
      setTimeout(startListening, 400);
    } else {
      showVoiceStart();
    }

    // Pending reply / highlight after any fallback navigation
    try {
      const target = sessionStorage.getItem('motorVoiceTarget');
      if (target) {
        sessionStorage.removeItem('motorVoiceTarget');
        setTimeout(() => highlightTarget(target), 280);
      }
      const reply = sessionStorage.getItem('motorVoiceReply');
      if (reply) {
        sessionStorage.removeItem('motorVoiceReply');
        setTimeout(() => play(reply).catch(() => {}), 180);
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
