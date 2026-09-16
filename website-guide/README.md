# ANITA Website Guide — prepared capability

Status: **INACTIVE / NOT CONNECTED TO ALEXNODE.FI**

This folder preserves ANITA's ability to guide a visitor through a website so the capability is ready when the main ANITA client-conversation work is mature enough to enable it.

## Design

ANITA remains a virtual character first. The guide is one small, permissioned set of "hands".

The engine:
- is disabled by default;
- never modifies or navigates a page merely by being loaded;
- exposes a small API: enable, disable, loadTour, next, previous, goTo, stop;
- emits `anita:guide-step` events for the future UI/integration layer;
- keeps the visitor in control: the host UI can attach Next/Previous arrows to `next()` and `previous()`;
- stores routes/messages separately in JSON so the guide can be changed without rewriting the engine;
- supports RU / EN / FI messages.

## Future activation

When Alex Node is ready, the website integration layer should:
1. Add stable `data-anita-guide` markers to sections ANITA may point to.
2. Load `anita-website-guide.js` and the JSON configuration.
3. Explicitly call `ANITAGuide.enable()`.
4. Connect ANITA's visible arrows/buttons to next/previous.
5. React to `anita:guide-step` by highlighting/scrolling/showing the requested section.
6. Keep navigation/actions allow-listed. Do not let free-form model output become arbitrary selectors, URLs, or JavaScript.

No Tilda block or alexnode.fi production code is changed by these files.
