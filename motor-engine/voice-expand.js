/* Motor Engine expand — male MP3 voice + keep home cards after SPA "Главная" click */
(function () {
  'use strict';

  const A = 'assets/audio/';

  const HOME_HTML = `
<div class="eyebrow">Smart Website · Voice User Interface</div>
<h1>ENGINEERING THAT MOVES YOU</h1>
<p class="lead">Motor Engine — демонстрационный сайт с голосовым управлением. Сайт не только переходит по разделам, но и <strong>отвечает голосом</strong>, понимает вопросы и помогает с записью.</p>
<div class="grid">
  <div class="card" id="card-diagnostics"><strong>Диагностика</strong><p>Компьютерная диагностика двигателя и электронных систем.</p></div>
  <div class="card" id="card-service"><strong>Сервис</strong><p>Плановое обслуживание и ремонт автомобиля.</p></div>
  <div class="card" id="card-performance"><strong>Performance</strong><p>Настройка и решения для производительности.</p></div>
</div>
<div class="img-grid">
  <a class="img-card" id="card-engines" href="engines.html">
    <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=700&q=80" alt="Двигатель">
    <div class="body"><strong>Двигатели</strong><p>Ремонт, диагностика и performance-настройка моторов. Скажите «покажи двигатели».</p></div>
  </a>
  <a class="img-card" id="card-repairs" href="repairs.html">
    <img src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=700&q=80" alt="Ремонт">
    <div class="body"><strong>Ремонт</strong><p>Механика, электрика, ходовая. Скажите «открой ремонт».</p></div>
  </a>
  <a class="img-card" id="card-wheels" href="wheels.html">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" alt="Колёса">
    <div class="body"><strong>Колёса и шины</strong><p>Диски, шины, балансировка, сход-развал. Скажите «колёса» или «шины».</p></div>
  </a>
  <a class="img-card" id="card-checkups" href="checkups.html">
    <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=700&q=80" alt="Осмотр">
    <div class="body"><strong>Осмотр / Check-up</strong><p>Полная проверка перед покупкой или сезоном. Скажите «осмотр» или «чек-ап».</p></div>
  </a>
</div>
<div class="talk-demo">
  <strong>Что умеет голос</strong>
  <p>• Навигация: «покажи услуги», «цены», «запись», «контакты»<br>
  • Ответ голосом: сайт проговаривает, куда идёт и что нашёл<br>
  • Вопросы: «сколько стоит диагностика?», «какой адрес?», «какой телефон?»<br>
  • Запись: дата, время, имя — диалог с подтверждением<br>
  • Новые разделы (карточки выше + голос): «двигатели», «ремонт», «колёса», «осмотр» — в верхнем меню их нет</p>
</div>`;

  // Patch SPA home template so clicking "Главная" does not wipe the cards
  function patchPages() {
    try {
      // voice-v15 keeps PAGES in closure; we re-inject into main when home is shown without cards
      const main = document.querySelector('main.content') || document.getElementById('spa-root');
      if (!main) return;
      if (!main.querySelector('.img-grid') && main.querySelector('h1')) {
        const h1 = main.querySelector('h1');
        if (h1 && /MOVES YOU|ENGINEERING/i.test(h1.textContent || '')) {
          main.innerHTML = HOME_HTML;
        }
      }
    } catch (e) {}
  }

  // Watch SPA replacing main content
  const mainEl = document.querySelector('main.content') || document.getElementById('spa-root');
  if (mainEl) {
    const obs = new MutationObserver(function () {
      // small delay so SPA finishes writing
      setTimeout(patchPages, 30);
    });
    obs.observe(mainEl, { childList: true, subtree: false });
  }

  // Also after nav clicks on Главная
  document.addEventListener('click', function (e) {
    const a = e.target && e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = (a.getAttribute('href') || '').split('?')[0];
    if (href === 'index.html' || href === './' || href === '/' || a.textContent.trim() === 'Главная') {
      setTimeout(patchPages, 50);
      setTimeout(patchPages, 200);
    }
  }, true);

  // Initial
  setTimeout(patchPages, 100);

  // ----- Male voice clips (no Google TTS) -----
  const EXTRA_ROUTES = [
    { keys: ['двигател', 'мотор', 'engine'], page: 'engines.html', audio: A + '12_remont_dvigatelya.mp3' },
    { keys: ['ремонт', 'починить', 'чиним', 'repair'], page: 'repairs.html', audio: A + '07_podrobnosti.mp3' },
    { keys: ['колес', 'колёс', 'шин', 'диск', 'сход', 'развал', 'wheel', 'tire'], page: 'wheels.html', audio: A + '14_shiny.mp3' },
    { keys: ['осмотр', 'чек-ап', 'чекап', 'checkup', 'check-up', 'проверк'], page: 'checkups.html', audio: A + '11_diagnostika.mp3' }
  ];

  const FAQ = [
    { keys: ['сколько длится', 'как долго', 'время осмотра'], audio: A + '15_chasy.mp3' },
    { keys: ['что входит в осмотр', 'что проверяете'], audio: A + '11_diagnostika.mp3' },
    { keys: ['расскажи про двигател', 'что с мотором'], audio: A + '12_remont_dvigatelya.mp3' },
    { keys: ['привет', 'здравствуй', 'добрый день', 'добрый вечер'], audio: A + '01_intro.mp3' },
    { keys: ['спасибо', 'благодар'], audio: A + '20_rad_pomoch.mp3' },
    { keys: ['кто сделал', 'кто автор', 'алекс', 'alex node'], audio: A + '05_o_nas.mp3' }
  ];

  let currentAudio = null;
  function stopAudio() {
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch (e) {}
      currentAudio = null;
    }
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }
  function playClip(src, onEnded) {
    stopAudio();
    const audio = new Audio(src);
    currentAudio = audio;
    audio.onended = function () { currentAudio = null; if (onEnded) onEnded(); };
    audio.onerror = function () { currentAudio = null; if (onEnded) onEnded(); };
    const p = audio.play();
    if (p && p.catch) p.catch(function () { if (onEnded) onEnded(); });
  }
  function updateHeard(text) {
    const el = document.querySelector('.voice .heard');
    if (el) el.textContent = text;
  }
  function updateStatus(text) {
    const el = document.querySelector('.voice .status');
    if (el) el.textContent = text;
  }
  function matchList(text, list) {
    const t = (text || '').toLowerCase();
    for (let i = 0; i < list.length; i++) {
      for (let k = 0; k < list[i].keys.length; k++) {
        if (t.indexOf(list[i].keys[k]) !== -1) return list[i];
      }
    }
    return null;
  }
  let lastHandled = '';
  function handleTranscript(raw) {
    const text = (raw || '').trim();
    if (!text || text === lastHandled) return false;
    lastHandled = text;
    updateHeard('Вы сказали: «' + text + '»');
    const faq = matchList(text, FAQ);
    if (faq) { updateStatus('Отвечаю…'); playClip(faq.audio); return true; }
    const route = matchList(text, EXTRA_ROUTES);
    if (route) {
      updateStatus('Перехожу…');
      playClip(route.audio);
      setTimeout(function () { location.href = route.page; }, 900);
      return true;
    }
    return false;
  }

  const heard = document.querySelector('.voice .heard');
  if (heard) {
    const obs = new MutationObserver(function () {
      const t = heard.textContent || '';
      const m = t.match(/«([^»]+)»/) || t.match(/"([^"]+)"/);
      if (m) handleTranscript(m[1]);
    });
    obs.observe(heard, { childList: true, characterData: true, subtree: true });
  }

  document.addEventListener('click', function once(e) {
    const t = e.target;
    if (t && (t.id === 'voice-start-btn' || (t.closest && t.closest('#voice-start-btn')))) {
      setTimeout(function () { playClip(A + '01_intro.mp3'); }, 350);
      document.removeEventListener('click', once, true);
    }
  }, true);

  window.MotorEngineExpand = { playClip: playClip, handleTranscript: handleTranscript, stopAudio: stopAudio, patchPages: patchPages };
})();
