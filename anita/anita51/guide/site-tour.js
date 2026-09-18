/* ANITA 51 — autonomous multi-page Guide test. Isolated from Secretary/brief. */
(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{},KEY="anita51_tour_v1";
const pages=[
{id:"home",file:"index.html",title:"Home",text:"Welcome to the Alex Node guide test. This is the starting point."},
{id:"about",file:"about.html",title:"About",text:"This page explains Alex Node and the Human-Tech idea."},
{id:"services",file:"services.html",title:"Services",text:"Here you can see the kinds of website and IT services Alex Node offers."},
{id:"prices",file:"prices.html",title:"Prices",text:"Here are the website package prices and positioning."},
{id:"info",file:"info.html",title:"Info",text:"This is the final information page of the guide test."}
];
function read(){try{return JSON.parse(sessionStorage.getItem(KEY)||"null")}catch(_){return null}}
function write(v){try{sessionStorage.setItem(KEY,JSON.stringify(v))}catch(_){}}
function clear(){try{sessionStorage.removeItem(KEY)}catch(_){}}
function current(){return document.body&&document.body.dataset.guidePage||"home"}
function url(file){return new URL(file,location.href).href}
function bubble(){return document.getElementById("an50-bubble")}
function choice(label,fn){const b=document.createElement("button");b.type="button";b.textContent=label;b.onclick=fn;return b}
function controls(text,buttons){const b=bubble();if(!b)return;b.innerHTML="";const d=document.createElement("div");d.textContent=text;b.appendChild(d);if(buttons&&buttons.length){const box=document.createElement("div");box.className="anita51-tour-controls";buttons.forEach(x=>box.appendChild(x));b.appendChild(box)}b.classList.add("show")}
function pose(name){if(root.ANITA50&&root.ANITA50.ui){root.ANITA50.ui.mode(name==="hello"?"intro":"guide-intro");root.ANITA50.ui.pose(name)}}
function stop(){clear();controls("Tour stopped. I’ll stay here if you need me.");}
function go(i){write({active:true,index:i});location.href=url(pages[i].file)}
function begin(){write({active:true,index:0});pose("guide");controls("I’m ANITA — Alex Node IT Assistance, and I’ll be your guide. Let me show you around automatically.",[choice("Stop tour",stop)]);setTimeout(()=>go(1),5500)}
function welcome(){pose("hello");controls("Hi, I’m ANITA 😊 Would you like a quick guided tour of this site?",[choice("Yes, show me",begin),choice("No thanks",()=>{clear();controls("No problem 😊 Explore at your own pace. I’m here if you need me.");})])}
function resume(){const s=read();if(!s||!s.active)return welcome();let i=pages.findIndex(p=>p.id===current());if(i<0)i=s.index||0;write({active:true,index:i});pose("guide");const last=i>=pages.length-1;controls(pages[i].text,[choice(last?"Finish":"Stop tour",()=>{clear();controls(last?"That’s the end of the tour 😊 You can keep exploring or ask me anything.":"Tour stopped. I’ll stay here if you need me.")})]);if(!last)setTimeout(()=>{const now=read();if(now&&now.active)go(i+1)},6500);else clear()}
function boot(){if(!document.body||document.body.dataset.anita51Guide!=="1")return;setTimeout(resume,350)}
A.SiteTour={boot,welcome,begin,stop,pages};})(window);