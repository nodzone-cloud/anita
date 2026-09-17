/* ANITA Grok v0.2 Test Loader
   Isolated experimental loader for /antest.
   Loads only the Grok experimental engine files in the required order.
*/
(function () {
  "use strict";

  if (window.__ANITA_GROK_V02_LOADER__) return;
  window.__ANITA_GROK_V02_LOADER__ = true;
  window.ANITA_USE_ENGINE_EXP = true;

  var BASE = "https://cdn.jsdelivr.net/gh/nodzone-cloud/anita@main/anita/grok-v02-test/";
  var files = [
    "bootstrap-exp.js",
    "engine/dialogue-state.js",
    "engine/pending.js",
    "engine/turn-guard.js",
    "engine/extract.js",
    "engine/human.js",
    "engine/ai-bridge.js",
    "engine/brief-flow.js",
    "engine/interpreter.js",
    "engine/ui-bind.js"
  ];

  function loadNext(index) {
    if (index >= files.length) {
      console.log("[ANITA Grok v0.2] experimental engine loaded");
      window.dispatchEvent(new CustomEvent("anita:grok-v02-ready"));
      return;
    }

    var script = document.createElement("script");
    script.src = BASE + files[index] + "?v=20260917-1";
    script.async = false;
    script.onload = function () { loadNext(index + 1); };
    script.onerror = function () {
      console.error("[ANITA Grok v0.2] failed to load:", files[index]);
    };
    document.head.appendChild(script);
  }

  loadNext(0);
})();
