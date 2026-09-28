/* Motor Engine expand — same male voice as original (assets/audio/*.mp3), NO Google TTS */
(function () {
  'use strict';

  const A = 'assets/audio/';

  // Map new sections + FAQs to existing male-voice clips from the repo
  const EXTRA_ROUTES = [
    {
      keys: ['двигател', 'мотор', 'engine'],
      page: 'engines.html',
      audio: A + '12_remont_dvigatelya.mp3'  // ремонт двигателя — closest male clip
    },
    {
      keys: ['ремонт', 'починить', 'чиним', 'repair'],
      page: 'repairs.html',
      audio: A + '07_podrobnosti.mp3'
    },
    {
      keys: ['колес', 'колёс', 'шин', 'диск', 'сход', 'развал', 'wheel', 'tire'],
      page: 'wheels.html',
      audio: A + '14_shiny.mp3'  // шины
    },
    {
      keys: ['осмотр', 'чек-ап', 'чекап', 'checkup', 'check-up', 'проверк'],
      page: 'checkups.html',
      audio: A + '11_diagnostika.mp3'  // диагностика / осмотр
    }
  ];

  const FAQ = [
    {
      keys: ['сколько длится', 'как долго', 'время осмотра'],
      audio: A + '15_chasy.mp3'  // часы работы — closest for time-related
    },
    {
      keys: ['что входит в осмотр', 'что проверяете'],
      audio: A + '11_diagnostika.mp3'
    },
    {
      keys: ['расскажи про двигател', 'что с мотором'],
      audio: A + '12_remont_dvigatelya.mp3'
    },
    {
      keys: ['привет', 'здравствуй', 'добрый день', 'добрый вечер'],
      audio: A + '01_intro.mp3'
    },
    {
      keys: ['спасибо', 'благодар'],
      audio: A + '20_rad_pomoch.mp3'
    },
    {
      keys: ['кто сделал', 'кто автор', 'алекс', 'alex node'],
      audio: A + '05_o_nas.mp3'
    }
  ];

  let currentAudio = null;

  function stopAudio() {
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch (e) {}
      currentAudio = null;
    }
    // Also stop any TTS the expand layer might have started earlier
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }

  function playClip(src, onEnded) {
    stopAudio();
    const audio = new Audio(src);
    currentAudio = audio;
    audio.onended = function () {
      currentAudio = null;
      if (onEnded) onEnded();
    };
    audio.onerror = function () {
      currentAudio = null;
      if (onEnded) onEnded();
    };
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
      const item = list[i];
      for (let k = 0; k < item.keys.length; k++) {
        if (t.indexOf(item.keys[k]) !== -1) return item;
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
    if (faq) {
      updateStatus('Отвечаю…');
      playClip(faq.audio);
      return true;
    }

    const route = matchList(text, EXTRA_ROUTES);
    if (route) {
      updateStatus('Перехожу…');
      playClip(route.audio, function () {
        location.href = route.page;
      });
      // Also navigate after short delay if audio is slow
      setTimeout(function () {
        if (location.pathname.indexOf(route.page) === -1) {
          // only if still on same page
        }
      }, 2500);
      // Navigate while audio plays (like original does)
      setTimeout(function () { location.href = route.page; }, 900);
      return true;
    }
    return false;
  }

  // Watch .heard text written by original voice-v15.js
  const heard = document.querySelector('.voice .heard');
  if (heard) {
    const obs = new MutationObserver(function () {
      const t = heard.textContent || '';
      const m = t.match(/«([^»]+)»/) || t.match(/"([^"]+)"/);
      if (m) handleTranscript(m[1]);
    });
    obs.observe(heard, { childList: true, characterData: true, subtree: true });
  }

  // On enable-mic overlay: play intro with same male voice
  document.addEventListener('click', function once(e) {
    const t = e.target;
    if (t && (t.id === 'voice-start-btn' || (t.closest && t.closest('#voice-start-btn')))) {
      setTimeout(function () { playClip(A + '01_intro.mp3'); }, 350);
      document.removeEventListener('click', once, true);
    }
  }, true);

  window.MotorEngineExpand = {
    playClip: playClip,
    handleTranscript: handleTranscript,
    stopAudio: stopAudio
  };
})();
