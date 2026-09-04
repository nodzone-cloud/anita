ANITA v26.1.1 — SEMANTIC CHOICE CONTINUITY HOTFIX

Base: v26.1.0 Semantic JSON Layer.

FIXED
- Numbered clarification lists with 2–7 items now render as choice buttons in RU / EN / FI.
- "Что ближе?" / "Which is closest?" / "Mikä sopii parhaiten?" menus are detected.
- Buttons submit the option number so the existing menu-memory workflow can continue the correct branch.
- Typed replies such as "1", "1 вариант", "вариант 1", "первый" (and EN/FI equivalents) are interpreted as selection of the current menu, not as a new unrelated request.
- The generic Windows weird/glitch menu is now remembered in Russian, English and Finnish.
- Existing semantic JSON, 400 diagnostics and legacy routing remain intact.

TEST
1. Trigger a vague Windows/glitch clarification menu.
2. Confirm 7 buttons appear.
3. Click option 1 OR type: 1 / 1 вариант / вариант 1 / первый.
4. ANITA must continue with screen/graphics diagnosis instead of generic fallback.
