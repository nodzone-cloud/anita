/* ANITA Engine Experiment — dialogueState
   Single source of truth for the conversation.
*/
(function (root) {
  "use strict";
  const W = (root.ANITA50 = root.ANITA50 || {});
  const C = root.ANITA50_CONFIG || {};

  const STORAGE_KEY = (C.contextKey || "an50_context") + "_engine_v1";

  function emptyBrief() {
    return {
      confirmed: {
        business: null,
        goal: null,
        size: null,
        requirements: []
      },
      inferred: {
        suggestions: [],
        recommendedPackage: null,
        recommendedStructure: null
      },
      rejected: {
        suggestions: []
      },
      meta: {
        needsAlexReview: false,
        createdAt: null,
        updatedAt: null
      }
    };
  }

  function emptyState() {
    return {
      turnId: 0,
      language: null,
      topic: null,
      role: "guide",
      pendingQuestion: null,
      websiteBrief: emptyBrief(),
      conversationState: "idle", // idle | greeting | asking_goal | brief | confirming | done
      lastUser: null,
      lastAssistant: null,
      clientMemory: {
        name: null,
        business: null
      },
      flags: {
        greeted: false,
        askedGoal: false,
        briefStarted: false
      }
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const parsed = JSON.parse(raw);
      const base = emptyState();
      return Object.assign(base, parsed, {
        websiteBrief: Object.assign(emptyBrief(), parsed.websiteBrief || {}),
        clientMemory: Object.assign(base.clientMemory, parsed.clientMemory || {}),
        flags: Object.assign(base.flags, parsed.flags || {})
      });
    } catch (_) {
      return emptyState();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  let _state = load();

  const DialogueState = {
    get() {
      return _state;
    },

    /** Immutable-style update */
    update(patch) {
      const next = Object.assign({}, _state, patch || {});
      if (patch && patch.websiteBrief) {
        next.websiteBrief = Object.assign(emptyBrief(), _state.websiteBrief, patch.websiteBrief);
        if (patch.websiteBrief.confirmed) {
          next.websiteBrief.confirmed = Object.assign(
            {},
            (_state.websiteBrief && _state.websiteBrief.confirmed) || {},
            patch.websiteBrief.confirmed
          );
        }
        if (patch.websiteBrief.inferred) {
          next.websiteBrief.inferred = Object.assign(
            {},
            (_state.websiteBrief && _state.websiteBrief.inferred) || {},
            patch.websiteBrief.inferred
          );
        }
        if (patch.websiteBrief.rejected) {
          next.websiteBrief.rejected = Object.assign(
            {},
            (_state.websiteBrief && _state.websiteBrief.rejected) || {},
            patch.websiteBrief.rejected
          );
        }
      }
      if (patch && patch.flags) {
        next.flags = Object.assign({}, _state.flags, patch.flags);
      }
      if (patch && patch.clientMemory) {
        next.clientMemory = Object.assign({}, _state.clientMemory, patch.clientMemory);
      }
      next.websiteBrief.meta = Object.assign(
        {},
        next.websiteBrief.meta || {},
        { updatedAt: new Date().toISOString() }
      );
      _state = next;
      save(_state);
      return _state;
    },

    nextTurn() {
      _state = Object.assign({}, _state, { turnId: (_state.turnId || 0) + 1 });
      save(_state);
      return _state.turnId;
    },

    currentTurn() {
      return _state.turnId || 0;
    },

    setLanguage(lang) {
      if (lang === "ru" || lang === "en" || lang === "fi") {
        return this.update({ language: lang });
      }
      return _state;
    },

    setRole(role) {
      return this.update({ role: role });
    },

    setTopic(topic) {
      return this.update({ topic: topic });
    },

    setConversationState(cs) {
      return this.update({ conversationState: cs });
    },

    setPending(pendingQuestion) {
      return this.update({ pendingQuestion: pendingQuestion });
    },

    clearPending() {
      return this.update({ pendingQuestion: null });
    },

    resetBrief() {
      return this.update({ websiteBrief: emptyBrief(), flags: { briefStarted: false } });
    },

    /** For debugging / tests */
    _resetAll() {
      _state = emptyState();
      save(_state);
      return _state;
    },

    emptyBrief,
    emptyState
  };

  W.engine = W.engine || {};
  W.engine.DialogueState = DialogueState;

  console.log("[ANITA Engine] dialogueState ready");
})(typeof window !== "undefined" ? window : globalThis);
