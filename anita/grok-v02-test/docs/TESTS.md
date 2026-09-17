# TESTS — manual checklist (Engine Experiment)

Reset state between scenarios if needed:
```js
ANITA50.engine.DialogueState._resetAll()
```

## 1. Entry & greeting

1. Open page (home).
2. Expect: ANITA greets in browser language (or EN).
3. Type: `Привет` / `Hi` / `Hei`.
4. Expect: warm reply + question about goal (if not asked yet).

## 2. Goal → website path

1. After greeting, type: `Я хочу сайт` / `I need a website`.
2. Expect: Business consultant tone, asks about business.
3. Type business description.
4. Expect: asks what visitors should do.
5. Type a goal.
6. Expect: asks site size (with optional buttons).

## 3. Size interpretations (critical)

With size question active:

| Input | Expected |
|-------|----------|
| `Несколько` | a few separate pages |
| `Пару страниц` | a few separate pages |
| `4` | a few separate pages (count bucket) |
| `второй вариант` | option 2 |
| `А в чём разница?` | explanation, **same question stays active** |
| `Не знаю` | help to choose, **pending kept** |
| `Ннсколько страниц` | fuzzy → a few separate pages |
| button click | same as choosing that option |

## 4. Clarification must not clear pending

1. At size question, type: `А в чём разница?`
2. Read explanation.
3. Type: `Несколько`
4. Expect: accepted as size, flow continues (requirements or summary).

## 5. Brief summary & confirm

1. Finish requirements (or `ничего особенного`).
2. Expect: summary with confirmed fields + «Всё правильно?»
3. Buttons Yes / No appear.
4. Click **Yes** → thank-you / sent message.
5. Or type `Нет` → asks what to change.

## 6. Language consistency

1. Start in RU, stay in RU for all prompts in that session.
2. Start in EN → EN prompts.
3. No mixed «I am ready… О чём хотите поговорить?» in one bubble.

## 7. Rapid double messages

1. Send message A.
2. Immediately send message B (before any AI returns).
3. Expect: final visible answer matches **B** (or B’s flow), not a late reply for A.
4. (turnId must drop stale async)

## 8. Stale AI (if AI enabled)

1. Trigger AI path with a slow network (throttle).
2. Send a second message quickly.
3. When first AI returns late, it must **not** replace the newer bubble.

## 9. Free text without buttons

1. At size, type full sentence: `Нам нужен небольшой сайт из трёх страниц`.
2. Expect: mapped to few pages (or free-text stored if not matched — then still advances).

## 10. IT routing

1. Type: `Не работает принтер` / `Wi-Fi keeps dropping`.
2. Expect: role shifts toward IT; not forced into website brief.

## 11. Guide / prices

1. Type: `Где цены?` / `How much is a website?`
2. Expect: package info without destroying an active brief pending (if any — ideally brief pending still wins until cleared).

## 12. Button + free text equivalence

1. Use button «Несколько страниц».
2. Reset, same step, type the same meaning in words.
3. Both should advance the same way.
