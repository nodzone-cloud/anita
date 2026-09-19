(function(root){"use strict";
const A=root.ANITA51=root.ANITA51||{};
const TIMER="https://anita-timer-test.nodzone.workers.dev";

function detectLang(t,current){
  if(current)return current;
  if(/[А-Яа-яЁё]/.test(t))return"ru";
  if(/\b(hei|moi|sivusto|hinnat|kiitos)\b/i.test(t))return"fi";
  return"en";
}

function timerBrief(brief){
  const c=brief&&brief.confirmed||{};
  const contact=brief&&brief.confirmed&&brief.confirmed.contact||{};
  return{
    business:c.business||"",
    goal:c.goal||"",
    size:c.size||"",
    requirements:Array.isArray(c.requirements)?c.requirements:[],
    firstName:contact.firstName||"",
    lastName:contact.lastName||"",
    phone:contact.phone||"",
    email:contact.email||""
  };
}

async function timerRequest(path,brief,extra){
  try{
    const orderNumber=brief&&brief.meta&&brief.meta.orderNumber;
    const payload=Object.assign({
      orderNumber,
      brief:timerBrief(brief)
    },extra||{});
    const r=await fetch(TIMER+path,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });
    let d=null;
    try{d=await r.json()}catch(_){}
    return{ok:!!(r.ok&&d&&d.ok),status:r.status,data:d};
  }catch(e){
    return{ok:false,error:String(e)};
  }
}

async function timerCancel(orderNumber){
  try{
    const r=await fetch(TIMER+"/cancel?order="+encodeURIComponent(orderNumber),{
      method:"POST",
      headers:{"Content-Type":"application/json"}
    });
    let d=null;
    try{d=await r.json()}catch(_){}
    return{ok:!!(r.ok&&d&&d.ok),status:r.status,data:d};
  }catch(e){
    return{ok:false,error:String(e)};
  }
}

A.Interpreter={
  async handle(raw){
    const text=String(raw||"").trim(),turn=A.State.nextTurn();
    A.State.update({language:detectLang(text,A.State.get().language),lastUser:text});
    let state=A.State.get(),intent=A.IntentRouter.classify(text,state),out;

    /* Recover an unfinished website brief if its active question was lost.
       This keeps free-form answers (e.g. "I own a chair shop") inside the
       deterministic Secretary flow instead of letting AI invent a new topic. */
    if(state.topic==="website"&&state.brief&&state.brief.meta&&!state.brief.meta.sent&&state.brief.meta.status!=="cancelled"&&!state.pending&&["brief","confirmed"].includes(state.phase)){
      const c=state.brief.confirmed||{},k=c.contact||{};
      const incomplete=!c.business||!c.goal||!c.size||!Array.isArray(c.requirements)||!c.requirements.length||!k.firstName||!k.lastName||!k.phone||!k.email;
      if(incomplete){
        A.State.update({sector:"secretary",phase:"brief"});
        out=A.Secretary.next();
        state=A.State.get();
        intent=A.IntentRouter.classify(text,state);
        if(state.pending)out=A.Secretary.answer(text);
      }
    }

    if(out){/* recovered unfinished brief above */}
    else if(state.topic==="website"&&state.brief&&state.brief.meta&&!state.brief.meta.sent&&state.brief.meta.status!=="cancelled"&&state.phase==="brief"&&!state.pending){
      /* A website brief owns the conversation until it is complete. Never let a
         free-form business answer fall through to AI just because pending was lost. */
      out=A.Secretary.next();
      state=A.State.get();
      if(state.pending)out=A.Secretary.answer(text);
    }
    else if(state.brief&&state.brief.meta&&state.brief.meta.status==="waiting"&&/^(thanks|thank you|thanks a lot|thank you very much|ok thanks|okay thanks|great thanks|perfect thanks|спасибо|спасибо большое|хорошо спасибо|ок спасибо|понял спасибо|kiitos|kiitos paljon)[.! 😊🙏]*$/i.test(text))out={text:state.language==="ru"?"Пожалуйста 😊 Я всё сделаю.":state.language==="fi"?"Ole hyvä 😊 Hoidan sen.":"You’re welcome 😊 I’ll take care of it.",sector:"human"};
    else if(intent.primary==="new_brief")out=A.Secretary.start();
    else if(state.phase==="brief_amended"&&/^(ok|okay|done|that'?s done|thats done|finished|all done|готов|всё|все|закончил|готово|valmis)/i.test(text))out=A.Secretary.finishAmendments();
    else if(state.brief&&state.brief.confirmed&&state.brief.meta&&!state.brief.meta.sent&&state.brief.confirmed.business&&/^(also\b|and\b|i also\b|also i\b|plus\b|we also\b|add\b|include\b|actually\b|ещ[её]\b|а ещё\b|также\b|добав\b|lisäksi\b)/i.test(text))out=A.Secretary.amend(text.replace(/^(also\s+i\s+need|i\s+also\s+need|we\s+also\s+need|also|and|plus|add|include|ещ[её]|а ещё|также|добав(?:ь|ить)?|lisäksi)\s*/i,"").trim()||text);
    else if(intent.primary==="pending")out=A.Secretary.answer(text);
    else if(state.brief&&state.brief.meta&&state.brief.meta.confirmed&&!state.brief.meta.sent&&/cancel|never mind|changed my mind|отмен|передум|не надо|peru/i.test(text)){
      const wasWaiting=state.brief.meta.status==="waiting";
      const orderNumber=state.brief.meta.orderNumber;
      if(wasWaiting){
        const cancelled=await timerCancel(orderNumber);
        if(cancelled.ok){
          out=A.Secretary.cancel();
        }else{
          out={
            text:state.language==="ru"?"Не удалось подтвердить отмену на сервере, поэтому я пока не буду говорить, что бриф отменён. Попробуйте ещё раз.":"I couldn’t confirm the cancellation on the server, so I won’t mark the brief as cancelled yet. Please try again.",
            sector:"secretary"
          };
        }
      }else{
        out=A.Secretary.cancel();
      }
    }
    else if((state.phase==="confirmed"||state.phase==="waiting")&&/send|pass|перед|отправ|lähet/i.test(text)){
      const dm=A.Secretary.delayedMinutes(text);

      if(dm!==null){
        if(dm<1||dm>60){
          out={
            text:state.language==="ru"?"Я могу запланировать отправку готового брифа через 1–60 минут. Выберите время в пределах одного часа.":"I can schedule the completed brief for 1–60 minutes from now. Please choose a time within one hour.",
            sector:"secretary"
          };
        }else{
          out={
            text:state.language==="ru"?"Хорошо 😊 Я отправлю бриф "+state.brief.meta.orderNumber+" Alex через "+dm+" мин.":"Got it 😊 I’ll send brief "+state.brief.meta.orderNumber+" to Alex in "+dm+" minute"+(dm===1?"":"s")+".",
            sector:"secretary",
            action:{type:"schedule_brief",minutes:dm}
          };
        }
      }else{
        A.State.update({phase:"handoff_requested"});
        out={text:"",sector:"secretary",action:{type:"send_brief"}};
      }
    }
    else if(intent.primary==="website")out=A.Secretary.start();
    else if(intent.primary==="guide"){
      const g=A.Guide.answer(text,state.language);
      out={text:g||A.Human.fallback(state.language),sector:"guide"};
    }
    else if(intent.primary==="it")out={
      text:state.language==="ru"?"Конечно. Опишите, что происходит с устройством и что вы уже пробовали.":"Sure. Tell me what is happening with the device and what you have already tried.",
      sector:"it"
    };
    else if(intent.primary==="human")out={text:A.Human.reply(text,state.language),sector:"human"};
    else{
      const ai=await A.AI.understand(text,state);
      out={text:ai||A.Human.fallback(state.language),sector:"human",usedAI:!!ai};
    }

    if(out&&out.action&&out.action.type==="schedule_brief"){
      const mins=out.action.minutes;
      const b=A.State.get().brief;
      const scheduled=await timerRequest("/schedule",b,{delayMinutes:mins});

      if(scheduled.ok){
        b.meta=Object.assign({},b.meta,{
          status:"waiting",
          sendAt:scheduled.data&&scheduled.data.sendAt?scheduled.data.sendAt:Date.now()+mins*60000,
          scheduledMinutes:mins
        });
        A.State.update({brief:b,phase:"waiting"});
        delete out.action;
      }else{
        A.State.update({phase:"confirmed"});
        out={
          text:state.language==="ru"?"Не получилось запланировать отправку на сервере. Бриф не поставлен в очередь. Можно попробовать ещё раз.":"I couldn’t schedule the brief on the server. It has not been queued. You can try again.",
          sector:"secretary",
          handoff:"failed"
        };
      }
    }

    if(out&&out.action&&out.action.type==="send_brief"){
      const b=A.State.get().brief;
      const sent=await timerRequest("/send-now",b);

      if(sent.ok){
        b.meta=Object.assign({},b.meta,{
          sent:true,
          status:"sent",
          sentAt:sent.data&&sent.data.sentAt?sent.data.sentAt:Date.now(),
          sendAt:null
        });
        A.State.update({brief:b,phase:"handoff_complete"});
        out={
          text:state.language==="ru"?"Готово 😊 Я передала бриф Alex.":"Done 😊 I sent the brief to Alex.",
          sector:"secretary",
          handoff:"sent"
        };
      }else{
        A.State.update({phase:state.phase==="waiting"?"waiting":"confirmed"});
        out={
          text:state.language==="ru"?"Сейчас отправить не получилось. Бриф не отмечен как отправленный. Можно попробовать ещё раз.":"I couldn’t send it right now. The brief has not been marked as sent. You can try again.",
          sector:"secretary",
          handoff:"failed"
        };
      }
    }

    A.State.update({lastReply:out.text,sector:out.sector||A.State.get().sector});
    return Object.assign({turnId:turn,intent,language:A.State.get().language},out);
  }
};
})(window);
