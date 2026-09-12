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
