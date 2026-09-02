/* ANITA v24.0 — LANGUAGE PARSER
   Safe token boundaries + semantic phrase composition + grammar/time normalization.
   Important: lexical equality is NOT semantic equality. "low" is never rewritten to "slow";
   context such as "low speed" can still map to poor_system_performance.
*/
(function(){
"use strict";
function rawNorm(s){return String(s||"").normalize("NFKC").toLowerCase().replace(/ё/g,"е").replace(/[“”«»'`]/g," ").replace(/[^\p{L}\p{N}%+×:\-\.]+/gu," ").replace(/\s+/g," ").trim();}
function tokens(s){return rawNorm(s).match(/[\p{L}\p{N}%+×:\-\.]+/gu)||[];}
function hasToken(s,w){return tokens(s).includes(String(w||"").toLowerCase());}
function phrase(s,p){const n=" "+rawNorm(s)+" ";return n.includes(" "+rawNorm(p)+" ");}
function temporal(n){
 if(/\b(is getting|getting|becoming|становится|становитс|становился|становилась|hidastuu|muuttuu hita)/.test(n))return"progressive";
 if(/\b(gets|sometimes|often|keeps getting|иногда|периодически|бывает|välillä|joskus|toistuvasti)/.test(n))return"recurring";
 if(/\b(was|had been|used to be|был|была|раньше|oli|aikaisemmin)/.test(n))return"past";
 if(/\b(will|going to|будет|tulee olemaan)/.test(n))return"future_expected";
 if(/\b(got|became|has become|turned|стал|стала|начал|начала|muuttui|tuli hita)/.test(n))return"changed_from_previous";
 return"current";
}
function performance(text){
 const n=rawNorm(text), ts=tokens(text);
 const device=/(^| )(pc|computer|desktop|laptop|notebook|machine|windows|компьютер|комп|пк|ноут|ноутбук|tietokone|kone|läppäri)( |$)/.test(" "+n+" ");
 const direct=/\b(slow|slowly|sluggish|laggy|lagging|hidas|hitaasti|lagaa|hidastelee|медленный|медленно|тормозит|тормозить|лагает|тупит)\b/.test(n);
 const speedObject=/\b(speed|performance|responsiveness|скорост|производительност|nopeus|suorituskyky)\b/.test(n);
 const lowModifier=/\b(low|little|not enough|insufficient|too little|very little|so little|низк|мало|недостаточ|alhainen|matala|liian vähän|ei tarpeeksi)\b/.test(n);
 const takesForever=/\b(takes? forever|takes? too long|not fast enough|isn t fast enough|is not fast enough|очень долго|слишком долго|недостаточно быстр|kestää ikuisuuden|liian hidas)\b/.test(n);
 if(device && (direct || takesForever || (speedObject&&lowModifier))){
   let confidence=direct||takesForever?0.98:0.90;
   if(/\b(little speed|мало скорости|vähän nopeutta)\b/.test(n))confidence=device?0.86:0.62;
   return {matched:true,symptom:"poor_system_performance",concept:"insufficient_speed",confidence,temporal:temporal(n),device:/(laptop|notebook|ноут|ноутбук|läppäri)/.test(n)?"laptop":device?"computer":null,original:String(text||"")};
 }
 return {matched:false};
}
function lowConcept(text){
 const n=rawNorm(text);
 const rules=[
  ["battery_level_low",/\b(low|little|низк|мало|alhainen|vähän)\b.{0,18}\b(battery|charge|батаре|заряд|akku)\b|\b(battery|charge|батаре|заряд|akku)\b.{0,18}\b(low|little|низк|мало|alhainen|vähän)\b/],
  ["audio_volume_low",/\b(low|quiet|низк|тих|hiljainen)\b.{0,18}\b(volume|sound|громк|звук|ääni|voimakkuus)\b|\b(volume|sound|громк|звук|ääni|voimakkuus)\b.{0,18}\b(low|quiet|низк|тих|hiljainen)\b/],
  ["storage_space_low",/\b(low|little|not enough|мало|недостаточ|vähän)\b.{0,22}\b(disk space|storage|space|мест|tilaa|tallennustilaa)\b|\b(disk space|storage|space|мест|tilaa|tallennustilaa)\b.{0,22}\b(low|little|мало|vähän)\b/],
  ["low_fps",/\b(low|little|низк|мало|alhainen)\b.{0,10}\bfps\b|\bfps\b.{0,10}\b(low|низк|alhainen)\b/],
  ["weak_signal",/\b(low|weak|низк|слаб|heikko)\b.{0,18}\b(wi-?fi|wifi|signal|сигнал|signaali)\b|\b(wi-?fi|wifi|signal|сигнал|signaali)\b.{0,18}\b(low|weak|низк|слаб|heikko)\b/]
 ];
 for(const [concept,re] of rules)if(re.test(n))return{matched:true,concept,confidence:.96};
 return{matched:false};
}
function analyze(text){const p=performance(text),low=lowConcept(text);return{normalized:rawNorm(text),tokens:tokens(text),performance:p,lowConcept:low,temporal:temporal(rawNorm(text))};}
window.ANITA_LANGUAGE_PARSER={version:"24.0",normalize:rawNorm,tokens,hasToken,phrase,analyze,performance,lowConcept};
console.log("[ANITA v24.0] Safe Language Parser loaded");
})();
