# AN Book Page v1.5 — Handwritten Tagline Fix

This version contains the fixes requested after testing v1.1.

## Files
an-book-page-v1.2/
- index.html
- styles.css
- app.js
- README.md
- assets/an-book-background-clean.jpg

## Changes in v1.2
- clean warm background with baked arrows/header/bottom controls removed;
- live side arrows appear ONLY while the book reader is open;
- handwritten slogan moved down so it is fully visible;
- Alex Node logo/header made smaller and closer to the approved reference;
- whole AN | ALEX NODE logo links to https://alexnode.fi/;
- Home links to https://alexnode.fi/boook;
- page counter is hidden before the reader opens;
- Chapter 1 intro image is:
  https://optim.tildacdn.net/tild3665-6335-4532-b633-636638366462/-/format/webp/picture1.jpg.webp
- all chapter headings are rendered as:
  Chapter number / Глава N
  large chapter title
  story text;
- story text is measured against the REAL page dimensions and paginated;
- long paragraphs are split across pages by words when needed;
- text cannot intentionally continue below the visible page;
- desktop uses two pages + arrows;
- mobile uses one page + finger swipe;
- fullscreen still has a visible Exit Full Screen button;
- RU / EN / FI interface remains enabled.

## GitHub
Upload this folder at repository root, next to:
- anita/
- alexnode-book-v7-emphasis/

Do NOT put it inside anita/anita50/.

## Purchase URL
In app.js:
BUY_URL: "#"
Replace # with the final purchase URL later.


## Typography & chapter fixes in v1.3

- Fixed story-text "staircase" effect:
  consecutive source TXT lines are joined into normal flowing book paragraphs.
- Removed the heuristic that turned short story lines into fake giant headings.
- Every chapter now starts on a fresh page so it never visually merges with the previous chapter.
- `Другая дорога` is normalized to `Глава 11. Другая дорога`.
- Existing `Глава 11. Сумбур` is therefore shown as `Глава 12. Сумбур`.
- These deliberate emphasis lines are bold + italic at NORMAL body-text size:
  - И именно тогда у идеи появилось имя:
  - Ты можешь просто сказать:
  - А система не отвечает:
  - Выберите тип услуги:
  - [Landing page] [Website] [E-commerce] [Other]
  - Она отвечает:
- Text enclosed in `«...»` is bold + italic at normal body-text size.
- Ordinary story lines such as `И мне не хотелось строить Alex Node вокруг идеи:` remain ordinary body text.
- Pagination still measures real page height and splits long paragraphs between pages.


## v1.4 chapter-flow fix

The v1.3 screenshots revealed one remaining pagination problem:
if the first paragraph after a chapter heading did not fit in full, the whole
paragraph moved to the next page, leaving an almost-empty chapter page.

v1.4 fixes that behavior:
- chapter heading always starts on a fresh page;
- the first paragraph is split by words when necessary;
- as much story text as fits is placed directly under the chapter heading;
- only the remainder continues on the next page;
- this specifically fixes the empty-looking pages for Chapters 1, 8, 9, 10
  and the same pattern in other chapters.


## v1.5 handwritten tagline fix

- Replaced the ordinary serif italic tagline with a true handwriting font:
  `Marck Script`.
- Restored the exact Russian text:
  `Больше, чем бизнес —`
  `это путь.`
- Adjusted size, spacing, rotation and position to match the approved reference.
- No reader, chapter, pagination or interaction logic was changed.
