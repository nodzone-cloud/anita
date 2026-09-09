(function(W){
const S=W.ANITA50_STATE;
const C=()=>S.context;
const clean=s=>String(s||"").trim().replace(/[.!,;:]+$/,"").trim();
const low=s=>clean(s).toLowerCase();
const uniq=a=>[...new Set(a.filter(Boolean))];

function closeOldTopic(t){
 if(/\b(ok(?:ay)?|got it|i see|understood|anyway|anyways|back to|so anyway)\b/i.test(t)){
   C().topicClosed=true;
 }
}
function websiteOrderIntent(t){
 return /\b(i(?:'m| am) here for (?:a )?website|need (?:a )?website|want (?:a )?website|order (?:a )?website|ordering (?:a )?website|website for my|website for our|how (?:do|can) i (?:order|get) (?:a )?website|i meant ordering)\b/i.test(t);
}
function itIntent(t){return /\b(windows|computer|pc|printer|wifi|wi-fi|router|driver|outlook|scanner|bluetooth|usb|it problem|tech problem)\b/i.test(t);}
function guideIntent(t){return /\b(guide me|show me|take me to|where (?:is|are)|find .* on (?:the )?site|navigate)\b/i.test(t);}

function businessFrom(t){
 let m=t.match(/\b(?:i have|i run|i own|my business is|website (?:is )?for|site (?:is )?for)\s+(?:a|an|my|our)?\s*([^,.!?;]+)/i);
 if(!m)return null;
 let b=clean(m[1]).replace(/\b(?:business|company)\b$/i,"").trim();
 return b||null;
}
function normalizedBusiness(b){
 b=clean(b);
 return b.replace(/^my\s+/i,"").replace(/^our\s+/i,"");
}
function extractFeatures(t){
 const x=low(t), f=[];
 const rules=[
  ["gallery",/\b(gallery|photo gallery|photos)\b/],
  ["booking",/\b(book|booking|appointment|calendar|reserve|checkup)\b/],
  ["fast contact",/\b(fast contact|quick contact|contact button|call button|whatsapp)\b/],
  ["prices",/\b(price list|prices|pricing)\b/],
  ["map",/\b(map|location map|where .* located)\b/],
  ["portfolio",/\b(portfolio|our work|projects)\b/],
  ["video",/\b(video|videos)\b/],
  ["online sales",/\b(buy|sell|sale online|online sale|online shop|webshop|e-?commerce|products? online|spare ?parts? sale)\b/],
  ["services",/\b(services?|what we do)\b/],
  ["about",/\b(about us|about)\b/],
  ["why choose us",/\b(why choose us|why us)\b/],
  ["contacts",/\b(contacts?|contact us)\b/]
 ];
 rules.forEach(([n,r])=>{if(r.test(x))f.push(n)});
 return uniq(f);
}
function extractGoals(t){
 const x=low(t), g=[];
 if(/\b(get|find|see|read).*(information|info)\b/.test(x))g.push("get information");
 if(/\b(book|booking|appointment|calendar|reserve|checkup)\b/.test(x))g.push("book appointments");
 if(/\b(buy|sell|sale online|online shop|webshop|e-?commerce|products? online|spare ?parts?)\b/.test(x))g.push("buy products online");
 if(/\b(price|pricing)\b/.test(x))g.push("view prices");
 if(/\b(contact|call|email|message)\b/.test(x))g.push("contact the business");
 return uniq(g);
}
function sizeFrom(t){
 const x=low(t);
 if(/\b(one|single).*(page|landing)|landing page\b/.test(x))return "one landing page";
 if(/\b(few|several|separate|multiple).*(page|pages)\b/.test(x))return "a few separate pages";
 if(/\b(multi-page|multipage|larger site|large website)\b/.test(x))return "a larger multi-page site";
 return null;
}
function structureFor(b){
 const f=b.features||[], out=["Home"];
 if(f.includes("services"))out.push("Services");
 if(f.includes("booking"))out.push("Booking");
 if(f.includes("online sales"))out.push("Shop / Products");
 if(f.includes("portfolio"))out.push("Portfolio");
 if(f.includes("about")||f.includes("why choose us"))out.push("About / Why Us");
 if(f.includes("contacts")||f.includes("map")||f.includes("fast contact"))out.push("Contact");
 if(out.length===1)out.push("Services","About / Contact");
 return uniq(out);
}
function recommendation(b){
 const f=b.features||[];
 const complex=f.includes("booking")||f.includes("online sales");
 if(complex){
   return {package:null,needsReview:true,text:"Your project includes functions such as "+f.filter(x=>["booking","online sales"].includes(x)).join(" and ")+". Because these may require integrations, I wouldn't confirm a fixed package yet. Alex should review the exact scope and price."};
 }
 if(b.size==="one landing page")return {package:"START (250 €)",needsReview:false};
 if(b.size==="a few separate pages")return {package:"LIGHT (450 €)",needsReview:false};
 if(b.size==="a larger multi-page site")return {package:"MEDIUM (620 €)",needsReview:false};
 return {package:null,needsReview:false};
}
function remember(t){
 const c=C(), b=c.websiteBrief;
 const bus=businessFrom(t);
 if(bus){const n=normalizedBusiness(bus);c.clientMemory.business=n;c.clientMemory.businessRaw=null;b.business=n;}
 b.features=uniq([...(b.features||[]),...extractFeatures(t)]);
 b.goals=uniq([...(b.goals||[]),...extractGoals(t)]);
 const sz=sizeFrom(t); if(sz)b.size=sz;
 b.structure=structureFor(b);
 const r=recommendation(b);b.package=r.package;b.needsReview=r.needsReview;
 S.save(); return r;
}
function perspectiveBusiness(){
 const b=C().clientMemory.business||C().websiteBrief.business;
 return b?`So the website is for your ${b}.`:"";
}
function websiteSecretary(t){
 const c=C(), b=c.websiteBrief;
 c.role="secretary";c.topic="website_order";c.topicClosed=false;
 const r=remember(t);
 if(!b.business){
   S.save();
   return {handled:true,text:"Absolutely 😊 Let's understand your project before choosing a package. What kind of business is the website for?"};
 }
 const newF=extractFeatures(t), newG=extractGoals(t);
 if(newF.length||newG.length){
   if(!b.size){
    S.save();return {handled:true,text:`Got it 😊 I've noted ${uniq([...newG,...newF]).join(", ")}. Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?`};
   }
 }
 if(!b.goals.length){
   S.save();return {handled:true,text:`Got it 😊 ${perspectiveBusiness()} What should visitors mainly do on the website — get information, contact you, book, view prices, buy products, or something else?`};
 }
 if(!b.size){
   S.save();return {handled:true,text:"Got it 😊 I've noted that. Roughly how large should the site be: one landing page, a few separate pages, or a larger multi-page site?"};
 }
 b.structure=structureFor(b);
 if(r.needsReview){
   c.pendingAction="prepare_project_summary";S.save();
   return {handled:true,text:`Based on what you've told me, I'd suggest: ${b.structure.join(" → ")}. ${r.text} I can prepare a short project summary for Alex when you're ready.`};
 }
 if(r.package){
   c.pendingAction="prepare_project_summary";S.save();
   return {handled:true,text:`Based on what you've told me, I'd suggest: ${b.structure.join(" → ")}. The closest package is ${r.package}. Alex can confirm the exact scope after reviewing the project.`};
 }
 S.save();return {handled:true,text:"Thanks 😊 I've saved those project details. Tell me anything else you'd like the website to include."};
}
function summary(){
 const b=C().websiteBrief;
 return `Project summary for Alex 😊 Business: ${b.business||"not specified"}. Website goals: ${(b.goals||[]).join(", ")||"not specified"}. Features: ${(b.features||[]).join(", ")||"not specified"}. Website size: ${b.size||"not specified"}. Suggested structure: ${(b.structure||[]).join(" → ")||"to be reviewed"}. ${b.needsReview?"Package and price: Alex review required because the project includes functional integrations.":b.package?`Recommended package: ${b.package}.`:"Package: to be reviewed."}`;
}
function handle(t){
 t=String(t||"").trim(); if(!t)return {handled:false};
 closeOldTopic(t);
 const c=C();
 if(/\b(yes|yes please|please do|go ahead|do that|prepare it)\b/i.test(t)&&c.pendingAction==="prepare_project_summary"){
   c.pendingAction=null;S.save();return {handled:true,text:summary()};
 }
 if(/\b(what do you remember|project summary|summar(?:y|ize) my|prepare .*summary)\b/i.test(t)){
   return {handled:true,text:summary()};
 }
 if(websiteOrderIntent(t)||c.role==="secretary"&&c.topic==="website_order")return websiteSecretary(t);
 if(itIntent(t)){c.role="it";c.topic="it";c.topicClosed=false;S.save();return {handled:false};}
 if(guideIntent(t)){c.role="guide";c.topic="guide";c.topicClosed=false;S.save();return {handled:false};}
 return {handled:false};
}
W.ANITA50_ROLES={handle,remember,summary};
})(window);