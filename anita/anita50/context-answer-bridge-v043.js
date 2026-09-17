/* ANITA 0.4.3 — HUMAN-TECH CONTEXT ANSWER BRIDGE
 * Resolves short/natural answers against the active question BEFORE the legacy
 * router/semantic pipeline. This prevents a valid answer from being lost and
 * the same question being asked again.
 */
(function(W){
"use strict";
if(!W||!W.state||!W.ui||W.__contextAnswerBridge043)return;
W.__contextAnswerBridge043=true;
const clean=v=>String(v==null?"":v).trim();
const norm=v=>clean(v).toLowerCase().replace(/ё/g,"е").replace(/[’]/g,"'").replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();
const say=(l,en,ru,fi)=>l==="ru"?ru:l==="fi"?fi:en;
const SIZE=["one landing page","a few separate pages","a larger multi-page site"];
function wordsNumber(x){const m={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,"одна":1,"один":1,"две":2,"два":2,"три":3,"четыре":4,"пять":5,"шесть":6,"семь":7,"восемь":8,"девять":9,"десять":10,yksi:1,kaksi:2,kolme:3,nelja:4,viisi:5,kuusi:6,seitseman:7,kahdeksan:8,yhdeksan:9,kymmenen:10};return m[x]||null;}
function editDistance(a,b){a=norm(a);b=norm(b);const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length];}
function fuzzySeveral(x){const toks=norm(x).split(/\s+/);return toks.some(t=>t.length>=6&&editDistance(t,"несколько")<=2);}
function ordinal(x){x=norm(x);const map=[[1,/\b(?:first|1st|перв(?:ый|ая|ое)|ensimmainen)\b/i],[2,/\b(?:second|2nd|втор(?:ой|ая|ое)|toinen)\b/i],[3,/\b(?:third|3rd|трет(?:ий|ья|ье)|kolmas)\b/i],[4,/\b(?:fourth|4th|четверт(?:ый|ая|ое)|neljas)\b/i]];for(const[n,r]of map)if(r.test(x))return n;const m=x.match(/(?:вариант|option)\s*#?\s*(\d{1,2})|^(\d{1,2})\s*(?:вариант|option)$/i);return m?Number(m[1]||m[2]):null;}
function sizeFrom(text){const x=norm(text);if(!x)return null;
 const oi=ordinal(x);if(oi&&oi<=3)return{value:SIZE[oi-1],pageCount:null,source:"option"};
 if(/\b(?:one[- ]?page|single[- ]?page|landing page|лендинг|одностранич|yksi sivu)\b/i.test(x))return{value:SIZE[0],pageCount:1,source:"meaning"};
 if(/\b(?:few|several|couple|some|multiple|separate)\b.*\bpages?\b|пару(?:\s+страниц)?|несколько(?:\s+(?:отдельных\s+)?страниц)?|отдельн\w*\s+страниц|muutama\s+sivu|useita\s+sivu/i.test(x)||fuzzySeveral(x))return{value:SIZE[1],pageCount:null,source:"meaning"};
 if(/\b(?:large|larger|big|multi[- ]?page|multipage)\b|многостранич|больш\w*\s+(?:многостранич\w*\s+)?сайт|monisivuinen/i.test(x))return{value:SIZE[2],pageCount:null,source:"meaning"};
 let m=x.match(/^(\d{1,2})(?:\s*(?:страниц\w*|pages?|sivu\w*))?$/i),n=m?Number(m[1]):wordsNumber(x.replace(/\s*(?:страниц\w*|pages?|sivu\w*)$/i,""));
 if(n&&n>0)return{value:n===1?SIZE[0]:n<=5?SIZE[1]:SIZE[2],pageCount:n,source:"quantity"};
 return null;
}
function currentLang(c,text){return /[а-яё]/i.test(text)?"ru":/[äöå]/i.test(text)?"fi":c.language||"en";}
function finishSize(r,text){const c=W.state.context();if(c.topic!=="website_consultation"||c.pending!=="size")return false;const b=Object.assign({},c.websiteBrief||{}, {size:r.value});if(r.pageCount)b.pageCount=r.pageCount;const l=currentLang(c,text);W.state.patch({websiteBrief:b,pending:null,briefStage:"collecting",briefSideTurns:0,lastRoute:"V043_CONTEXT_SIZE",language:l,lastContextAnswer:{field:"size",raw:clean(text),value:r.value,pageCount:r.pageCount||null,source:r.source}});
 /* Let the semantic secretary continue from already-persisted state. This call is
    intentionally direct: no synthetic second user message and no repeat loop. */
 if(W.semanticAdapter&&typeof W.semanticAdapter.routeToSecretary==="function"){
   try{const out=W.semanticAdapter.routeToSecretary({intent:"website_size",language:l,size:r.value,text:clean(text),confidence:1,confirmed_requirements:[],inferred_suggestions:[],customer_signals:[]});if(out&&out.text){W.ui.mode(W.state.tour?.()?.active?"tour":"chat");W.ui.pose(out.pose||"professional");W.ui.bubbleText(out.text);return true;}}catch(e){console.warn("[ANITA 0.4.3 bridge secretary]",e);}
 }
 W.ui.bubbleText(say(l,"Got it. I saved the site size and we can continue.","Поняла. Размер сайта сохранён, продолжаем.","Selvä. Sivuston koko on tallennettu, jatketaan."));return true;
}
function intercept(e){const input=document.getElementById("an50-input"),c=W.state.context();if(!input||c?.topic!=="website_consultation"||c.pending!=="size")return false;const text=clean(input.value),r=sizeFrom(text);if(!r)return false;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();input.value="";finishSize(r,text);return true;}
document.addEventListener("click",e=>{if(e.target?.closest?.("#an50-send"))intercept(e);},true);
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target?.closest?.("#an50-input"))intercept(e);},true);
W.contextAnswer043={resolveSize:sizeFrom,finishSize};
window.__ANITA_V043__={contextStateBridge:true,sizeDirectPersistence:true,fuzzyShortAnswers:true};
console.log("[ANITA 0.4.3 HUMAN-TECH BRIDGE]",window.__ANITA_V043__);
})(window.ANITA50=window.ANITA50||{});
