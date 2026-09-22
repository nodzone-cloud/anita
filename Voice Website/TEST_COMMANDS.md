# Голосовые команды для проверки

Маршрутизация не зависит от языка интерфейса. Например, оставь сайт на финском и произнеси русскую команду — после корректной транскрипции она всё равно будет обработана.

## Русский
- «Покажи цены»
- «Сколько стоит сайт?»
- «Как вы работаете?»
- «Покажи контакты»
- «Расскажи про ANITA»
- «Что такое Human Tech?»
- «Покажи доступность»
- «Переключи на финский»
- «Переключи на английский»

## English
- “Show prices”
- “How do you work?”
- “Show contacts”
- “Tell me about ANITA”
- “What is Human Tech?”
- “Show accessibility”
- “Switch to Russian”
- “Switch to Finnish”

## Suomi
- “Näytä hinnat”
- “Miten työskentelette?”
- “Näytä yhteystiedot”
- “Kerro ANITAsta”
- “Mitä Human Tech on?”
- “Näytä saavutettavuus”
- “Vaihda venäjäksi”
- “Vaihda englanniksi”

## Важно

- Если `transcribeEndpoint` заполнен, выбери **AUTO · RU / EN / FI** — тогда распознавание действительно не привязано к языку сайта.
- Если endpoint пустой, используется встроенный Web Speech API браузера. Он работает бесплатно, но обычно распознаёт один выбранный язык за одну сессию.


## Smart scroll

### Русский
- «чуть ниже»
- «опусти вниз»
- «к следующему заголовку»
- «следующий раздел»
- «чуть выше»
- «к предыдущему заголовку»
- «в самый верх»
- «в самый низ»

### English
- “scroll down”
- “a little lower”
- “next heading”
- “next section”
- “scroll up”
- “previous heading”
- “go to top”
- “go to bottom”

### Suomi
- “vieritä alas”
- “vähän alemmas”
- “seuraava otsikko”
- “seuraava osio”
- “vieritä ylös”
- “edellinen otsikko”
- “sivun alkuun”
- “sivun loppuun”

## Contextual price questions

If the current page is a specific product page, a phrase such as «сколько стоит?» / “how much is it?” / “paljonko maksaa?” goes to that product’s pricing.

On a general page where `pageProduct: ""`, the same ambiguous question opens the centered chooser:

- ANITA
- Websites / Веб-сайты / Verkkosivut
- Voice Package / Voice пакет

The user can tap an option or simply say the product name. «Закрой» / “cancel” / “sulje” closes the chooser.
