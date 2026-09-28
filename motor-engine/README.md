# Motor Engine (expanded)

Expanded demo based on [alexnode.fi/mote](https://alexnode.fi/mote) — same dark/orange design language and core voice UI, plus:

- New pages: **Двигатели**, **Ремонт**, **Колёса**, **Осмотр** (with photos)
- Footer: *This Motor Engine website design is made by: **Alex Node*** → https://alexnode.fi
- Extra voice understanding + **talk-back** (`speechSynthesis` in Russian)
- Keeps original multi-page voice navigation and booking from `voice-v15.js`

## Voice examples

| Say (RU) | What happens |
|----------|----------------|
| покажи двигатели / мотор | Opens engines + speaks reply |
| ремонт / починить | Opens repairs + speaks |
| колёса / шины / сход-развал | Opens wheels + speaks |
| осмотр / чек-ап | Opens check-ups + speaks |
| сколько длится осмотр | Talks back with duration |
| привет | Greeting + capabilities |
| кто сделал сайт / alex node | Credits Alex Node |
| покажи услуги / цены / запись | Original navigation (voice-v15) |

## Files

```
index.html, services.html, prices.html, about.html, booking.html, contact.html
engines.html, repairs.html, wheels.html, checkups.html
styles-v15.css
voice-v15.js          # original engine
voice-expand.js       # new routes + talk-back
README.md
```

## Run

Open `index.html` in Chrome/Edge (microphone permission required), or:

```bash
python -m http.server 8000
```

Design credit: [Alex Node](https://alexnode.fi)
