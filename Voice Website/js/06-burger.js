(function (w, d) {
  'use strict';
  function onReady(fn) {
    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', fn, { once:true });
    else fn();
  }
  onReady(function () {
    const openBtn = d.getElementById('anBurgerOpen');
    const closeBtn = d.getElementById('anBurgerClose');
    const menu = d.getElementById('anBurgerMenu');
    if (!openBtn || !closeBtn || !menu) return;

    function setBurger(open) {
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', String(!open));
    }

    openBtn.addEventListener('click', function () { setBurger(true); });
    closeBtn.addEventListener('click', function () { setBurger(false); });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setBurger(false); });
    });
    d.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setBurger(false);
    });

    d.querySelectorAll('.an-ht-rail a').forEach(function (link) {
      link.addEventListener('click', function () {
        d.querySelectorAll('.an-ht-rail a').forEach(function (a) { a.classList.remove('active'); });
        link.classList.add('active');
      });
    });
  });
})(window, document);
