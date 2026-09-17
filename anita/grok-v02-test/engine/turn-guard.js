/* ANITA Engine Experiment — turnId / stale response protection */
(function (root) {
  "use strict";
  const W = (root.ANITA50 = root.ANITA50 || {});

  const TurnGuard = {
    /**
     * Call at the start of handling a user message.
     * Returns the new turnId that all async work for this message must carry.
     */
    beginTurn() {
      const DS = W.engine && W.engine.DialogueState;
      if (!DS) return 0;
      return DS.nextTurn();
    },

    current() {
      const DS = W.engine && W.engine.DialogueState;
      return DS ? DS.currentTurn() : 0;
    },

    /** Returns true if this async callback is still allowed to write UI/state */
    isActive(turnId) {
      return turnId === this.current();
    },

    /**
     * Wrap an async function so it only applies results if turn is still active.
     * Usage:
     *   const safe = TurnGuard.guard(turnId, async () => { ... });
     *   const result = await safe();
     *   if (result === TurnGuard.STALE) return;
     */
    STALE: Symbol("ANITA_STALE_TURN"),

    guard(turnId, asyncFn) {
      const self = this;
      return async function guarded() {
        if (!self.isActive(turnId)) return self.STALE;
        const result = await asyncFn.apply(this, arguments);
        if (!self.isActive(turnId)) return self.STALE;
        return result;
      };
    },

    /** Safe UI write */
    applyUI(turnId, fn) {
      if (!this.isActive(turnId)) return false;
      try {
        fn();
        return true;
      } catch (e) {
        console.warn("[ANITA TurnGuard] UI apply error", e);
        return false;
      }
    }
  };

  W.engine = W.engine || {};
  W.engine.TurnGuard = TurnGuard;

  console.log("[ANITA Engine] turnGuard ready");
})(typeof window !== "undefined" ? window : globalThis);
