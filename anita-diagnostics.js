/* ANITA v20 — Step-by-step diagnostic conversation engine.
   Uses ANITA_SUPPORT_KNOWLEDGE. It does not dump all checks at once:
   it remembers the active case, asks one step, interprets the user's result,
   and either concludes, branches, clarifies, or advances.
*/
(function(){
"use strict";
const K=window.ANITA_SUPPORT_KNOWLEDGE, M=window.ANITA_MEMORY;
if(!K||!M){console.error("[ANITA v20] Diagnostic engine missing dependency");return;}

const S={caseId:null,step:0,active:false,language:"en",tried:[],evidence:[]};

function L(lang,en,ru,fi){return lang==="ru"?ru:lang==="fi"?fi:en;}
function norm(s){return K.normalize(s);}
function answer(text,done){return {text,done:!!done,handled:true};}
function reset(){S.caseId=null;S.step=0;S.active=false;S.tried=[];S.evidence=[];}
function current(){return K.get(S.caseId);}
function checkText(c,lang){return c?.[lang]||c?.en||"";}

function deviceFromProblem(c,lang){
 const t=(c?.[lang]||c?.en||"").toLowerCase();
 const pairs=[
  ["mouse","мыш","hiir"],["keyboard","клавиат","näppäimist"],["monitor","монитор","näytt"],
  ["printer","принтер","tulost"],["scanner","сканер","skanner"],["microphone","микрофон","mikrofon"],
  ["webcam","камер","kamera"],["headphones","науш","kuulok"],["speaker","колон","kaiutin"],
  ["projector","проектор","projektor"],["disk","диск","levy"],["drive","накоп","asema"],
  ["computer","компьют","tietokone"],["laptop","ноут","kannettava"]
 ];
 for(const p of pairs) if(p.some(x=>t.includes(x))) return p[0];
 return "device";
}
function userResult(text){
 const t=" "+norm(text)+" ";
 const success=/( works| working| fixed| solved| now works| started working| заработ| помогло| работает теперь| исправ| toimii nyt| alkoi toimia| korjaant)/.test(t)
   && !/( not working| does not work| doesnt work| still not| не работает| не помог| все еще| всё ещё| ei toimi| ei auttanut)/.test(t);
 const fail=/( still not| not working| does not work| doesnt work| didn't help| did not help| same problem| no change| nothing changed| не работает| не помог| без изменений| та же проблема| все еще| всё ещё| ei toimi| ei auttanut| sama ongelma| ei muutosta)/.test(t);
 const anotherComputer=/(another computer|other computer|another pc|другом компьютере|другой компьютер|toisessa tietokoneessa)/.test(t);
 const thisComputer=/(this computer|this pc|problem computer|этом компьютере|проблемном компьютере|tässä tietokoneessa|ongelmakoneessa)/.test(t);
 const anotherDevice=/(another|other|different|known good|known-good|другая|другой|другое|заведомо рабоч|toinen|muu)/.test(t);
 const original=/(my|original|same|this|мой|моя|исходн|тот же|та же|minun|alkuperäinen|sama)/.test(t);
 return {t,success,fail,anotherComputer,thisComputer,anotherDevice,original};
}
function isCrossTest(chk){
 const e=(chk?.en||"").toLowerCase();
 return e.includes("another computer") || e.includes("known-working device") || e.includes("known working device");
}
function crossEvidence(text,c,lang){
 const r=userResult(text), dev=deviceFromProblem(c,lang);
 if(r.anotherComputer && r.anotherDevice && r.success){
   return answer(L(lang,
    `I understand: another ${dev} works on another computer. That confirms that the other device and the other computer work, but it does not yet isolate your original problem. Test either your original device on that other computer, or the known-working device on the problem computer, and tell me which result you get.`,
    `Поняла: другое устройство работает на другом компьютере. Это подтверждает, что другое устройство и другой компьютер исправны, но ещё не отделяет причину исходной проблемы. Проверь либо исходное устройство на другом компьютере, либо заведомо рабочее устройство на проблемном компьютере и скажи результат.`,
    `Ymmärsin: toinen laite toimii toisessa tietokoneessa. Se vahvistaa, että toinen laite ja toinen tietokone toimivat, mutta alkuperäisen ongelman syy ei vielä selviä. Testaa joko alkuperäinen laite toisessa tietokoneessa tai varmasti toimiva laite ongelmakoneessa ja kerro tulos.`
   ),false);
 }
 if(r.anotherComputer && (r.original||!r.anotherDevice) && r.fail){
   S.evidence.push("original_fails_elsewhere");
   return answer(L(lang,
    `That is strong evidence: the original ${dev} also fails on another computer. The fault is therefore much more likely in the device itself, its cable, receiver, battery, or internal electronics than in Windows on the first PC. Check removable cable/receiver/power first. If those are okay, the device itself is likely faulty.`,
    `Это сильный диагностический результат: исходное устройство не работает и на другом компьютере. Значит, проблема гораздо вероятнее в самом устройстве, его кабеле, приёмнике, питании или внутренней электронике, а не в Windows первого ПК. Сначала проверь съёмный кабель/приёмник/питание. Если они исправны — вероятно, неисправно само устройство.`,
    `Tämä on vahva diagnostinen tulos: alkuperäinen laite ei toimi toisessakaan tietokoneessa. Vika on siis paljon todennäköisemmin itse laitteessa, kaapelissa, vastaanottimessa, virransyötössä tai elektroniikassa kuin ensimmäisen tietokoneen Windowsissa. Tarkista ensin irrotettava kaapeli/vastaanotin/virta. Jos ne ovat kunnossa, itse laite on todennäköisesti viallinen.`
   ),true);
 }
 if(r.anotherComputer && (r.original||!r.anotherDevice) && r.success){
   S.evidence.push("original_works_elsewhere");
   return answer(L(lang,
    `Useful result: the original ${dev} works on another computer. That makes the device itself less likely to be faulty. The problem is more likely on the original PC — port, driver, Windows setting, receiver/Bluetooth path, or power management. I’ll continue with the next PC-side check.`,
    `Полезный результат: исходное устройство работает на другом компьютере. Значит, само устройство менее вероятно неисправно. Причину теперь логичнее искать на исходном ПК — порт, драйвер, настройки Windows, Bluetooth/приёмник или управление питанием. Продолжу следующей проверкой со стороны ПК.`,
    `Hyödyllinen tulos: alkuperäinen laite toimii toisessa tietokoneessa. Itse laite on siis epätodennäköisempi vikakohde. Syy on todennäköisemmin alkuperäisessä tietokoneessa — portissa, ajurissa, Windows-asetuksissa, Bluetooth-/vastaanotinyhteydessä tai virranhallinnassa. Jatkan seuraavaan tietokonepuolen tarkistukseen.`
   ),false);
 }
 if(r.thisComputer && r.anotherDevice && r.success){
   S.evidence.push("other_works_here");
   return answer(L(lang,
    `That is also strong evidence: another known-working ${dev} works on the problem computer. The computer/port can therefore work, so the original device is now the more likely fault.`,
    `Это тоже сильный результат: другое заведомо рабочее устройство работает на проблемном компьютере. Значит, компьютер/порт в принципе исправен, и теперь исходное устройство — более вероятная причина.`,
    `Tämäkin on vahva tulos: toinen varmasti toimiva laite toimii ongelmakoneessa. Tietokone/portti pystyy siis toimimaan, joten alkuperäinen laite on nyt todennäköisempi vikakohde.`
   ),true);
 }
 if(r.thisComputer && r.anotherDevice && r.fail){
   S.evidence.push("other_fails_here");
   return answer(L(lang,
    `That points to the computer side: another known-working ${dev} also fails on the problem PC. The next checks should focus on the port, driver, Device Manager, Windows settings, or controller rather than replacing the original device.`,
    `Это указывает на сторону компьютера: другое заведомо рабочее устройство тоже не работает на проблемном ПК. Дальше нужно проверять порт, драйвер, Диспетчер устройств, настройки Windows или контроллер, а не сразу менять исходное устройство.`,
    `Tämä viittaa tietokoneen puolelle: toinen varmasti toimiva laite ei myöskään toimi ongelmakoneessa. Seuraavaksi kannattaa tutkia porttia, ajuria, Laitehallintaa, Windows-asetuksia tai ohjainta eikä vaihtaa alkuperäistä laitetta heti.`
   ),false);
 }
 return null;
}
function stepPrompt(c,lang,index,prefix){
 const chk=c.checks[index]; if(!chk)return null;
 const n=index+1;
 return L(lang,
  `${prefix||""}Check ${n}: ${checkText(chk,"en")} Tell me what happens after this check.`,
  `${prefix||""}Проверка ${n}: ${checkText(chk,"ru")} Напиши, что произошло после этой проверки.`,
  `${prefix||""}Tarkistus ${n}: ${checkText(chk,"fi")} Kerro, mitä tämän tarkistuksen jälkeen tapahtui.`
 );
}
function start(match,lang){
 const c=match.case||match;
 if(!c||!c.checks?.length)return null;
 S.caseId=c.id;S.step=0;S.active=true;S.language=lang;S.tried=[];S.evidence=[];
 M.fact("v20CaseId",c.id);M.fact("v20Step",0);M.setQuestion("v20_diagnostic_result","result");
 const recognized=c[lang]||c.en;
 return answer(L(lang,
  `I understand the problem as: “${recognized}” I’ll diagnose it step by step instead of giving you a long list at once. ${stepPrompt(c,lang,0,"")}`,
  `Я понимаю проблему так: «${recognized}» Будем диагностировать по шагам, а не выдавать весь список сразу. ${stepPrompt(c,lang,0,"")}`,
  `Ymmärrän ongelman näin: “${recognized}” Diagnosoidaan se vaihe vaiheelta pitkän listan sijaan. ${stepPrompt(c,lang,0,"")}`
 ),false);
}
function advance(c,lang,prefix){
 S.tried.push(S.step); S.step++; M.fact("v20Step",S.step);
 if(S.step>=c.checks.length){
   S.active=false; M.setQuestion(null,null);
   return answer(L(lang,
    `${prefix||""}We have now gone through the practical checks from this diagnostic path and the problem remains. At this point I would not keep repeating the same steps. The next useful information is the exact device/model, any error code, and what changed immediately before the fault. With that, I can narrow the diagnosis further; otherwise this is a good point to escalate to a technician.`,
    `${prefix||""}Мы прошли практические проверки этого диагностического сценария, а проблема осталась. Повторять те же шаги дальше нет смысла. Теперь полезны точная модель устройства, код ошибки и что изменилось непосредственно перед неисправностью. По этим данным можно сузить диагноз; иначе уже разумно передать случай специалисту.`,
    `${prefix||""}Tämän diagnostiikkapolun käytännön tarkistukset on nyt käyty läpi ja ongelma jatkuu. Samojen vaiheiden toistaminen ei enää auta. Seuraavaksi tarvitaan laitteen tarkka malli, mahdollinen virhekoodi ja tieto siitä, mikä muuttui juuri ennen vikaa. Näillä diagnoosia voidaan rajata; muuten tapaus kannattaa siirtää asiantuntijalle.`
   ),true);
 }
 M.setQuestion("v20_diagnostic_result","result");
 return answer(stepPrompt(c,lang,S.step,prefix||""),false);
}
function follow(text,lang){
 if(window.ANITA_CONTEXT && window.ANITA_CONTEXT.update){
   window.ANITA_CONTEXT.update(text,lang||S.language||"en");
 }
 if(!S.active)return null;
 const c=current(); if(!c){reset();return null;}
 lang=lang||S.language||"en"; S.language=lang;
 const chk=c.checks[S.step], r=userResult(text);

 // Cross-test replies carry evidence and must not be treated as a plain yes/no.
 if(isCrossTest(chk)){
   const ce=crossEvidence(text,c,lang);
   if(ce){
     if(ce.done){S.active=false;M.setQuestion(null,null);return ce;}
     // If evidence says PC-side, continue to next stored check rather than looping.
     if(S.evidence.includes("original_works_elsewhere")||S.evidence.includes("other_fails_here")){
       return advance(c,lang,ce.text+" ");
     }
     return ce;
   }
 }

 if(r.success){
   S.active=false; M.setQuestion(null,null);
   return answer(L(lang,
    `Great — that result indicates the last step solved the symptom. I’ll stop this diagnostic path here so we don’t change anything unnecessarily.`,
    `Отлично — по результату видно, что последний шаг устранил симптом. На этом остановим диагностику, чтобы не менять лишнего.`,
    `Hyvä — tulos osoittaa, että viimeinen vaihe poisti oireen. Lopetan tämän diagnostiikkapolun tähän, jotta mitään turhaa ei muuteta.`
   ),true);
 }
 if(r.fail){
   return advance(c,lang,L(lang,
    `Understood — the problem remains. `,
    `Поняла — проблема осталась. `,
    `Ymmärsin — ongelma jatkuu. `
   ));
 }

 // Rich free-text evidence: remember it, don't throw it away, then clarify outcome.
 S.evidence.push(String(text||""));
 M.fact("v20LastEvidence",String(text||""));
 return answer(L(lang,
  `I’ve kept that result as diagnostic evidence: “${text}”. Before I choose the next branch, did this check make the original problem disappear, or is the problem still there?`,
  `Я сохранила этот результат как диагностический факт: «${text}». Прежде чем выбрать следующую ветку: после этой проверки исходная проблема исчезла или всё ещё остаётся?`,
  `Tallensin tämän tuloksen diagnostiseksi tiedoksi: “${text}”. Ennen seuraavan haaran valintaa: poistuiko alkuperäinen ongelma tämän tarkistuksen jälkeen vai jatkuuko se edelleen?`
 ),false);
}
window.ANITA_DIAGNOSTICS={version:"21.0",state:S,start,follow,reset,current};
console.log("[ANITA v20] Diagnostic conversation engine loaded");
})();
