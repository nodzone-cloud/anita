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

      AN.renderPriceModal();
    };

    AN.showSection = function (id) {
      const target = d.getElementById(id);
      if (!target) return false;

      target.scrollIntoView({ behavior:'smooth', block:'start' });
      target.classList.add('highlight');
      w.setTimeout(function () { target.classList.remove('highlight'); }, 2200);

      d.querySelectorAll('.an-ht-rail a').forEach(function (a) { a.classList.remove('active'); });
      const active = d.querySelector('.an-ht-rail a[href="#' + id.replace(/"/g, '') + '"]');
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

    function absoluteTop(el) {
      return el.getBoundingClientRect().top + w.scrollY;
    }

    function sortedVisible(selector) {
      return Array.from(d.querySelectorAll(selector))
        .filter(function (el) {
          const style = w.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.height > 0;
        })
        .sort(function (a, b) { return absoluteTop(a) - absoluteTop(b); });
    }

    function scrollToDirectionalTarget(items, direction) {
      if (!items.length) return false;
      const now = w.scrollY + 125;
      let target = null;

      if (direction > 0) {
        target = items.find(function (el) { return absoluteTop(el) > now + 60; }) || items[items.length - 1];
      } else {
        for (let i = items.length - 1; i >= 0; i--) {
          if (absoluteTop(items[i]) < now - 80) { target = items[i]; break; }
        }
        target = target || items[0];
      }

      target.scrollIntoView({ behavior:'smooth', block:'start' });
      target.classList.add('highlight');
      w.setTimeout(function () { target.classList.remove('highlight'); }, 1400);
      return true;
    }

    AN.performScroll = function (action) {
      const smallStep = Math.max(240, Math.round(w.innerHeight * 0.42));

      switch (action) {
        case 'smallDown':
          w.scrollBy({ top:smallStep, behavior:'smooth' });
          return true;
        case 'smallUp':
          w.scrollBy({ top:-smallStep, behavior:'smooth' });
          return true;
        case 'top':
          w.scrollTo({ top:0, behavior:'smooth' });
          return true;
        case 'bottom':
          w.scrollTo({ top:d.documentElement.scrollHeight, behavior:'smooth' });
          return true;
        case 'nextHeading':
          return scrollToDirectionalTarget(sortedVisible('main h1, main h2, main h3'), 1);
        case 'prevHeading':
          return scrollToDirectionalTarget(sortedVisible('main h1, main h2, main h3'), -1);
        case 'nextSection':
          return scrollToDirectionalTarget(sortedVisible('main section[id]'), 1);
        case 'prevSection':
          return scrollToDirectionalTarget(sortedVisible('main section[id]'), -1);
        default:
          return false;
      }
    };

    function ensurePriceModal() {
      let modal = d.getElementById('anPriceModal');
      if (modal) return modal;

      const style = d.createElement('style');
      style.id = 'anPriceModalStyle';
      style.textContent = [
        '.an-price-modal{position:fixed;inset:0;z-index:2000;display:none;align-items:center;justify-content:center;padding:20px;background:#0e0c13b8;backdrop-filter:blur(9px)}',
        '.an-price-modal.open{display:flex}',
        '.an-price-dialog{position:relative;width:min(560px,100%);padding:30px;border:1px solid #765e83;border-radius:26px;background:linear-gradient(145deg,#2a2232,#17151e);box-shadow:0 30px 90px #000b;color:#faf8ff}',
        '.an-price-close{position:absolute;top:14px;right:14px;width:39px;height:39px;border:1px solid #725f7c;border-radius:11px;background:#392f43;color:#fff;font-size:20px}',
        '.an-price-kicker{margin:0 45px 9px 0;color:#e5a7fa;font:800 11px/1.3 Arial,sans-serif;letter-spacing:.18em}',
        '.an-price-dialog h3{margin:0 45px 10px 0;font:800 clamp(25px,4vw,34px)/1.15 Arial,sans-serif;letter-spacing:-.04em}',
        '.an-price-sub{margin:0 0 20px;color:#c6becd;font:14px/1.5 Arial,sans-serif}',
        '.an-price-options{display:grid;grid-template-columns:1fr;gap:10px}',
        '.an-price-option{width:100%;padding:15px 17px;text-align:left;border:1px solid #6d5978;border-radius:14px;background:#30283a;color:#fff;font:750 15px Arial,sans-serif}',
        '.an-price-option:hover{border-color:#e5a7fa;background:#43344e}',
        '.an-price-hint{margin:16px 0 0;color:#aFA5b5;font:12px/1.45 Arial,sans-serif}'
      ].join('');
      d.head.appendChild(style);

      modal = d.createElement('div');
      modal.className = 'an-price-modal';
      modal.id = 'anPriceModal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML =
        '<div class="an-price-dialog" role="dialog" aria-modal="true" aria-labelledby="anPriceTitle">' +
          '<button class="an-price-close" id="anPriceClose" type="button" aria-label="Close">×</button>' +
          '<div class="an-price-kicker">ALEX NODE · VOICE</div>' +
          '<h3 id="anPriceTitle"></h3>' +
          '<p class="an-price-sub" id="anPriceSub"></p>' +
          '<div class="an-price-options">' +
            '<button class="an-price-option" type="button" data-product="anita"></button>' +
            '<button class="an-price-option" type="button" data-product="websites"></button>' +
            '<button class="an-price-option" type="button" data-product="voice"></button>' +
          '</div>' +
          '<p class="an-price-hint" id="anPriceHint"></p>' +
        '</div>';

      d.body.appendChild(modal);

      modal.querySelector('#anPriceClose').addEventListener('click', AN.hidePriceModal);
      modal.addEventListener('click', function (event) {
        if (event.target === modal) AN.hidePriceModal();
      });
      modal.querySelectorAll('[data-product]').forEach(function (button) {
        button.addEventListener('click', function () {
          AN.openProduct(button.dataset.product, true);
        });
      });

      return modal;
    }

    AN.renderPriceModal = function () {
      const modal = ensurePriceModal();
      const x = AN.t();
      modal.querySelector('#anPriceTitle').textContent = x.priceQuestion || 'Which product price are you interested in?';
      modal.querySelector('#anPriceSub').textContent = x.priceSub || '';
      modal.querySelector('#anPriceHint').textContent = x.priceHint || '';
      modal.querySelector('[data-product="anita"]').textContent = x.priceAnita || 'ANITA';
      modal.querySelector('[data-product="websites"]').textContent = x.priceWebsites || 'Websites';
      modal.querySelector('[data-product="voice"]').textContent = x.priceVoice || 'Voice Package';
    };

    AN.showPriceModal = function () {
      const modal = ensurePriceModal();
      AN.renderPriceModal();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      const first = modal.querySelector('[data-product]');
      if (first) first.focus({ preventScroll:true });
      return true;
    };

    AN.hidePriceModal = function () {
      const modal = d.getElementById('anPriceModal');
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    };

    AN.isPriceModalOpen = function () {
      const modal = d.getElementById('anPriceModal');
      return !!(modal && modal.classList.contains('open'));
    };

    function productConfig(product) {
      const defaults = {
        anita:{ url:'https://alexnode.fi/anita2' },
        websites:{ url:'https://alexnode.fi' },
        voice:{ url:'https://alexnode.fi/smartwebsite#pricing' }
      };
      const configured = (w.AN_VOICE_CONFIG && w.AN_VOICE_CONFIG.products) || {};
      return Object.assign({}, defaults[product] || {}, configured[product] || {});
    }

    AN.openProduct = function (product, fromModal) {
      const cfg = productConfig(product);
      if (!cfg || !cfg.url) return false;
      if (fromModal) AN.hidePriceModal();

      let target;
      try { target = new URL(cfg.url, w.location.href); }
      catch (_) { return false; }

      const samePage = target.origin === w.location.origin &&
        target.pathname.replace(/\/$/, '') === w.location.pathname.replace(/\/$/, '');

      if (samePage && target.hash) {
        const id = decodeURIComponent(target.hash.slice(1));
        if (AN.showSection(id)) return true;
      }

      if (samePage && product === (w.AN_VOICE_CONFIG || {}).pageProduct) {
        if (AN.showSection('pricing')) return true;
      }

      w.location.assign(target.href);
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

    d.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && AN.isPriceModalOpen()) AN.hidePriceModal();
    });

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
