# MIGRATION — connecting the experiment to live ANITA

## Principle

Do **not** replace live 0.4.3 in one shot.  
Load the experiment engine **alongside** or on a **test page**, compare behaviour, then migrate step by step.

## Recommended load order (test page)

```html
<!-- existing config if any -->
<script src=".../config-v017a.js"></script>

<!-- experiment bootstrap -->
<script src="bootstrap-exp.js"></script>

<!-- engine (order matters) -->
<script src="engine/dialogue-state.js"></script>
<script src="engine/pending.js"></script>
<script src="engine/turn-guard.js"></script>
<script src="engine/human.js"></script>
<script src="engine/ai-bridge.js"></script>
<script src="engine/brief-flow.js"></script>
<script src="engine/interpreter.js"></script>
<script src="engine/ui-bind.js"></script>
```

For a pure experiment page you only need the engine files + a minimal DOM:

```html
<div id="an50-bubble"></div>
<input id="an50-input" />
<button id="an50-send">Send</button>
```

## Coexistence with live stack

| Approach | How |
|----------|-----|
| **A. Isolated test page** | Only experiment scripts. Safest. |
| **B. Parallel on live site** | Load experiment after live; `ui-bind` attaches with capture so it can take priority. Risk of double handlers — use only on staging. |
| **C. Adapter later** | Map `DialogueState` ↔ old `W.state.context()` so old tour/UI keep working while Interpreter owns meaning. |

## What to keep temporarily

- Live UI (`ui.js`, poses, images)
- Live tour
- Live AI endpoint
- Live website-map / navigate actions

## What can be retired later (after parity)

- Competing classification in `roles-v017a` + `router-v038` + parts of `core-v034`
- Duplicate brief modules once BriefFlow covers the same path
- Ad-hoc size interceptors once `pending.interpret` covers them

## Feature flags (suggested)

```js
window.ANITA_USE_ENGINE_EXP = true; // gate in bootstrap
```

Only when true, wire input to `Interpreter.handle`.

## Email brief

Set in config:

```js
ownerEmail: "AN@alexnode.fi",
// preferred:
briefEmailEndpoint: "https://anita-api.alexnode.fi/brief"
```

Backend must accept POST and send mail. Experiment falls back to engine flag or mailto.
