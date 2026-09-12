/* Alex Node Book — Purchase Info Add-on
   Standalone module. Does not modify app.js or desktop book logic.
*/
(function () {
  "use strict";

  function lang() {
    const root = document.getElementById("anbook");
    if (root && root.classList.contains("lang-en")) return "en";
    if (root && root.classList.contains("lang-fi")) return "fi";
    return "ru";
  }

  const copy = {
    ru: {
      title: "Хотите приобрести эту книгу?",
      text: "Книга доступна на русском и английском языках. Выберите нужную версию и перейдите к покупке.",
      button: "Купить книгу"
    },
    en: {
      title: "Want to purchase this book?",
      text: "The book is currently available in Russian and English. Choose your preferred language and continue to purchase.",
      button: "Buy the book"
    },
    fi: {
      title: "Haluatko ostaa tämän kirjan?",
      text: "Kirja on tällä hetkellä saatavilla venäjäksi ja englanniksi. Valitse haluamasi kieliversio ja siirry ostamaan.",
      button: "Osta kirja"
    }
  };

  function updateText(box) {
    const t = copy[lang()] || copy.en;
    box.querySelector("[data-purchase-title]").textContent = t.title;
    box.querySelector("[data-purchase-text]").textContent = t.text;
    box.querySelector("[data-purchase-button]").textContent = t.button;
  }

  function mount() {
    if (document.getElementById("an-book-purchase-addon")) return;

    const root = document.getElementById("anbook");
    if (!root) return setTimeout(mount, 100);

    const box = document.createElement("section");
    box.id = "an-book-purchase-addon";
    box.className = "an-book-purchase-addon";
    box.innerHTML = `
      <div class="an-book-purchase-card">
        <h2 data-purchase-title></h2>
        <p data-purchase-text></p>
        <a class="an-book-purchase-button" data-purchase-button href="#buy"></a>
      </div>
    `;

    root.appendChild(box);
    updateText(box);

    box.querySelector(".an-book-purchase-button").addEventListener("click", function (e) {
      e.preventDefault();
      const existingBuy =
        document.getElementById("buyButton") ||
        document.getElementById("buyLinkTop");
      if (existingBuy) existingBuy.click();
      else location.hash = "buy";
    });

    const observer = new MutationObserver(function () {
      updateText(box);
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();