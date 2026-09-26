const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const A='assets/audio/';
const R={
 intro:'01_intro.mp3?v=8',services:'02_uslugi.mp3?v=8',prices:'03_ceny.mp3?v=8',
 contact:'04_kontakty.mp3?v=8',about:'05_o_nas.mp3?v=8',catalog:'06_varianty.mp3?v=8',
 detail:'07_podrobnosti.mp3?v=8',priceQuestion:'08_cena_chego.mp3?v=8',home:'09_glavnaya.mp3?v=8',
 booking:'10_zapis.mp3?v=8',diagnostics:'11_diagnostika.mp3?v=8',engine:'12_remont_dvigatelya.mp3?v=8',
 oil:'13_menyaem.mp3?v=8',tires:'14_shiny.mp3?v=8',hours:'15_chasy.mp3?v=8',
 address:'16_adres.mp3?v=8',phone:'17_telefon.mp3?v=8',unknown:'18_ne_ponyal.mp3?v=8',
 notfound:'19_ne_nashli.mp3?v=8',thanks:'20_rad_pomoch.mp3?v=8'
};
function play(k){
 let f=R[k]||k;if(!f)return Promise.resolve();if(R[k])sessionStorage.setItem('motorLastReply',k);
 isSpeaking=true;
 if(recognizer){try{recognizer.abort()}catch(e){}}
 let a=new Audio(A+f);a.volume=1;
 return new Promise((resolve,reject)=>{
   a.onended=()=>{isSpeaking=false;if(continuousVoice)setTimeout(startListening,300);resolve()};
   a.onerror=e=>{isSpeaking=false;if(continuousVoice)setTimeout(startListening,300);reject(e)};
   a.play().catch(e=>{isSpeaking=false;if(continuousVoice)setTimeout(startListening,300);reject(e)});
 });
}
function repeatLastReply(){let k=sessionStorage.getItem('motorLastReply');if(k)return play(k);}
function go(dest,response){continuousVoice=false;sessionStorage.setItem('motorVoiceReply',response||'');sessionStorage.setItem('motorResumeVoice','1');window.location.assign(dest)}
function callPhone(){continuousVoice=false;window.location.href='tel:+358458525293'}
function callWhatsApp(){continuousVoice=false;window.location.href='https://wa.me/358458525293'}
function handle(raw){
 let t=raw.toLowerCase().replace(/ё/g,'е').trim(),h=document.querySelector('.heard');if(h)h.textContent='Вы: «'+raw+'»';
 const now=Date.now();
 const repeat=/^(что|чего)[?!. ]*$|повтори|повторите|скажи еще раз|скажи ещё раз|еще раз|ещё раз|не услышал|не услышала|не расслышал|не расслышала|что ты сказал|что ты сказала|что ты говоришь|что вы сказали|можешь повторить|можете повторить/.test(t);
 if(repeat){return repeatLastReply();}
 const presentation=/(сейчас|щас|давай|смотри|посмотри|покажу|покажем).*(сайт|презентац|как.*работ)|(сайт|презентац).*(покажу|покажем|смотри|работ)/.test(t);
 if(presentation){attentiveUntil=now+20000;let s=document.querySelector('.status');if(s)s.textContent='🎙 Голосовая навигация готова';return;}
 const attentive=now<attentiveUntil;
 const direct=/(покажи|открой|найди|перейди|верни|позвон|набери|запиш|сколько|какие|где|как связ|контакт|цены|прайс|услуги|телефон|номер|адрес|диагност|ремонт|масл|шин|часы|главн|каталог|вариант)/.test(t);
 if(!direct&&!attentive)return;
 if(/(позвон|звон).*(ватсап|вацап|вотсап)|(ватсап|вацап|вотсап).*(позвон|звон)/.test(t))return callWhatsApp();
 if(/позвон|позвонить|звонить|звонок|набери номер|набрать номер|набери телефон|позвони на телефон|позвонить на телефон|позвони по телефону|позвонить по телефону/.test(t))return callPhone();
 if(/запис|запись|записаться/.test(t))return go('contact.html','booking');
 if(/диагност/.test(t))return go('service-detail.html','diagnostics');
 if(/двигател|мотор/.test(t)&&/ремонт|почин|чин/.test(t))return go('service-detail.html','engine');
 if(/масл/.test(t))return go('service-detail.html','oil');
 if(/шин|колес/.test(t))return go('service-detail.html','tires');
 if(/часы|время работ|когда открыт|режим работ/.test(t))return go('contact.html','hours');
 if(/адрес|где наход|как доехать|маршрут/.test(t))return go('contact.html','address');
 if(/телефон|номер/.test(t))return go('contact.html','phone');
 if(/главн|домой|начал/.test(t))return go('index.html','home');
 if(/услуг|сервис|что вы делаете/.test(t))return go('services.html','services');
 if(/сколько|стоимост/.test(t))return go('prices.html','priceQuestion');
 if(/цен|прайс/.test(t))return go('prices.html','prices');
 if(/контакт|связ/.test(t))return go('contact.html','contact');
 if(/о компании|о вас|кто вы|компан/.test(t))return go('about.html','about');
 if(/вариант|каталог|выбор|предлож/.test(t))return go('catalog.html','catalog');
 if(/подроб|детал|об этой услуге/.test(t))return go('service-detail.html','detail');
}
let introDone=false,continuousVoice=false,recognizer=null,attentiveUntil=0,isSpeaking=false;
function markVoiceEnabled(){sessionStorage.setItem('motorVoiceEnabled','1')}
function finishIntro(){introDone=true;markVoiceEnabled();sessionStorage.setItem('motorIntroPlayed','1');removeIntroUnlock()}
function tryIntro(){if(introDone||sessionStorage.getItem('motorIntroPlayed'))return;play('intro').then(finishIntro).catch(()=>{})}
function unlockIntro(){
 if(introDone||sessionStorage.getItem('motorIntroPlayed'))return;
 let a=new Audio(A+R.intro);a.preload='auto';a.volume=1;a.play().then(finishIntro).catch(()=>{let s=document.querySelector('.status');if(s)s.textContent='Коснитесь микрофона, чтобы включить голос'});
}
function removeIntroUnlock(){['pointerup','touchend','click','keydown'].forEach(ev=>document.removeEventListener(ev,unlockIntro,true));window.removeEventListener('wheel',unlockIntro,true)}
function armIntroUnlock(){['pointerup','touchend','click','keydown'].forEach(ev=>document.addEventListener(ev,unlockIntro,true));window.addEventListener('wheel',unlockIntro,{capture:true,passive:true})}
function compactVoiceUI(){
 let v=document.querySelector('.voice');if(v){v.style.width='auto';v.style.maxWidth='none';v.style.padding='8px 12px';v.style.left='auto';v.style.right='12px';v.style.bottom='12px';v.style.borderRadius='999px';let hints=v.querySelector('.hints');if(hints)hints.style.display='none';let heard=v.querySelector('.heard');if(heard)heard.style.display='none';let s=v.querySelector('.status');if(s)s.textContent='🎙 Голосовая навигация включена';let b=v.querySelector('.mic');if(b)b.style.display='none';}
}
function startListening(){
 if(!recognizer||!continuousVoice||isSpeaking)return;
 try{recognizer.start()}catch(e){}
}
function showVoiceStart(){
 let o=document.createElement('div');o.id='voice-start';o.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(5,7,12,.82);display:flex;align-items:center;justify-content:center;padding:24px';
 o.innerHTML='<div style="max-width:440px;background:#11151d;border:1px solid #ff7a00;border-radius:20px;padding:28px;text-align:center;color:#fff;box-shadow:0 20px 60px #000"><div style="font-size:42px;margin-bottom:10px">🎙️</div><h2 style="margin:0 0 10px">Используйте навигацию голосом</h2><p style="margin:0 0 20px;color:#c7cbd1;line-height:1.5">Нажмите микрофон один раз, чтобы управлять сайтом голосом. После этого можно просто говорить команды.</p><button id="voice-start-btn" style="border:0;border-radius:999px;padding:14px 22px;font-weight:700;cursor:pointer">🎙 Включить микрофон</button></div>';
 document.body.appendChild(o);
 o.querySelector('#voice-start-btn').onclick=()=>{continuousVoice=true;markVoiceEnabled();unlockIntro();o.remove();compactVoiceUI();setTimeout(startListening,250)};
}
function init(){
 let b=document.querySelector('.mic'),s=document.querySelector('.status');if(!SR){s.textContent='Откройте сайт в Chrome для голосового управления';b.disabled=true;return}
 let r=new SR();recognizer=r;r.lang='ru-RU';r.interimResults=false;r.continuous=false;
 r.onstart=()=>s.textContent='🎙 Голосовая навигация включена';
 r.onend=()=>{if(continuousVoice&&!isSpeaking){s.textContent='🎙 Голосовая навигация включена';setTimeout(startListening,300)}else if(!continuousVoice&&s.textContent==='Слушаю…')s.textContent='Нажмите микрофон и говорите'};
 r.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed'){continuousVoice=false;s.textContent='Разрешите доступ к микрофону'}else{s.textContent='Не расслышал. Слушаю дальше…';if(e.error==='no-speech')play('notfound').catch(()=>{})}};
 r.onresult=e=>{let heard=e.results[0][0].transcript;s.textContent='Распознано: «'+heard+'»';setTimeout(()=>handle(heard),80)};
 b.onclick=()=>{continuousVoice=true;markVoiceEnabled();unlockIntro();compactVoiceUI();startListening()}
 if(sessionStorage.getItem('motorResumeVoice')){sessionStorage.removeItem('motorResumeVoice');continuousVoice=true;compactVoiceUI();setTimeout(startListening,700)}else{showVoiceStart();}
}
addEventListener('DOMContentLoaded',()=>{init();armIntroUnlock();setTimeout(tryIntro,500);let k=sessionStorage.getItem('motorVoiceReply');if(k){sessionStorage.removeItem('motorVoiceReply');if(sessionStorage.getItem('motorVoiceEnabled'))setTimeout(()=>play(k).catch(()=>{}),350)}});
