ANITA v26.1 — SEMANTIC JSON LAYER

NEW FILES
- anita-semantic-intents-v1.json
- anita-semantic-parser.js

UPDATED
- anita-router.js

WHAT IT DOES
- Loads structured RU/EN/FI intent/synonym/context data from JSON.
- Normalizes conversational wording and slang.
- Detects devices + symptoms and maps them to existing ANITA routes.
- Leaves existing 400-case diagnostics and older intent bank intact as fallback.
- Short yes/no replies remain controlled by the existing context system first.
- JSON low-confidence results do NOT override the old ANITA router.
- AI fallback is only a future contract in JSON; no external AI API is connected in this build.

UPLOAD
Upload/replace all files from this package in the root of the nodzone-cloud/anita GitHub repository.

TILDA
Use the supplied v26.1 T123 file. It adds anita-semantic-parser.js BEFORE anita-router.js.

TEST PHRASES
RU: Комп что-то жутко тупит
RU: Ноут еле ползает
EN: My PC is painfully slow
FI: Läppäri lagaa todella pahasti
EN: wifi connected but nothing opens

IMPORTANT
This is a controlled semantic layer, not a generative AI. It improves interpretation while keeping ANITA Core in control.
