const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const A='assets/audio/';const R={intro:'intro.m4a',services:'reply01.m4a',prices:'reply02.m4a',contact:'reply03.m4a',about:'reply04.m4a',catalog:'reply06.m4a',detail:'reply07.m4a',priceQuestion:'reply08.m4a',home:'reply09.m4a'};
function play(k){let f=R[k]||k;if(!f)return Promise.resolve();let a=new Audio(A+f);a.volume=1;return a.play()}
function go(dest,response){sessionStorage.setItem('motorVoiceReply',response||'');location.href=dest}
function handle(raw){let t=raw.toLowerCase().replace(/ё/g,'е');document.querySelector('.heard').textContent='Вы: «'+raw+'»';if(/главн|домой|начал/.test(t))return go('index.html','home');if(/услуг|сервис|ремонт|что вы делаете/.test(t))return go('services.html','services');if(/цен|стоим|сколько|прайс/.test(t))return go('prices.html',/сколько|стоим/.test(t)?'priceQuestion':'prices');if(/контакт|связ|телефон|позвон|адрес/.test(t))return go('contact.html','contact');if(/о компании|о вас|кто вы|компан/.test(t))return go('about.html','about');if(/вариант|каталог|выбор|предлож/.test(t))return go('catalog.html','catalog');if(/подроб|детал|об этой услуге/.test(t))return go('service-detail.html','detail');document.querySelector('.status').textContent='Попробуйте другую команду'}
let introDone=false;
function voiceDebug(msg){
 let d=document.getElementById('voice-debug');
 if(!d){d=document.createElement('div');d.id='voice-debug';d.style.cssText='position:fixed;left:10px;bottom:10px;z-index:2147483647;background:#111;color:#fff;padding:10px 12px;border:1px solid #ff7a00;border-radius:8px;font:12px/1.35 monospace;max-width:90vw';document.body.appendChild(d)}
 d.textContent=msg;
}
function markVoiceEnabled(){sessionStorage.setItem('motorVoiceEnabled','1')}
function tryIntro(){
  if(introDone||sessionStorage.getItem('motorIntroPlayed')) return;
  play('intro').then(()=>{
    introDone=true;
    markVoiceEnabled();
    sessionStorage.setItem('motorIntroPlayed','1');
    removeIntroUnlock();
  }).catch(()=>{});
}
function unlockIntro(){
  voiceDebug('TOUCH ✓ · проверяю intro.m4a…');
  if(introDone||sessionStorage.getItem('motorIntroPlayed')){voiceDebug('TOUCH ✓ · INTRO уже отмечено как played');return;}
  const url=A+R.intro;
  const a=new Audio(url);
  a.preload='auto';
  a.volume=1;
  a.play().then(()=>{
    voiceDebug('TOUCH ✓ · FILE ✓ · AUDIO PLAY ✓');
    introDone=true;
    markVoiceEnabled();
    sessionStorage.setItem('motorIntroPlayed','1');
    removeIntroUnlock();
  }).catch(err=>{
    const s=document.querySelector('.status');
    if(s) s.textContent='Коснитесь микрофона, чтобы включить голос';
    voiceDebug('TOUCH ✓ · AUDIO BLOCKED: '+(err&&err.name?err.name:'unknown'));
    console.log('Intro playback blocked',err);
  });
}
function removeIntroUnlock(){
  ['pointerup','touchend','click','keydown'].forEach(ev=>document.removeEventListener(ev,unlockIntro,true));window.removeEventListener('wheel',unlockIntro,true);
}
function armIntroUnlock(){
  ['pointerup','touchend','click','keydown'].forEach(ev=>document.addEventListener(ev,unlockIntro,true));
  window.addEventListener('wheel',unlockIntro,{capture:true,passive:true});
}
function init(){let b=document.querySelector('.mic'),s=document.querySelector('.status');if(!SR){s.textContent='Откройте сайт в Chrome для голосового управления';b.disabled=true;return}let r=new SR();r.lang='ru-RU';r.interimResults=false;r.continuous=false;r.onstart=()=>s.textContent='Слушаю…';r.onend=()=>{if(s.textContent==='Слушаю…')s.textContent='Нажмите микрофон и говорите'};r.onerror=()=>s.textContent='Не удалось распознать. Попробуйте ещё раз.';r.onresult=e=>{s.textContent='Команда распознана';handle(e.results[0][0].transcript)};b.onclick=()=>{unlockIntro();try{r.start()}catch(e){}}}
addEventListener('DOMContentLoaded',()=>{
  init();
  voiceDebug('VOICE DEBUG READY · ждём касание');
  armIntroUnlock();
  setTimeout(tryIntro,500);
  let k=sessionStorage.getItem('motorVoiceReply');
  if(k){
    sessionStorage.removeItem('motorVoiceReply');
    if(sessionStorage.getItem('motorVoiceEnabled')) setTimeout(()=>play(k).catch(()=>{}),350);
  }
});