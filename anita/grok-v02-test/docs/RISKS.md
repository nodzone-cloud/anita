# RISKS — Engine Experiment

## High

1. **Double handlers on live site**  
   If experiment `ui-bind` is loaded together with live core without a feature flag, both may handle the same click/Enter → duplicate bubbles or races.  
   **Mitigation:** test page only, or gate with `ANITA_USE_ENGINE_EXP`.

2. **State split**  
   Live `W.state` (localStorage `an50_context`) and experiment `DialogueState` (`an50_context_engine_v1`) are separate.  
   Tour / old brief UI won’t see experiment brief unless an adapter is written.  
   **Mitigation:** adapter layer before production merge.

3. **Email send not guaranteed**  
   Without `briefEmailEndpoint` backend, send may only open mailto or fail silently.  
   **Mitigation:** implement server endpoint; show clear failure text (already partially there).

## Medium

4. **Size heuristic edges**  
   `4` → few pages is intentional for choice_or_count, but a user meaning “option 4” on a 3-option list could confuse.  
   **Mitigation:** prefer ordinal words / «вариант N»; keep clarification path.

5. **AI fallback quality**  
   Depends on live API and prompts; experiment only softens “I am AI” phrases.  
   **Mitigation:** strengthen server system prompt with Human rules.

6. **Incomplete IT / Guide depth**  
   Experiment prioritises brief + pending architecture; deep IT diagnostics and full site tour actions are not fully ported.  
   **Mitigation:** keep live modules for those paths until parity.

7. **Typo / fuzzy coverage**  
   Only light fuzzy for size (`Ннсколько`). Many real typos still need AI or more deterministic patterns later — without turning Interpreter into a regex dump.

## Low

8. **localStorage quota / private mode**  
   State save may fail; engine continues in-memory for the session.

9. **FI language**  
   Supported in prompts; detection is lighter than RU. May fall back to EN detection edge cases.

10. **Mobile button layout**  
   CSS is compact but not tested on all Tilda layouts; may need z-index tweaks so buttons don’t cover ANITA avatar.

## Verification before any production merge

- [ ] All TESTS.md size/clarification cases pass  
- [ ] Double-message stale test passes  
- [ ] No double bubble with live stack disabled  
- [ ] Brief email path verified on staging  
- [ ] Language stays consistent for RU and EN sessions  
- [ ] IT question does not trap user inside brief  
