# ANITA Engine Experiment — Architecture

## Goal

Human-Tech: the user speaks naturally → ANITA interprets relative to **active context** → updates state → replies → continues without losing the thread.

LLM is only one component, not the whole system.

## Execution flow

```
User input
   ↓
TurnGuard.beginTurn()          → new turnId
   ↓
Interpreter.handle(text)       → SINGLE decision point
   ├─ if pendingQuestion → Pending.interpret()
   │     ├─ clarification → keep pending, explain
   │     ├─ unsure        → help choose, keep pending
   │     ├─ answer        → BriefFlow.applyAnswer() → next question / summary
   │     └─ unknown       → soft re-prompt
   ├─ greeting / smalltalk → social reply (+ ask goal if needed)
   ├─ role detect          → guide | it_assistant | business_consultant
   ├─ website intent       → BriefFlow.start()
   └─ AI fallback          → engine.AI.ask() (turn-guarded)
   ↓
UIBind.showReplies()           → bubble + buttons from schema
```

No parallel independent decisions by router / roles / core / semantic.

## dialogueState

```js
{
  turnId: number,
  language: "ru" | "en" | "fi" | null,
  topic: string | null,
  role: "guide" | "it_assistant" | "business_consultant" | "general",
  pendingQuestion: PendingQuestion | null,
  websiteBrief: {
    confirmed: { business, goal, size, requirements[] },
    inferred:  { suggestions[], recommendedPackage, recommendedStructure },
    rejected:  { suggestions[] },
    meta: { needsAlexReview, createdAt, updatedAt }
  },
  conversationState: "idle" | "greeting" | "asking_goal" | "brief" | "confirming" | "done",
  lastUser, lastAssistant,
  clientMemory: { name, business },
  flags: { greeted, askedGoal, briefStarted }
}
```

Single source of truth. All modules read/write only through `DialogueState`.

## pendingQuestion schema

```js
{
  id: "website_size",
  field: "websiteBrief.confirmed.size",
  type: "choice" | "choice_or_count" | "free_text" | "confirm_yes_no",
  prompt: { en, ru, fi },
  options?: [{ value, labels: { en, ru, fi } }],
  allowFreeText: true,
  clarification?: { en, ru, fi }
}
```

Short answers are interpreted **relative to** this object:

| User says | Active question | Result |
|-----------|-----------------|--------|
| `4` | size (choice_or_count) | a few separate pages (count→bucket) |
| `второй вариант` | size with 3 options | option 2 |
| `А в чём разница?` | any with clarification | explanation, pending kept |
| `Не знаю` | any | help text, pending kept |
| `Ннсколько страниц` | size | fuzzy → a few separate pages |

## Interpreter

One entry: `engine.Interpreter.handle(text)`.

Order:
1. Context (pendingQuestion)
2. Deterministic interpretation
3. Clarification / unsure handling
4. State transition (BriefFlow)
5. Social / role routing
6. AI fallback (optional, turn-guarded)

## BriefFlow

State machine steps: business → site_goal → size → requirements → confirm_brief.

- Only **confirmed** fields are written from user answers.
- Package suggestion goes to **inferred**, never auto-promoted to confirmed.
- Summary shown → yes → send email attempt; no → back to edit.

## turnId

- Every user message → `nextTurn()`.
- Async (AI, fetch, timers) must carry `turnId` and check `TurnGuard.isActive(turnId)` before UI/state writes.
- Stale callbacks return `TurnGuard.STALE` and do nothing.

## Roles

Detected from context/text, never chosen by user:

- **guide** — site orientation, prices, tour-like help  
- **it_assistant** — Windows, Wi-Fi, printers, diagnostics  
- **business_consultant** — website brief conversation  

Human layer sits on top of all roles.

## UI / Actions

- Buttons auto-built from `pendingQuestion.options`.
- Text always works as alternative to buttons.
- Architecture leaves room for navigate / scroll / highlight / show pose (Action layer later).

## Modules

```
engine/
  dialogue-state.js
  pending.js
  turn-guard.js
  interpreter.js
  brief-flow.js
  ai-bridge.js
  human.js
  ui-bind.js
bootstrap-exp.js
```
