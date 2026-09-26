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
  <div class="card" id="card-diagnostics"><strong>Диагностика</strong><p>Компьютерная диагностика двигателя и электронных систем.</p></div>
  <div class="card" id="card-service"><strong>Сервис</strong><p>Плановое обслуживание и ремонт автомобиля.</p></div>
  <div class="card" id="card-performance"><strong>Performance</strong><p>Настройка и решения для производительности.</p></div>
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
    'booking.html': {
      title: 'Motor Engine — Запись',
      nav: 'booking',
      html: `<div class="eyebrow">Запись</div>
<h1>Запишитесь онлайн</h1>
<p class="lead">Выберите день и время — голосом или вручную. Демо-календарь Motor Engine.</p>
<div class="booking-layout">
  <div class="cal-panel" id="booking-calendar">
    <div class="cal-header">
      <button type="button" class="cal-nav-btn" id="cal-prev" aria-label="Предыдущий месяц">‹</button>
      <h3 id="cal-title">—</h3>
      <button type="button" class="cal-nav-btn" id="cal-next" aria-label="Следующий месяц">›</button>
    </div>
    <div class="cal-grid" id="cal-dows"></div>
    <div class="cal-grid" id="cal-days"></div>
    <div class="legend"><span><i class="leg-free"></i> свободно</span><span><i class="leg-busy"></i> занято</span><span><i class="leg-sel"></i> выбрано</span></div>
    <div class="slots-title" id="slots-title">Сначала выберите день</div>
    <div class="slots" id="cal-slots"></div>
  </div>
  <div class="form-panel" id="booking-form-panel">
    <div style="font-weight:800;font-size:16px;margin-bottom:4px">Ваши данные</div>
    <label for="bk-name">Имя</label>
    <input id="bk-name" autocomplete="name" placeholder="Как к вам обращаться">
    <label for="bk-phone">Телефон</label>
    <input id="bk-phone" autocomplete="tel" placeholder="+358 …">
    <label for="bk-email">Email</label>
    <input id="bk-email" autocomplete="email" placeholder="name@email.com">
    <div class="booking-summary" id="bk-summary">Дата и время пока не выбраны</div>
    <div class="booking-actions">
      <button type="button" class="btn-primary" id="bk-confirm" disabled>Подтвердить запись</button>
      <button type="button" class="btn-ghost" id="bk-reset">Сбросить</button>
    </div>
    <div class="booking-success" id="bk-success">Запись принята. Мы свяжемся с вами для подтверждения.</div>
  </div>
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
    // When compact toggle is active, keep visual state on the dots only
    if (document.getElementById('voice-toggle')) {
      updateVoiceToggleUI();
      return;
    }
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
      else if (activeKey === 'booking' && key === 'booking.html') a.classList.add('active');
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

    // Init booking widgets if this page has them
    if (pageKey === 'booking.html') {
      setTimeout(() => { try { initBookingUI(); } catch(e) {} }, 30);
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

  // Soft presentation / demo phrasing — highlight only, no audio, no hard navigation
  function isSoftPresentation(t) {
    return hasAny(t, [
      'вот например', 'например',
      'а что на счет', 'а что насчет', 'что на счет', 'что насчет',
      'а что по', 'смотри', 'посмотри вот',
      'вот цена', 'вот эта', 'вот так',
      'допустим', 'к примеру', 'скажем',
      'обрати внимание', 'обратите внимание',
      'вот диагностика', 'вот сервис', 'вот performance',
      'а вот', 'ну вот'
    ]);
  }

  function detectHomeCard(t) {
    // Order matters: more specific first
    if (hasAny(t, ['performance', 'перформанс', 'производительность'])) return 'card-performance';
    if (hasAny(t, ['сервис', 'service', 'техническое обслуживание', 'техобслуживание'])) return 'card-service';
    if (hasAny(t, ['диагностика', 'диагностик'])) return 'card-diagnostics';
    return null;
  }

  function silentHighlight(targetId, preferPage) {
    // Navigate without audio if needed, then highlight
    if (preferPage && currentPage !== preferPage) {
      // render without response audio
      if (preferPage === 'service-detail.html') {
        // not used for soft mode
      }
      renderPage(preferPage, null, targetId, true);
    } else {
      highlightTarget(targetId);
    }
  }

  function handlePriceHighlight(priceId, silent) {
    if (silent) {
      silentHighlight(priceId, 'prices.html');
      return;
    }
    // Direct price mention still goes to prices; play reply only if not soft
    if (currentPage !== 'prices.html') {
      go('prices.html', 'prices', priceId);
    } else {
      highlightTarget(priceId);
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
      run: () => go('booking.html', 'booking')
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

    const soft = isSoftPresentation(t);

    // === PRIORITY 1: explicit price + euro ===
    const priceId = detectPriceEuro(t);
    if (priceId) {
      // Soft phrasing OR any price mention with demo words → silent highlight
      // Direct "49 евро" without soft words still highlights; audio only when not soft
      handlePriceHighlight(priceId, soft || true); // user wants price highlight without audio in presentation
      // Actually: always silent for pure price highlight to feel ambient; 
      // only play audio when user explicitly asks for prices page via intent
      return;
    }

    // === PRIORITY 1b: soft presentation of a home card ===
    if (soft) {
      const cardId = detectHomeCard(t);
      if (cardId) {
        silentHighlight(cardId, 'index.html');
        return;
      }
    }

    // === PRIORITY 1c: booking flow while on booking page or booking phrases ===
    const onBooking = currentPage === 'booking.html' || /запис|брон|запись|забронир/.test(t);

    // confirm
    if (onBooking && hasAny(t, ['подтвердить', 'подтверждаю', 'забронировать', 'записать меня', 'всё верно', 'все верно', 'готово'])) {
      if (currentPage !== 'booking.html') go('booking.html', 'booking');
      setTimeout(() => confirmBooking(), 100);
      return;
    }

    // date
    if (onBooking || /сегодня|завтра|послезавтра|понедельник|вторник|сред|четверг|пятниц|суббот|воскресень|числа/.test(t)) {
      const ds = parseVoiceDate(t);
      if (ds && (onBooking || /запис|брон|на\s|давай|хочу/.test(t) || currentPage === 'booking.html')) {
        if (currentPage !== 'booking.html' && !/запис|брон/.test(t) && currentPage !== 'booking.html') {
          // only auto-jump if clearly booking context
        }
        if (currentPage === 'booking.html' || /запис|брон|хочу записаться|запиши/.test(t)) {
          voiceSelectDate(ds);
          return;
        }
      }
    }

    if (currentPage === 'booking.html') {
      const ds = parseVoiceDate(t);
      if (ds) { voiceSelectDate(ds); return; }
      const tm = parseVoiceTime(t);
      if (tm) { voiceSelectSlot(tm); return; }
      const nm = parseVoiceName(t);
      if (nm) { voiceFillField('bk-name', nm); return; }
      const ph = parseVoicePhone(t);
      if (ph) { voiceFillField('bk-phone', ph); return; }
      const em = parseVoiceEmail(t);
      if (em) { voiceFillField('bk-email', em); return; }
    }

    // === PRIORITY 2: normal (direct) intents ===
    const intent = INTENTS.find(x => hasAny(t, x.p));
    if (intent) return intent.run();

    // Unknown → silent ignore
  }


  // ---------- Booking calendar + form ----------
  const MONTHS_RU = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  const DOW_RU = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const SLOT_ALL = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00'];

  let calYear, calMonth; // month 0-11
  let selectedDateStr = null; // YYYY-MM-DD
  let selectedSlot = null;
  let bookingDone = false;

  function pad2(n){ return String(n).padStart(2,'0'); }
  function toDateStr(y,m,d){ return y+'-'+pad2(m+1)+'-'+pad2(d); }
  function parseDateStr(s){
    const [y,m,d] = s.split('-').map(Number);
    return new Date(y, m-1, d);
  }
  function todayStr(){
    const t = new Date();
    return toDateStr(t.getFullYear(), t.getMonth(), t.getDate());
  }

  // Deterministic demo busy pattern
  function isDayBusy(dateStr){
    const d = parseDateStr(dateStr);
    const day = d.getDay(); // 0 Sun
    if (day === 0) return true; // Sunday closed
    // some mid-week days partially - day itself not fully busy
    return false;
  }
  function busySlotsFor(dateStr){
    if (isDayBusy(dateStr)) return SLOT_ALL.slice();
    const d = parseDateStr(dateStr);
    const day = d.getDate();
    const busy = [];
    // pseudo-random but stable
    SLOT_ALL.forEach((s,i) => {
      if ((day + i) % 3 === 0) busy.push(s);
    });
    // always leave at least 2 free if weekday
    if (busy.length > SLOT_ALL.length - 2) return busy.slice(0, SLOT_ALL.length - 2);
    return busy;
  }

  function updateBookingSummary(){
    const el = document.getElementById('bk-summary');
    const btn = document.getElementById('bk-confirm');
    if (!el) return;
    const name = (document.getElementById('bk-name')||{}).value || '';
    const phone = (document.getElementById('bk-phone')||{}).value || '';
    const email = (document.getElementById('bk-email')||{}).value || '';
    let dateLabel = '—';
    if (selectedDateStr) {
      const d = parseDateStr(selectedDateStr);
      dateLabel = d.getDate() + ' ' + MONTHS_RU[d.getMonth()].toLowerCase();
    }
    const timeLabel = selectedSlot || '—';
    el.innerHTML = '<strong>Дата:</strong> '+dateLabel+' &nbsp;·&nbsp; <strong>Время:</strong> '+timeLabel+
      '<br><strong>Имя:</strong> '+(name||'—')+' &nbsp;·&nbsp; <strong>Тел:</strong> '+(phone||'—')+' &nbsp;·&nbsp; <strong>Email:</strong> '+(email||'—');
    const ok = !!(selectedDateStr && selectedSlot && name.trim() && phone.trim() && email.trim() && !bookingDone);
    if (btn) btn.disabled = !ok;
  }

  function renderSlots(){
    const box = document.getElementById('cal-slots');
    const title = document.getElementById('slots-title');
    if (!box) return;
    box.innerHTML = '';
    if (!selectedDateStr) {
      if (title) title.textContent = 'Сначала выберите день';
      return;
    }
    if (isDayBusy(selectedDateStr)) {
      if (title) title.textContent = 'В этот день запись недоступна';
      return;
    }
    if (title) title.textContent = 'Свободное время';
    const busy = busySlotsFor(selectedDateStr);
    SLOT_ALL.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'slot';
      b.textContent = s;
      if (busy.includes(s)) {
        b.classList.add('slot-busy');
        b.disabled = true;
      } else {
        if (selectedSlot === s) b.classList.add('slot-selected');
        b.onclick = () => {
          selectedSlot = s;
          bookingDone = false;
          const suc = document.getElementById('bk-success');
          if (suc) suc.classList.remove('show');
          renderSlots();
          updateBookingSummary();
          highlightTarget('cal-slots');
        };
      }
      box.appendChild(b);
    });
  }

  function renderCalendar(){
    const daysBox = document.getElementById('cal-days');
    const dowsBox = document.getElementById('cal-dows');
    const title = document.getElementById('cal-title');
    if (!daysBox || !title) return;
    if (calYear == null) {
      const n = new Date();
      calYear = n.getFullYear();
      calMonth = n.getMonth();
    }
    title.textContent = MONTHS_RU[calMonth] + ' ' + calYear;
    if (dowsBox && !dowsBox.children.length) {
      DOW_RU.forEach(d => {
        const s = document.createElement('div');
        s.className = 'cal-dow';
        s.textContent = d;
        dowsBox.appendChild(s);
      });
    }
    daysBox.innerHTML = '';
    const first = new Date(calYear, calMonth, 1);
    let startDow = first.getDay(); // 0 Sun
    startDow = startDow === 0 ? 6 : startDow - 1; // Mon-based
    const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
    const today = todayStr();
    for (let i=0;i<startDow;i++) {
      const e = document.createElement('div');
      e.className = 'cal-day cal-empty';
      daysBox.appendChild(e);
    }
    for (let d=1; d<=daysInMonth; d++) {
      const ds = toDateStr(calYear, calMonth, d);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day';
      btn.textContent = d;
      if (ds === today) btn.classList.add('cal-today');
      if (ds < today) {
        btn.classList.add('cal-past');
        btn.disabled = true;
      } else if (isDayBusy(ds) || busySlotsFor(ds).length >= SLOT_ALL.length) {
        btn.classList.add('cal-busy');
        btn.disabled = true;
      } else {
        btn.classList.add('cal-free');
        if (selectedDateStr === ds) btn.classList.add('cal-selected');
        btn.onclick = () => {
          selectedDateStr = ds;
          selectedSlot = null;
          bookingDone = false;
          const suc = document.getElementById('bk-success');
          if (suc) suc.classList.remove('show');
          renderCalendar();
          renderSlots();
          updateBookingSummary();
        };
      }
      daysBox.appendChild(btn);
    }
  }

  function initBookingUI(){
    if (!document.getElementById('booking-calendar')) return;
    const prev = document.getElementById('cal-prev');
    const next = document.getElementById('cal-next');
    if (prev) prev.onclick = () => {
      calMonth--;
      if (calMonth < 0) { calMonth = 11; calYear--; }
      renderCalendar();
    };
    if (next) next.onclick = () => {
      calMonth++;
      if (calMonth > 11) { calMonth = 0; calYear++; }
      renderCalendar();
    };
    ['bk-name','bk-phone','bk-email'].forEach(id => {
      const inp = document.getElementById(id);
      if (inp) inp.addEventListener('input', updateBookingSummary);
    });
    const conf = document.getElementById('bk-confirm');
    if (conf) conf.onclick = confirmBooking;
    const reset = document.getElementById('bk-reset');
    if (reset) reset.onclick = () => {
      selectedDateStr = null;
      selectedSlot = null;
      bookingDone = false;
      ['bk-name','bk-phone','bk-email'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const suc = document.getElementById('bk-success');
      if (suc) suc.classList.remove('show');
      renderCalendar();
      renderSlots();
      updateBookingSummary();
    };
    renderCalendar();
    renderSlots();
    updateBookingSummary();
  }

  function confirmBooking(){
    const name = (document.getElementById('bk-name')||{}).value||'';
    const phone = (document.getElementById('bk-phone')||{}).value||'';
    const email = (document.getElementById('bk-email')||{}).value||'';
    if (!(selectedDateStr && selectedSlot && name.trim() && phone.trim() && email.trim())) return;
    bookingDone = true;
    try {
      const rec = { date: selectedDateStr, time: selectedSlot, name, phone, email, at: new Date().toISOString() };
      localStorage.setItem('motorLastBooking', JSON.stringify(rec));
    } catch(e) {}
    const suc = document.getElementById('bk-success');
    if (suc) {
      suc.textContent = 'Запись принята: '+selectedDateStr+' в '+selectedSlot+'. Мы свяжемся с вами для подтверждения.';
      suc.classList.add('show');
    }
    updateBookingSummary();
    highlightTarget('bk-success');
  }

  function voiceSelectDate(dateStr){
    if (!dateStr) return false;
    if (dateStr < todayStr()) return false;
    const d = parseDateStr(dateStr);
    calYear = d.getFullYear();
    calMonth = d.getMonth();
    selectedDateStr = dateStr;
    selectedSlot = null;
    bookingDone = false;
    if (currentPage !== 'booking.html') {
      renderPage('booking.html', null, null, true);
      setTimeout(() => { initBookingUI(); renderCalendar(); renderSlots(); updateBookingSummary(); highlightTarget('booking-calendar'); }, 80);
    } else {
      initBookingUI();
      renderCalendar();
      renderSlots();
      updateBookingSummary();
      highlightTarget('booking-calendar');
    }
    return true;
  }

  function voiceSelectSlot(slot){
    if (!selectedDateStr) return false;
    const busy = busySlotsFor(selectedDateStr);
    if (busy.includes(slot)) return false;
    selectedSlot = slot;
    if (currentPage !== 'booking.html') {
      renderPage('booking.html', null, null, true);
      setTimeout(() => { initBookingUI(); renderSlots(); updateBookingSummary(); highlightTarget('cal-slots'); }, 80);
    } else {
      renderSlots();
      updateBookingSummary();
      highlightTarget('cal-slots');
    }
    return true;
  }

  function voiceFillField(field, value){
    if (currentPage !== 'booking.html') {
      renderPage('booking.html', null, null, true);
      setTimeout(() => {
        initBookingUI();
        const el = document.getElementById(field);
        if (el) { el.value = value; el.classList.add('field-highlight'); setTimeout(()=>el.classList.remove('field-highlight'), 4000); }
        updateBookingSummary();
        highlightTarget(field);
      }, 80);
    } else {
      const el = document.getElementById(field);
      if (el) { el.value = value; el.classList.add('field-highlight'); setTimeout(()=>el.classList.remove('field-highlight'), 4000); }
      updateBookingSummary();
      highlightTarget(field);
    }
  }

  function parseVoiceDate(t){
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (/сегодня/.test(t)) return toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
    if (/послезавтра/.test(t)) {
      const d = new Date(today); d.setDate(d.getDate()+2);
      return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
    }
    if (/завтра/.test(t)) {
      const d = new Date(today); d.setDate(d.getDate()+1);
      return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
    }
    const dowMap = {
      'понедельник':1,'вторник':2,'среду':3,'среда':3,'четверг':4,
      'пятницу':5,'пятница':5,'субботу':6,'суббота':6,'воскресенье':0
    };
    for (const [w, target] of Object.entries(dowMap)) {
      if (t.includes(w)) {
        const d = new Date(today);
        const cur = d.getDay();
        let add = (target - cur + 7) % 7;
        if (add === 0) add = 7;
        d.setDate(d.getDate()+add);
        return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
      }
    }
    // "15 числа", "на 15", "15 го"
    let m = t.match(/\b([1-9]|[12][0-9]|3[01])\s*(го|числа)?\b/);
    if (m) {
      const day = Number(m[1]);
      let y = now.getFullYear(), mo = now.getMonth();
      let cand = toDateStr(y, mo, day);
      if (cand < todayStr()) {
        mo++;
        if (mo > 11) { mo = 0; y++; }
        cand = toDateStr(y, mo, day);
      }
      return cand;
    }
    return null;
  }

  function parseVoiceTime(t){
    // 10:00, 10 00, в 10, в десять, 14 часов
    let m = t.match(/\b([01]?\d|2[0-3])[:\.\s]?([0-5]\d)\b/);
    if (m) {
      const hh = pad2(Number(m[1]));
      const mm = m[2];
      const slot = hh+':'+mm;
      if (SLOT_ALL.includes(slot)) return slot;
      // snap to known slots on same hour
      const hit = SLOT_ALL.find(s => s.startsWith(hh));
      return hit || null;
    }
    m = t.match(/\b(?:в\s*)?([01]?\d|2[0-3])\s*(час|часа|часов)?\b/);
    if (m) {
      const hh = pad2(Number(m[1]));
      const hit = SLOT_ALL.find(s => s.startsWith(hh));
      return hit || null;
    }
    const wordHours = {
      'девять':'09:00','десять':'10:00','одиннадцать':'11:00','двенадцать':'12:00',
      'дванадцать':'12:00','четырнадцать':'14:00','пятнадцать':'15:00',
      'шестнадцать':'16:00','семнадцать':'17:00','два':'14:00','три':'15:00','четыре':'16:00'
    };
    for (const [w,s] of Object.entries(wordHours)) {
      if (t.includes(w)) return s;
    }
    if (/утром/.test(t)) return '10:00';
    if (/днем|днём/.test(t)) return '14:00';
    if (/вечером/.test(t)) return '17:00';
    return null;
  }

  function parseVoiceName(t){
    let m = t.match(/(?:меня зовут|мое имя|моё имя|имя\s*)\s+([a-zA-Zа-яА-ЯёЁ\-]{2,40})/i);
    if (m) return m[1].trim();
    return null;
  }
  function parseVoicePhone(t){
    // digits spoken or numeric
    const digits = t.replace(/[^\d+]/g,'');
    if (digits.replace(/\D/g,'').length >= 8) return digits;
    // "плюс три пять восемь ..." too hard — skip
    return null;
  }
  function parseVoiceEmail(t){
    // simple: name sobaka domain точка com
    let m = t.match(/([a-z0-9._%+\-]+)\s*(?:собака|@)\s*([a-z0-9.\-]+)\s*(?:точка|\.)\s*([a-z]{2,})/i);
    if (m) return (m[1]+'@'+m[2]+'.'+m[3]).toLowerCase().replace(/\s/g,'');
    m = t.match(/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/i);
    if (m) return m[0].toLowerCase();
    return null;
  }

  // ---------- recognition ----------
  function startListening() {
    if (!recognizer || !continuousVoice || isSpeaking) return;
    try { recognizer.start(); } catch (e) {}
  }

  function updateVoiceToggleUI() {
    const onBtn = document.getElementById('voice-on-dot');
    const offBtn = document.getElementById('voice-off-dot');
    if (!onBtn || !offBtn) return;
    if (continuousVoice) {
      onBtn.classList.add('voice-dot-active');
      offBtn.classList.remove('voice-dot-active');
      onBtn.title = 'Микрофон активен (слушает)';
      offBtn.title = 'Нажмите, чтобы выключить микрофон';
    } else {
      offBtn.classList.add('voice-dot-active');
      onBtn.classList.remove('voice-dot-active');
      onBtn.title = 'Нажмите, чтобы включить микрофон';
      offBtn.title = 'Микрофон выключен';
    }
  }

  function setVoiceActive(active) {
    continuousVoice = !!active;
    if (!continuousVoice) {
      isSpeaking = false;
      if (recognizer) {
        try { recognizer.abort(); } catch (e) {}
      }
      stopAudio();
    } else {
      markVoiceEnabled();
      setTimeout(startListening, 200);
    }
    updateVoiceToggleUI();
  }

  function compactVoiceUI() {
    const v = document.querySelector('.voice');
    if (!v) return;
    v.style.width = 'auto';
    v.style.maxWidth = 'none';
    v.style.padding = '10px 14px';
    v.style.left = 'auto';
    v.style.right = '12px';
    v.style.bottom = '12px';
    v.style.borderRadius = '999px';
    const hints = v.querySelector('.hints');
    if (hints) hints.style.display = 'none';
    const heard = v.querySelector('.heard');
    if (heard) heard.style.display = 'none';
    const b = v.querySelector('.mic');
    if (b) b.style.display = 'none';

    // Replace status with dual green/red toggle
    let row = v.querySelector('.voice-row');
    if (!row) return;
    let statusBox = row.querySelector('div');
    if (!statusBox) {
      statusBox = document.createElement('div');
      row.appendChild(statusBox);
    }
    statusBox.innerHTML = `
      <div class="voice-toggle" id="voice-toggle">
        <button type="button" id="voice-off-dot" class="voice-dot voice-dot-off" aria-label="Выключить микрофон" title="Выключить микрофон">●</button>
        <button type="button" id="voice-on-dot" class="voice-dot voice-dot-on" aria-label="Включить микрофон" title="Включить микрофон">●</button>
      </div>`;
    const offBtn = document.getElementById('voice-off-dot');
    const onBtn = document.getElementById('voice-on-dot');
    if (offBtn) offBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); setVoiceActive(false); };
    if (onBtn) onBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); setVoiceActive(true); };
    updateVoiceToggleUI();
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
      o.remove();
      compactVoiceUI();
      setVoiceActive(true);
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
        compactVoiceUI();
        setVoiceActive(true);
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
    if (currentPage === 'booking.html') {
      const main = document.querySelector('main.content');
      if (main && PAGES['booking.html']) {
        main.innerHTML = PAGES['booking.html'].html;
        document.title = PAGES['booking.html'].title;
        setTimeout(() => { try { initBookingUI(); } catch(e) {} }, 40);
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
      introDone = true;
      compactVoiceUI();
      setVoiceActive(true);
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
