(function (w, d) {
  'use strict';
  const AN = w.ANVoiceSite = w.ANVoiceSite || {};

  function onReady(fn) {
    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', fn, { once:true });
    else fn();
  }

  onReady(function initSiteUI() {
    const siteLanguage = d.getElementById('siteLanguage');
    const message = d.getElementById('voiceMessage');
    const voiceState = d.getElementById('voiceState');
    const startButton = d.getElementById('voiceStart');
    const widget = d.getElementById('voiceWidget');

    if (!siteLanguage) {
      console.warn('[Alex Node Voice] #siteLanguage was not found.');
      return;
    }

    try {
      const saved = localStorage.getItem('alexNodeVoiceSiteLanguage');
      if (saved && AN.translations && AN.translations[saved]) siteLanguage.value = saved;
    } catch (_) {}

    AN.siteLanguage = siteLanguage;
    AN.voiceMessage = message;
    AN.voiceState = voiceState;
    AN.voiceStartButton = startButton;
    AN.voiceWidget = widget;
    AN.listening = false;

    AN.t = function () {
      return (AN.translations && AN.translations[siteLanguage.value]) || AN.translations.en;
    };

    AN.renderHumanTech = function () {
      const lang = siteLanguage.value || 'en';
      const map = (AN.humanTechTranslations && AN.humanTechTranslations[lang]) || AN.humanTechTranslations.en;
      d.querySelectorAll('[data-ht]').forEach(function (el) {
        el.textContent = map[el.dataset.ht] || '';
      });
    };

    AN.render = function (options) {
      const opts = options || {};
      const text = AN.t();
      AN.renderHumanTech();
      d.documentElement.lang = siteLanguage.value;

      d.querySelectorAll('[data-i]').forEach(function (el) {
        el.textContent = text[el.dataset.i] || '';
      });

      const title = d.getElementById('voiceTitle');
      if (title) title.textContent = text.voiceTitle;
      if (voiceState) voiceState.textContent = AN.listening ? text.voiceOn : text.voiceOff;
      if (startButton) startButton.textContent = AN.listening ? text.voiceStop : text.voiceStart;

      const voiceLanguageLabel = d.getElementById('voiceLanguageLabel');
      const voiceProcess = d.getElementById('voiceProcess');
      const voicePrices = d.getElementById('voicePrices');
      const voiceContacts = d.getElementById('voiceContacts');
      const voiceHint = d.getElementById('voiceHint');

      if (voiceLanguageLabel) voiceLanguageLabel.textContent = text.voiceLanguage;
      if (voiceProcess) voiceProcess.textContent = text.voiceProcess;
      if (voicePrices) voicePrices.textContent = text.voicePrices;
      if (voiceContacts) voiceContacts.textContent = text.voiceContacts;
      if (voiceHint) voiceHint.textContent = text.voiceHint;

      if (widget) widget.classList.toggle('listening', !!AN.listening);

      if (message && (!message.textContent || opts.resetMessage)) message.textContent = text.voiceReady;

      const titles = {
        en:'Alex Node Voice — a website that understands you',
        ru:'Alex Node Voice — сайт, который вас понимает',
        fi:'Alex Node Voice — verkkosivusto, joka ymmärtää sinua'
      };
      d.title = titles[siteLanguage.value] || titles.en;
    };

    AN.showSection = function (id) {
      const target = d.getElementById(id);
      if (!target) return false;

      target.scrollIntoView({ behavior:'smooth', block:'start' });
      target.classList.add('highlight');
      w.setTimeout(function () { target.classList.remove('highlight'); }, 2200);

      d.querySelectorAll('.an-ht-rail a').forEach(function (a) { a.classList.remove('active'); });
      const active = d.querySelector('.an-ht-rail a[href="#' + CSS.escape(id) + '"]');
      if (active) active.classList.add('active');
      return true;
    };

    AN.setSiteLanguage = function (lang) {
      if (!AN.translations[lang]) return false;
      siteLanguage.value = lang;
      try { localStorage.setItem('alexNodeVoiceSiteLanguage', lang); } catch (_) {}
      AN.render({ resetMessage:false });
      return true;
    };

    siteLanguage.addEventListener('change', function () {
      try { localStorage.setItem('alexNodeVoiceSiteLanguage', siteLanguage.value); } catch (_) {}
      AN.render({ resetMessage:true });
    });

    d.querySelectorAll('[data-destination]').forEach(function (button) {
      button.addEventListener('click', function () {
        AN.showSection(button.dataset.destination);
        if (message) message.textContent = AN.t().voiceFound;
      });
    });

    // Optional car photo. Paste a public URL here later, or set window.AN_VOICE_CONFIG.carImageUrl.
    const config = w.AN_VOICE_CONFIG || {};
    const carUrl = config.carImageUrl || '';
    if (carUrl) {
      const image = d.getElementById('carImage');
      const figure = d.getElementById('carFigure');
      if (image && figure) {
        image.src = carUrl;
        figure.hidden = false;
      }
    }

    AN.render({ resetMessage:true });
  });
})(window, document);
