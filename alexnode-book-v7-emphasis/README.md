# Alex Node & ANITA — GitHub-ready book files

Upload the CONTENTS of this folder directly into:

`nodzone-cloud/anita/alexnode-book-v7-emphasis/`

Final structure:

```text
alexnode-book-v7-emphasis/
├── assets/
│   └── an-book-bg-signature.png
├── app.js
├── book-ru.txt
├── index.html
├── styles.css
└── README.md
```

## Important fixes in this package

- Background filename has no spaces: `an-book-bg-signature.png`.
- The handwritten slogan is part of the PNG itself.
- The old HTML/CSS slogan is removed, so there can be no duplicate/selectable slogan.
- Close-book `X` has a proper pointer cursor and a stronger click layer.
- Existing reader/chapter/pagination logic from your supplied files is preserved.
- Old `an-book-background-clean.jpg` is intentionally NOT included to prevent the wrong background from being loaded.

After upload, remove obsolete files such as `placeholder.txt` if you want; they are not required.


## Back cover zoom
- The front cover still opens the book.
- The center Open Book button still opens the book.
- Clicking the back cover now enlarges it in the center of the screen.
- Clicking the enlarged back cover again restores it to normal size.
- The zoomed back cover has a dark backdrop and works on desktop and mobile.


## Return to book list
- A round back arrow appears to the left after a book is selected.
- Clicking it returns to the original floating-book/list view.
- Back-cover zoom is reset automatically.
- The arrow disappears while the reader is open.
- Works on desktop and mobile.


## v4 — AN Book Hub

Navigation now works as an in-page book hub:

- **Главная / Home** returns to the book list view.
- **Alex Node logo** still opens `https://alexnode.fi/`.
- **О книге / About** selects the current book preview.
- **Галерея / Gallery** opens a separate empty gallery view on the same background.
- **Отзывы / Reviews** includes book selection, 1–5 stars, name/comment and review list.
- **Купить / Buy** shows the book list; selecting a book opens the familiar front/back preview.
- In Buy mode the center CTA is the purchase button.
- Each book supports Share from list/reviews/reader using native device sharing or clipboard fallback.
- Add a SumUp link per book in `CONFIG.BOOKS[].buyUrl`.

### Important about reviews
When `CONFIG.REVIEWS_API` is empty, reviews are saved only in that browser's `localStorage` for testing.
To make reviews public/shared for all visitors, set `CONFIG.REVIEWS_API` to a server/Cloudflare Worker endpoint supporting:
- `GET ?book=<book-id>`
- `POST` JSON review data

The interface is already prepared; only the backend endpoint is still needed for public reviews.


## v5 — Russian + English editions and corrected Buy mode

- The main book list now contains two separate editions side by side:
  - Alex Node & ANITA — RU
  - Alex Node & ANITA — EN
- RU / EN on the book cards are static labels, not buttons.
- `book-ru.txt` is the Russian edition.
- `book-en.txt` is the English edition.
- Selecting a language edition loads that edition's text independently from the website UI language.
- The top RU / EN / FI controls continue to translate the website interface only.
- Buy mode no longer opens the full reader from the front cover.
- In Buy mode the user gets the familiar front/back preview, can zoom the back cover, share the edition, and use the center Buy button.
- Add a separate SumUp link to each edition under `CONFIG.BOOKS[].buyUrl`.
- The current cover artwork is reused for both editions for now. It can later be replaced with separate English cover images by changing the EN edition's `front` and `back` URLs.


## v6 correction
- Main `/boook` page shows both RU and EN editions at the same time.
- RU and EN are labels, not buttons.
- Clicking an edition on the main list opens that edition normally and allows reading it.
- Buy section also shows every language edition.
- Each Buy card has Preview, Buy and Share.
- Buy Preview shows front/back only and never opens the full reader.
- The center CTA in Buy Preview remains Buy.
- Each edition can have its own SumUp URL in CONFIG.BOOKS[].buyUrl.

## v8 English background
- Added `assets/eng_bg.png` for the English interface.
- Selecting **EN** switches the site background to the English image automatically.
- RU/FI keep the existing `assets/an-book-bg-signature.png` background.


## v13 — Stable fix (based strictly on v12)

This version DOES NOT replace the v12 architecture.
It keeps:
- app.js / styles.css / index.html
- RU + EN separate book editions
- RU / EN / FI website interface controls
- book-ru.txt and book-en.txt
- gallery / reviews / buy hub
- back-cover zoom
- return-to-book-list behavior
- v7 emphasis formatting
- all v12 backgrounds

Fixes:
1. Mobile duplicate/overlapping books:
   - v11 had `display:flex !important` on #bookDock.
   - JavaScript `style.display="none"` could not override it.
   - v13 uses `#bookDock.is-hidden { display:none !important; }`.

2. Pagination/text clipping:
   - tester now uses the actual page dimensions.
   - no forced minimum tester size on small phones.
   - long words/URLs wrap safely.

3. Desktop input:
   - page arrows remain normal buttons.
   - horizontal mouse/trackpad page drift is blocked.
   - Left/Right keyboard arrows work only while the reader is open.

4. Mobile input:
   - swipe page turn is mobile-only.
   - vertical scrolling is not treated as a page turn.
   - swipes starting on controls are ignored.

5. GitHub assets:
   - RU and EN front/back covers are now included in /assets.
   - app.js and index.html use local GitHub assets rather than external Tilda cover URLs.

Important:
- FI remains an INTERFACE language only.
- There is no Finnish book edition in CONFIG.BOOKS and no book-fi.txt is required for the two existing RU/EN editions.
