(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};
/* AI is advisory, never authoritative over state.
Expected adapter contract:
interpret({text,state,pending}) -> semantic interpretation
phrase({facts,state,draft}) -> natural wording
The adapter may be attached later as A.AI.adapter.
*/
A.AI={adapter:null,async interpret(ctx){if(!this.adapter||!this.adapter.interpret)return null;return this.adapter.interpret(ctx)},async phrase(ctx){if(!this.adapter||!this.adapter.phrase)return ctx.draft;return this.adapter.phrase(ctx)}};
})(window);