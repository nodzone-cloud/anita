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
