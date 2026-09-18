(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};
function lang(t){if(/[А-Яа-яЁё]/.test(t))return"ru";if(/\b(hei|moi|sivusto|hinnat|kiitos)\b/i.test(t))return"fi";return"en"}
A.Interpreter={async handle(text){const turn=A.State.nextTurn(),s=A.State.get();if(!s.language||s.phase==="idle")A.State.update({language:lang(text)});A.State.update({lastUser:text});const state=A.State.get(),intent=A.IntentRouter.classify(text,state);
let out;
if(intent.primary==="pending_answer")out=A.Secretary.answer(text);
else if(intent.primary==="website")out=A.Secretary.start();
else if(intent.primary==="guide"){const g=A.Guide.answer(text,state.language);out={text:g||A.Human.fallback(state.language),sector:"guide"}}
else if(intent.primary==="it")out={text:state.language==="ru"?"Опишите, что происходит с устройством.":"Tell me what is happening with the device.",sector:"it"};
else if(intent.primary==="human")out={text:A.Human.fallback(state.language),sector:"human"};
else{const semantic=await A.AI.interpret({text,state:A.State.get(),pending:A.State.get().pending});out=semantic&&semantic.reply?{text:semantic.reply,sector:semantic.sector||"human"}:{text:A.Human.fallback(state.language),sector:"human"}}
A.State.update({lastReply:out.text,sector:out.sector||A.State.get().sector});return Object.assign({turnId:turn,intent},out)}};
})(window);