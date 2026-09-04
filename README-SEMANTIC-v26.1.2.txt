ANITA v26.1.2 — CONTEXT LOOP + VAGUE GLITCH FIX

Fixes:
- "computer glitches / глючит / temppuilee" opens a 7-choice symptom menu.
- The menu is rendered as buttons by anita-choices.js.
- 1..7, "вариант 1", "первый", option 1, etc. are consumed as replies to that menu.
- "I don't know / честно не понимаю" no longer destroys the current device context.
- A detailed new description can override the old vague question.
- Browser suddenly minimizing while File Explorer/folder opens is recognized as a concrete symptom.
- ANITA acknowledges that symptom and asks whether the browser stays minimized or closes.

Core 400-case diagnostics are preserved.
No external AI fallback is enabled in this build.
