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
