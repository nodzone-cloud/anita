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
function play(k){let f=R[k]||k;if(!f)return Promise.resolve();let a=new Audio(A+f);a.volume=1;return a.play()}
function go(dest,response){sessionStorage.setItem('motorVoiceReply',response||'');location.href=dest}
function handle(raw){
 let t=raw.toLowerCase().replace(/ё/g,'е'),h=document.querySelector('.heard');if(h)h.textContent='Вы: «'+raw+'»';
 if(/спасибо|благодар/.test(t))return play('thanks');
 if(/запис|запись|записаться/.test(t))return go('contact.html','booking');
 if(/диагност/.test(t))return go('service-detail.html','diagnostics');
 if(/двигател|мотор/.test(t)&&/ремонт|почин|чин/.test(t))return go('service-detail.html','engine');
 if(/масл/.test(t))return go('service-detail.html','oil');
 if(/шин|колес/.test(t))return go('service-detail.html','tires');
 if(/часы|время работ|когда открыт|режим работ/.test(t))return go('contact.html','hours');
 if(/адрес|где наход|как доехать|маршрут/.test(t))return go('contact.html','address');
 if(/телефон|позвон|номер/.test(t))return go('contact.html','phone');
 if(/главн|домой|начал/.test(t))return go('index.html','home');
 if(/услуг|сервис|что вы делаете/.test(t))return go('services.html','services');
 if(/сколько|стоимост/.test(t))return go('prices.html','priceQuestion');
 if(/цен|прайс/.test(t))return go('prices.html','prices');
 if(/контакт|связ/.test(t))return go('contact.html','contact');
 if(/о компании|о вас|кто вы|компан/.test(t))return go('about.html','about');
 if(/вариант|каталог|выбор|предлож/.test(t))return go('catalog.html','catalog');
 if(/подроб|детал|об этой услуге/.test(t))return go('service-detail.html','detail');
 let s=document.querySelector('.status');if(s)s.textContent='Попробуйте сказать по-другому';play('unknown').catch(()=>{});
}
let introDone=false;
function markVoiceEnabled(){sessionStorage.setItem('motorVoiceEnabled','1')}
function finishIntro(){introDone=true;markVoiceEnabled();sessionStorage.setItem('motorIntroPlayed','1');removeIntroUnlock()}
function tryIntro(){if(introDone||sessionStorage.getItem('motorIntroPlayed'))return;play('intro').then(finishIntro).catch(()=>{})}
function unlockIntro(){
 if(introDone||sessionStorage.getItem('motorIntroPlayed'))return;
 let a=new Audio(A+R.intro);a.preload='auto';a.volume=1;a.play().then(finishIntro).catch(()=>{let s=document.querySelector('.status');if(s)s.textContent='Коснитесь микрофона, чтобы включить голос'});
}
function removeIntroUnlock(){['pointerup','touchend','click','keydown'].forEach(ev=>document.removeEventListener(ev,unlockIntro,true));window.removeEventListener('wheel',unlockIntro,true)}
function armIntroUnlock(){['pointerup','touchend','click','keydown'].forEach(ev=>document.addEventListener(ev,unlockIntro,true));window.addEventListener('wheel',unlockIntro,{capture:true,passive:true})}
function init(){
 let b=document.querySelector('.mic'),s=document.querySelector('.status');if(!SR){s.textContent='Откройте сайт в Chrome для голосового управления';b.disabled=true;return}
 let r=new SR();r.lang='ru-RU';r.interimResults=false;r.continuous=false;
 r.onstart=()=>s.textContent='Слушаю…';r.onend=()=>{if(s.textContent==='Слушаю…')s.textContent='Нажмите микрофон и говорите'};
 r.onerror=()=>{s.textContent='Не удалось распознать. Попробуйте ещё раз.';play('notfound').catch(()=>{})};
 r.onresult=e=>{s.textContent='Команда распознана';handle(e.results[0][0].transcript)};
 b.onclick=()=>{unlockIntro();try{r.start()}catch(e){}}
}
addEventListener('DOMContentLoaded',()=>{init();armIntroUnlock();setTimeout(tryIntro,500);let k=sessionStorage.getItem('motorVoiceReply');if(k){sessionStorage.removeItem('motorVoiceReply');if(sessionStorage.getItem('motorVoiceEnabled'))setTimeout(()=>play(k).catch(()=>{}),350)}});
