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
function hasAny(t,list){return list.some(x=>typeof x==='string'?t.includes(x):x.test(t))}
function handle(raw){
 let t=raw.toLowerCase().replace(/ё/g,'е').replace(/[?!.,]/g,' ').replace(/\s+/g,' ').trim();
 let h=document.querySelector('.heard');if(h)h.textContent='Вы: «'+raw+'»';

 if(hasAny(t,[/^что$/, /^чего$/, 'повтори','повторите','скажи еще раз','еще раз','не услышал','не расслышал','что ты сказал','что ты говоришь','можешь повторить','можете повторить'])) return repeatLastReply();

 if(hasAny(t,[/(позвон|звон).*(ватсап|вацап|вотсап|whatsapp)/,/(ватсап|вацап|вотсап|whatsapp).*(позвон|звон)/])) return callWhatsApp();
 if(hasAny(t,['позвони','позвонить','набери номер','набрать номер','набери телефон','сделай звонок','хочу позвонить'])) return callPhone();

 if(hasAny(t,[
   'с кем связаться','с кем можно связаться','как с вами связаться','как связаться','хочу связаться',
   'кому написать','куда написать','кому позвонить','куда позвонить',
   'у кого заказать','где заказать','как заказать','хочу заказать','можно заказать',
   'заказать сайт','заказать услугу','заказать услуги','мне нужен сайт','мне нужна услуга',
   'к кому обратиться','куда обратиться','с кем поговорить','как вас найти'
 ])) return go('contact.html','contact');

 if(hasAny(t,['хочу записаться','можно записаться','запиши меня','запись на','записаться'])) return go('contact.html','booking');
 if(hasAny(t,['где вы','где находитесь','ваш адрес','как доехать','как вас найти','маршрут'])) return go('contact.html','address');
 if(hasAny(t,['когда вы работаете','во сколько открываетесь','во сколько закрываетесь','режим работы','часы работы'])) return go('contact.html','hours');
 if(hasAny(t,['какой у вас номер','номер телефона','покажи телефон','ваш телефон'])) return go('contact.html','phone');

 if(hasAny(t,['сколько стоит','во сколько обойдется','во сколько обойдётся','какая стоимость','сколько это стоит','сколько будет стоить','почем','почём'])) return go('prices.html','priceQuestion');
 if(hasAny(t,['покажи цены','открой цены','цены','прайс','тарифы'])) return go('prices.html','prices');

 if(hasAny(t,['что вы делаете','чем занимаетесь','что можете сделать','что предлагаете','какие есть услуги','что у вас есть','чем можете помочь','покажи услуги','открой услуги'])) return go('services.html','services');
 if(hasAny(t,['диагностика','проверить машину','проверить автомобиль','найти неисправность'])) return go('service-detail.html','diagnostics');
 if(hasAny(t,[/(ремонт|почин).*(двигател|мотор)/,/(двигател|мотор).*(ремонт|почин)/])) return go('service-detail.html','engine');
 if(hasAny(t,['замена масла','поменять масло','сменить масло'])) return go('service-detail.html','oil');
 if(hasAny(t,['шины','шиномонтаж','поменять колеса','поменять колёса'])) return go('service-detail.html','tires');

 if(hasAny(t,['кто вы','расскажи о вас','расскажите о вас','расскажи о компании','о компании','чем известны'])) return go('about.html','about');
 if(hasAny(t,['что можно выбрать','какие варианты','покажи варианты','покажи каталог','что есть в каталоге'])) return go('catalog.html','catalog');
 if(hasAny(t,['расскажи подробнее','покажи подробнее','подробнее об услуге','что входит'])) return go('service-detail.html','detail');
 if(hasAny(t,['на главную','вернись назад','вернуться на главную','в начало','домой'])) return go('index.html','home');

 const presentation=hasAny(t,['сейчас покажу сайт','смотри как это работает','смотри как работает сайт','давай покажу сайт','покажу презентацию','давай покажем презентацию']);
 if(presentation){attentiveUntil=Date.now()+20000;return;}
 // Любую другую речь игнорируем: никаких случайных переходов.
}
let introDone=false,introPlaying=false,continuousVoice=false,recognizer=null,attentiveUntil=0,isSpeaking=false;
function markVoiceEnabled(){sessionStorage.setItem('motorVoiceEnabled','1')}
function finishIntro(){introDone=true;introPlaying=false;markVoiceEnabled()}
function playIntroOnce(){
 if(introDone||introPlaying)return;
 introPlaying=true;
 play('intro').then(()=>{finishIntro()}).catch(()=>{introPlaying=false});
}
function compactVoiceUI(){
 let v=document.querySelector('.voice');if(v){v.style.width='auto';v.style.maxWidth='none';v.style.padding='8px 12px';v.style.left='auto';v.style.right='12px';v.style.bottom='12px';v.style.borderRadius='999px';let hints=v.querySelector('.hints');if(hints)hints.style.display='none';let heard=v.querySelector('.heard');if(heard)heard.style.display='none';let s=v.querySelector('.status');if(s){s.textContent='●';s.style.color='#35d06f';s.style.fontSize='22px';s.title='Голосовая навигация активна';}let b=v.querySelector('.mic');if(b)b.style.display='none';}
}
function startListening(){
 if(!recognizer||!continuousVoice||isSpeaking)return;
 try{recognizer.start()}catch(e){}
}
function showVoiceStart(){
 let o=document.createElement('div');o.id='voice-start';o.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(5,7,12,.82);display:flex;align-items:center;justify-content:center;padding:24px';
 o.innerHTML='<div style="max-width:440px;background:#11151d;border:1px solid #ff7a00;border-radius:20px;padding:28px;text-align:center;color:#fff;box-shadow:0 20px 60px #000"><div style="font-size:42px;margin-bottom:10px">🎙️</div><h2 style="margin:0 0 10px">Используйте навигацию голосом</h2><p style="margin:0 0 20px;color:#c7cbd1;line-height:1.5">Нажмите микрофон один раз, чтобы управлять сайтом голосом. После этого можно просто говорить команды.</p><button id="voice-start-btn" style="border:0;border-radius:999px;padding:14px 22px;font-weight:700;cursor:pointer">🎙 Включить микрофон</button></div>';
 document.body.appendChild(o);
 o.querySelector('#voice-start-btn').onclick=()=>{
   const btn=o.querySelector('#voice-start-btn');if(btn.disabled)return;btn.disabled=true;
   continuousVoice=true;markVoiceEnabled();o.remove();compactVoiceUI();
   playIntroOnce();
 };
}
function init(){
 let b=document.querySelector('.mic'),s=document.querySelector('.status');if(!SR){s.textContent='Откройте сайт в Chrome для голосового управления';b.disabled=true;return}
 let r=new SR();recognizer=r;r.lang='ru-RU';r.interimResults=false;r.continuous=false;
 r.onstart=()=>{s.textContent='●';s.style.color='#35d06f';s.title='Голосовая навигация активна'};
 r.onend=()=>{if(continuousVoice&&!isSpeaking){s.textContent='●';s.style.color='#35d06f';s.title='Голосовая навигация активна';setTimeout(startListening,300)}else if(!continuousVoice&&s.textContent==='Слушаю…')s.textContent='Нажмите микрофон и говорите'};
 r.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed'){continuousVoice=false;s.textContent='●';s.style.color='#e5484d';s.title='Голосовая навигация недоступна'}else{s.textContent='●';s.style.color='#e5484d';s.title='Ошибка распознавания — переподключение';setTimeout(()=>{if(continuousVoice&&!isSpeaking){s.style.color='#35d06f';s.title='Голосовая навигация активна'}},800);if(e.error==='no-speech'){/* silence: keep listening without speaking */}}};
 r.onresult=e=>{let heard=e.results[0][0].transcript;s.textContent='Распознано: «'+heard+'»';setTimeout(()=>handle(heard),80)};
 b.onclick=()=>{continuousVoice=true;markVoiceEnabled();unlockIntro();compactVoiceUI();startListening()}
 if(sessionStorage.getItem('motorResumeVoice')){sessionStorage.removeItem('motorResumeVoice');continuousVoice=true;compactVoiceUI();}else{showVoiceStart();}
}
addEventListener('DOMContentLoaded',()=>{sessionStorage.removeItem('motorIntroPlayed');init();let k=sessionStorage.getItem('motorVoiceReply');if(k){sessionStorage.removeItem('motorVoiceReply');setTimeout(()=>play(k).catch(()=>{}),150)}});
