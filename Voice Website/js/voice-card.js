(function (d) {
  'use strict';
  const text = {
    en:[
      'A smart website that understands what you’re looking for. Tell it where you want to go, and it takes you there without clicking or scrolling.',
      'Explore the project →'
    ],
    ru:[
      'Умный сайт, который понимает, что вы ищете. Скажите, куда хотите попасть, — и он покажет нужное место без кликов и прокрутки вручную.',
      'Посмотреть проект →'
    ],
    fi:[
      'Älykäs verkkosivusto, joka ymmärtää, mitä etsit. Kerro, mihin haluat siirtyä, niin sivusto näyttää oikean kohdan ilman klikkauksia tai vierittämistä.',
      'Tutustu projektiin →'
    ]
  };

  function detectLanguage() {
    const explicit = d.getElementById('an-voice-card')?.dataset.lang;
    if (explicit && text[explicit]) return explicit;
    const htmlLang = (d.documentElement.lang || '').toLowerCase();
    if (htmlLang.startsWith('ru')) return 'ru';
    if (htmlLang.startsWith('fi')) return 'fi';
    const path = location.pathname.toLowerCase();
    if (/\/(ru|rus)(\/|$)/.test(path)) return 'ru';
    if (/\/(fi|fin)(\/|$)/.test(path)) return 'fi';
    return 'en';
  }

  function render() {
    const card = d.getElementById('an-voice-card');
    if (!card) return;
    const key = detectLanguage();
    const body = card.querySelector('.an-voice-card__text');
    const action = card.querySelector('.an-voice-card__action');
    if (body) body.textContent = text[key][0];
    if (action) action.textContent = text[key][1];
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', render, { once:true });
  else render();

  const observer = new MutationObserver(function (mutations) {
    if (mutations.some(function (m) { return m.type === 'attributes' && m.attributeName === 'lang'; })) render();
  });
  observer.observe(d.documentElement, { attributes:true });
})(document);
