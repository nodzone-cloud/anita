/*
 * ANITA Website Guide Engine
 * Prepared in advance for Alex Node. INACTIVE by default.
 * This module does not connect itself to alexnode.fi and performs no action
 * until a host application explicitly enables it and calls its API.
 */
(function (global) {
  "use strict";

  const state = { enabled: false, tour: null, index: -1, onStep: null };

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function normalizeTour(tour) {
    if (!tour || !Array.isArray(tour.steps) || !tour.steps.length) {
      throw new Error("ANITA Guide: tour.steps must contain at least one step.");
    }
    return {
      id: String(tour.id || "default"),
      title: tour.title || {},
      steps: tour.steps.map((step, i) => ({
        id: String(step.id || ("step-" + (i + 1))),
        target: step.target || null,
        route: step.route || null,
        message: step.message || {},
        action: step.action || "highlight",
        allowNavigation: step.allowNavigation !== false
      }))
    };
  }

  function emit() {
    if (!state.enabled || !state.tour || state.index < 0) return null;
    const step = state.tour.steps[state.index];
    const payload = {
      tourId: state.tour.id,
      index: state.index,
      total: state.tour.steps.length,
      step,
      hasPrevious: state.index > 0,
      hasNext: state.index < state.tour.steps.length - 1
    };
    if (typeof state.onStep === "function") state.onStep(payload);
    global.dispatchEvent(new CustomEvent("anita:guide-step", { detail: payload }));
    return payload;
  }

  const api = {
    version: "1.0.0-prepared",
    enable(options) {
      state.enabled = true;
      state.onStep = options && typeof options.onStep === "function" ? options.onStep : null;
      global.dispatchEvent(new CustomEvent("anita:guide-enabled"));
      return true;
    },
    disable() {
      state.enabled = false;
      state.tour = null;
      state.index = -1;
      state.onStep = null;
      global.dispatchEvent(new CustomEvent("anita:guide-disabled"));
    },
    isEnabled() { return state.enabled; },
    loadTour(tour) {
      if (!state.enabled) return false;
      state.tour = normalizeTour(tour);
      state.index = 0;
      return emit();
    },
    current() { return emit(); },
    next() {
      if (!state.enabled || !state.tour) return null;
      state.index = clamp(state.index + 1, 0, state.tour.steps.length - 1);
      return emit();
    },
    previous() {
      if (!state.enabled || !state.tour) return null;
      state.index = clamp(state.index - 1, 0, state.tour.steps.length - 1);
      return emit();
    },
    goTo(index) {
      if (!state.enabled || !state.tour) return null;
      state.index = clamp(Number(index) || 0, 0, state.tour.steps.length - 1);
      return emit();
    },
    stop() {
      state.tour = null;
      state.index = -1;
      global.dispatchEvent(new CustomEvent("anita:guide-stopped"));
    }
  };

  Object.defineProperty(global, "ANITAGuide", { value: api, writable: false });
})(window);
