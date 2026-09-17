# CHANGELOG — ANITA Engine Experiment

## v0.2 — Human-Tech iteration (after review)

### Fixed / improved from feedback
- **Multi-fact extraction** (`engine/extract.js`): one message can fill business + size + requirements + goal
- **BriefFlow** is less linear: absorb facts → acknowledge → ask only missing fields
- **Edit after "No"**: asks «Что именно изменить?» and applies targeted corrections
- **Requirements** stored as structured list (booking, price list, contact…) when detected
- **Human identity**: does not open with “as an AI”; answers honestly if asked how she works
- Conversational bridges («Поняла 😊…») instead of bare form prompts
- Clarification / unsure still keep `pendingQuestion`

### Created
| File | Purpose |
|------|---------|
| `engine/dialogue-state.js` | dialogueState + turnId |
| `engine/pending.js` | pendingQuestion schema + interpret |
| `engine/turn-guard.js` | stale async protection |
| `engine/extract.js` | multi-fact extraction |
| `engine/interpreter.js` | single decision point |
| `engine/brief-flow.js` | conversational brief |
| `engine/ai-bridge.js` | AI fallback |
| `engine/human.js` | personality + honest identity |
| `engine/ui-bind.js` | UI + buttons from schema |
| `bootstrap-exp.js` | bootstrap |

### Load order
```
bootstrap-exp.js
engine/dialogue-state.js
engine/pending.js
engine/turn-guard.js
engine/extract.js
engine/human.js
engine/ai-bridge.js
engine/brief-flow.js
engine/interpreter.js
engine/ui-bind.js
```

### Still experimental
- Not a drop-in replacement for live 0.4.3
- Test isolated (/antest)
- Deep IT dialogue and site navigate/highlight still thin
