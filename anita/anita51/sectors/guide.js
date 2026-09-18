(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};
const FACTS={prices:{en:"Website packages: START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE from 700 €.",ru:"Пакеты сайтов: START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE от 700 €.",fi:"Verkkosivupaketit: START 250 €, LIGHT 450 €, MEDIUM 620 €, CODE alkaen 700 €."}};
A.Guide={answer(text,lang){if(/price|pricing|цена|цены|стоимость|hinnat/i.test(text))return FACTS.prices[lang]||FACTS.prices.en;return null},FACTS};
})(window);