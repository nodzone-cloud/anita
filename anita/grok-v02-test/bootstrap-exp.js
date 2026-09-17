/* ANITA Engine Experiment — bootstrap
   Load order for experimental engine (after ANITA50_CONFIG if present).
*/
(function () {
  "use strict";
  if (window.__ANITA_ENGINE_EXP__) return;
  window.__ANITA_ENGINE_EXP__ = true;

  // If config missing (standalone test), create minimal one
  if (!window.ANITA50_CONFIG) {
    window.ANITA50_CONFIG = {
      version: "engine-exp-0.1",
      engineUrl: "https://anita-api.alexnode.fi/chat",
      localDevEngineUrl: "http://127.0.0.1:8787/chat",
      visitorKey: "an50_visitor_id",
      contextKey: "an50_context",
      contact: { email: "AN@alexnode.fi", phone: "+358 45 852 5293" },
      ownerEmail: "AN@alexnode.fi",
      packages: {
        START: { price: "250 €" },
        LIGHT: { price: "450 €" },
        MEDIUM: { price: "620 €" },
        CODE: { price: "from 700 €" }
      }
    };
  }

  window.ANITA50 = window.ANITA50 || {};

  console.log("[ANITA Engine Experiment] bootstrap loaded — include engine/*.js next");
})();
