const API = '';
let token = localStorage.getItem('ts_token');
let currentUser = null;
let socket = null;
let currentRoomId = null;
let mediaFilter = 'all';
let allMedia = [];

// ===== Reliable keyboard focus for every editor =====
// On some Windows/Electron installations the first click activates the app window
// but does not reliably hand keyboard focus to the clicked editor. A native file
// dialog happened to restore that focus, which is why Choose Files -> Cancel looked
// like a workaround. Force focus on the actual editable control instead.
function isEditableControl(el){
  return !!el && (el.matches?.('input:not([type="file"]):not([type="button"]):not([type="submit"]), textarea, select') || el.isContentEditable);
}
document.addEventListener('pointerdown', (event) => {
  const el = event.target?.closest?.('input:not([type="file"]):not([type="button"]):not([type="submit"]), textarea, select, [contenteditable="true"]');
  if (!el || el.disabled || el.readOnly) return;
  window.focus();
  setTimeout(() => {
    if (document.activeElement !== el) {
      try { el.focus({preventScroll:true}); } catch { try { el.focus(); } catch {} }
    }
  }, 0);
}, true);

// Do not let background localization work interfere with an editor while the user
// is entering text, including the short focus transition immediately after a click.
let editorFocusGuardUntil = 0;
document.addEventListener('focusin', (event) => {
  if (isEditableControl(event.target)) editorFocusGuardUntil = Date.now() + 1000;
}, true);
document.addEventListener('input', (event) => {
  if (isEditableControl(event.target)) editorFocusGuardUntil = Date.now() + 1000;
}, true);
let lastEditableControl=null;
['mousedown','pointerup','click'].forEach(evt=>document.addEventListener(evt,(event)=>{const el=event.target?.closest?.('input:not([type="file"]):not([type="button"]):not([type="submit"]), textarea, select, [contenteditable="true"]');if(!el||el.disabled||el.readOnly)return;lastEditableControl=el;editorFocusGuardUntil=Date.now()+1500;requestAnimationFrame(()=>{try{el.focus({preventScroll:true});}catch{try{el.focus()}catch{}}});},true));
window.addEventListener('focus',()=>{if(lastEditableControl&&document.body.contains(lastEditableControl)&&!lastEditableControl.disabled)setTimeout(()=>{try{lastEditableControl.focus({preventScroll:true})}catch{}},30);});

const roleLabels = { owner: 'Владелец / Главный администратор', technical_admin: 'Технический администратор / IT Support', admin: 'Администратор', member: 'Участник команды', support: 'Alex Node IT Support' };

function showAuthError(msg) {
  const el = document.getElementById('authError');
  el.textContent = msg;
  el.classList.add('show');
}
function hideAuthError() {
  document.getElementById('authError').classList.remove('show');
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAuthError();
  try {
    const res = await fetch(API + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('loginEmail').value.trim(),
        password: document.getElementById('loginPassword').value
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка входа');
    onAuthSuccess(data);
  } catch (err) {
    showAuthError(err.message);
  }
});

document.getElementById('completeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAuthError();
  try {
    const p1 = document.getElementById('compPassword').value;
    const p2 = document.getElementById('compPassword2').value;
    if (p1 !== p2) throw new Error('Пароли не совпадают');
    const res = await fetch(API + '/api/complete-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: document.getElementById('compName').value.trim(),
        email: document.getElementById('compEmail').value.trim(),
        password: p1
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка');
    onAuthSuccess(data);
  } catch (err) {
    showAuthError(err.message);
  }
});

function onAuthSuccess(data) {
  token = data.token;
  currentUser = data.user;
  localStorage.setItem('ts_token', token);
  localStorage.setItem('ts_user', JSON.stringify(currentUser));

  if (currentUser.must_complete_registration) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('authTabs').style.display = 'none';
    document.getElementById('completeForm').style.display = 'block';
    hideAuthError();
    return;
  }
  showApp();
}

function logout() {
  if (socket) socket.disconnect();
  token = null;
  currentUser = null;
  localStorage.removeItem('ts_token');
  localStorage.removeItem('ts_user');
  document.getElementById('app').classList.remove('show');
  document.getElementById('authScreen').style.display = 'flex';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('completeForm').style.display = 'none';
  document.getElementById('authTabs').style.display = 'flex';
}

async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API + path, { ...options, headers });
  if (res.status === 401) { logout(); throw new Error('Сессия истекла'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Ошибка');
  return data;
}

async function showApp() {
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('app').classList.add('show');
  document.getElementById('headerAvatar').textContent = currentUser.avatar || '?';
  document.getElementById('headerName').textContent = currentUser.name;
  document.getElementById('headerRole').textContent = roleLabels[currentUser.role] || currentUser.role;

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Доброе утро' : hour < 18 ? 'Добрый день' : 'Добрый вечер';
  document.getElementById('dashGreeting').textContent = `${greet}, ${currentUser.name.split(' ')[0]} 👋`;

  const isAdmin = ['owner', 'admin'].includes(currentUser.role);
  const isTechnical = currentUser.role === 'technical_admin';
  currentUser.language=currentUser.language||'ru';
  document.querySelectorAll('.admin-only').forEach(el => {
    el.classList.toggle('show', isAdmin); el.style.display = isAdmin ? 'block' : 'none';
  });
  // IT Support gets the technical management console, but not business-content admin buttons.
  if(isTechnical){ ['adminNavTitle','adminNav'].forEach(id=>{const el=document.getElementById(id);if(el){el.classList.add('show');el.style.display='block';}}); }

  connectSocket();
  loadNotifications();
  refreshChatUnread();
  openPage('dashboard');
  setTimeout(()=>applyLanguage(currentUser.language||'ru'),50);
}

function connectSocket() {
  if (socket) socket.disconnect();
  socket = io({ auth: { token } });
  socket.on('message:new', async (msg) => {
    const chatOpen = document.getElementById('chat')?.classList.contains('active');
    if (chatOpen && msg.room_id === currentRoomId) { appendMessage(msg); try{await api('/api/rooms/'+currentRoomId+'/read',{method:'POST'});}catch{} }
    refreshChatUnread();
  });
  socket.on('chat:activity', () => refreshChatUnread());
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (item.dataset.page) openPage(item.dataset.page);
  });
});

async function openPage(page) {
  // Pull live role/permissions from the LAN server before rendering a section.
  // This makes Owner role/permission changes take effect on another PC without reinstalling or signing in again.
  if (token) {
    try {
      const live = await api('/api/me');
      currentUser = live;
      localStorage.setItem('ts_user', JSON.stringify(currentUser));
      document.getElementById('headerRole').textContent = roleLabels[currentUser.role] || currentUser.role;
      // Development access: Technical Administrator must keep the Management section visible
      // after /api/me refreshes the live account on every page change.
      const isAdmin = ['owner','admin','technical_admin'].includes(currentUser.role);
      document.querySelectorAll('.admin-only').forEach(el=>{el.classList.toggle('show',isAdmin);el.style.display=isAdmin?'block':'none';});
    } catch(e) { return; }
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(page);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.page === page);
  });
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'dashboard') loadDashboard();
  if (page === 'onboarding') loadOnboarding();
  if (page === 'school') loadCourses();
  if (page === 'events') loadEvents();
  if (page === 'tasks') loadTasks();
  if (page === 'team') loadTeam();
  if (page === 'knowledge') loadKnowledge();
  if (page === 'media') loadMedia();
  if (page === 'chat') loadRooms();
  if (page === 'admin') loadAdminUsers();
  if (page === 'support') loadSupport();
  setTimeout(()=>applyLanguage(currentUser?.language||'ru'),120);
}

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
document.getElementById('menuButton').onclick = () => {
  sidebar.classList.add('open');
  overlay.classList.add('show');
};
overlay.onclick = closeSidebar;
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}
document.getElementById('logoutBtn').onclick = logout;

function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
function stopMediaInside(root) {
  if (!root) return;
  root.querySelectorAll('video,audio').forEach(media => {
    try { media.pause(); media.currentTime = 0; } catch (_) {}
  });
  root.querySelectorAll('iframe').forEach(frame => {
    try {
      // Removing the iframe source destroys the embedded player, so audio/video
      // cannot continue after its modal is closed.
      frame.src = 'about:blank';
    } catch (_) {}
  });
}
function hideModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  stopMediaInside(modal);
  modal.classList.remove('show');
}
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', function (e) {
    if (e.target === this) hideModal(this.id);
  });
});

async function loadDashboard() {
  try {
    const stats = await api('/api/stats');
    document.getElementById('statTeam').textContent = stats.team;
    document.getElementById('statMedia').textContent = stats.media || 0;
    document.getElementById('statTasks').textContent = stats.tasks;
    document.getElementById('statUrgent').textContent = stats.urgentTasks ? stats.urgentTasks + ' ' + t('важных') : t('открытых');
    document.getElementById('statEvents').textContent = stats.events;
    const events = await api('/api/events');
    const box = document.getElementById('dashEvents');
    if (!events.length) { box.innerHTML = `<div class="empty">${t('Нет мероприятий')}</div>`; } else { box.innerHTML = events.slice(0, 3).map(e => eventRow(e)).join(''); }
    await loadDashboardNews();
    return;
    box.innerHTML = events.slice(0, 3).map(e => eventRow(e)).join('');
    await loadDashboardNews();
  } catch (e) { console.error(e); }
}

function eventRow(e) {
  const d = new Date(e.date); const day=String(d.getDate()).padStart(2,'0');
  const locale=currentUser?.language==='fi'?'fi-FI':currentUser?.language==='en'?'en-GB':'ru-RU';
  const month=d.toLocaleString(locale,{month:'short'}).replace('.','').toUpperCase();
  const who=(e.participant_names||[]).length?(e.participant_names||[]).join(', '):t('Все');
  return `<div class="event" onclick="openEvent('${e.id}')" style="cursor:pointer"><div class="event-date">${day}<span>${month}</span></div><div class="event-info"><h4>${esc(e.title)}</h4><p>${esc(e.time||'')} · ${esc(e.location||'')}</p>${e.description?`<p class="event-description">${esc(e.description)}</p>`:''}<div class="event-participants">👥 ${esc(who)}</div></div></div>`;
}
async function fillEventParticipants(selected=[]){const users=await api('/api/team');const sel=document.getElementById('eventParticipants');const allSelected=!selected?.length||selected.includes('all');sel.innerHTML=`<option value="all" ${allSelected?'selected':''}>${t('Все')}</option>`+users.map(u=>`<option value="${u.id}" ${selected?.includes(u.id)?'selected':''}>${esc(u.name)}</option>`).join('');}
async function resetEventForm(e={}){document.getElementById('eventTitle').value=e.title||'';document.getElementById('eventDescription').value=e.description||'';document.getElementById('eventDate').value=e.date||'';document.getElementById('eventTime').value=e.time||'';document.getElementById('eventLocation').value=e.location||t('Онлайн');document.getElementById('eventModal').dataset.editId=e.id||'';document.querySelector('#eventModal h2').textContent=e.id?t('Редактировать мероприятие'):t('Мероприятие');await fillEventParticipants(e.participant_ids||['all']);}
async function showEventModal(){await resetEventForm();document.getElementById('eventModal').classList.add('show');applyLanguage(currentUser.language||'ru');}
async function loadEvents(){try{const events=await api('/api/events');const can=currentUser.role==='owner'||currentUser.role==='technical_admin'||currentUser.permissions?.manage_events;const btn=document.querySelector('#events .page-title button');if(btn){btn.classList.toggle('show',!!can);btn.style.display=can?'block':'none';}document.getElementById('eventsList').innerHTML=events.length?events.map(e=>eventRow(e)).join(''):`<div class="empty">${t('Нет мероприятий')}</div>`;applyLanguage(currentUser.language||'ru');}catch{document.getElementById('eventsList').innerHTML=`<div class="empty">${t('Ошибка')}</div>`;}}
async function createEvent(){try{const title=document.getElementById('eventTitle').value.trim();const date=document.getElementById('eventDate').value;if(!title||!date)return alert(t('Заполните название и дату'));let ids=Array.from(document.getElementById('eventParticipants').selectedOptions).map(o=>o.value);if(ids.includes('all')||!ids.length)ids=['all'];const id=document.getElementById('eventModal').dataset.editId;await api(id?'/api/events/'+id:'/api/events',{method:id?'PATCH':'POST',body:JSON.stringify({title,description:document.getElementById('eventDescription').value.trim(),participant_ids:ids,date,time:document.getElementById('eventTime').value.trim(),location:document.getElementById('eventLocation').value.trim()||t('Онлайн')})});hideModal('eventModal');await loadEvents();await loadDashboard();}catch(e){console.error('Event save failed',e);alert((t('Ошибка')||'Error')+': '+(e?.message||e));}}
async function openEvent(id){const events=await api('/api/events');const e=events.find(x=>x.id===id);if(!e)return;const can=currentUser.role==='owner'||currentUser.role==='technical_admin'||currentUser.permissions?.manage_events;if(!can)return;await resetEventForm(e);document.getElementById('eventModal').classList.add('show');const box=document.querySelector('#eventModal .modal-buttons');let b=box.querySelector('.event-delete');if(!b){b=document.createElement('button');b.className='btn btn-danger event-delete';b.onclick=()=>deleteEvent(id);box.prepend(b);}b.textContent=t('Удалить');applyLanguage(currentUser.language||'ru');}
async function deleteEvent(id){if(!confirm(t('Удалить мероприятие?')))return;await api('/api/events/'+id,{method:'DELETE'});hideModal('eventModal');loadEvents();loadDashboard();}


// ============ COURSES / SCHOOL ============
function canManageSchoolClient(){ return ['owner','technical_admin'].includes(currentUser?.role) || !!currentUser?.permissions?.manage_school; }
function showCourseModal(course={}){
  document.getElementById('courseTitle').value=course.title||'';
  document.getElementById('courseDesc').value=course.description||'';
  document.getElementById('courseContent').value=course.content||'';
  document.getElementById('courseLinks').value=(course.links||[]).join('\n');
  document.getElementById('courseFiles').value='';
  document.getElementById('courseModal').dataset.editId=course.id||'';
  document.querySelector('#courseModal h2').textContent=course.id?t('Редактировать курс'):t('Новый курс / учебный материал');
  document.getElementById('courseModal').classList.add('show');
  applyLanguage(currentUser?.language||'ru');
}
async function loadCourses(){
  const grid=document.getElementById('courseGrid');
  try{
    const courses=await api('/api/courses');
    const btn=document.querySelector('#school .page-title button'); const canSchool=canManageSchoolClient(); if(btn){btn.classList.toggle('show',!!canSchool);btn.style.display=canSchool?'block':'none';}
    grid.innerHTML=courses.length?courses.map(c=>`<div class="knowledge knowledge-clickable" onclick="openCourse('${c.id}')"><div class="knowledge-icon">🎓</div><h3>${esc(c.title)}</h3><p>${esc(c.description||'')}</p><div class="progress"><div class="progress-bar" style="width:${Number(c.progress)||0}%"></div></div><small>${t('Мой прогресс')}: ${Number(c.progress)||0}%</small></div>`).join(''):`<div class="empty">${t('Курсов пока нет. Админ может добавить.')}</div>`;
  }catch(e){console.error('Courses load failed',e);grid.innerHTML=`<div class="empty">${t('Ошибка')}</div>`;}
}
async function createCourse(){
  const title=document.getElementById('courseTitle').value.trim(); if(!title)return alert(t('Введите название'));
  const fd=new FormData(); fd.append('title',title);fd.append('description',document.getElementById('courseDesc').value.trim());fd.append('content',document.getElementById('courseContent').value.trim());fd.append('links',document.getElementById('courseLinks').value.trim());Array.from(document.getElementById('courseFiles').files||[]).forEach(f=>fd.append('attachments',f));
  const id=document.getElementById('courseModal').dataset.editId;
  try{await api(id?'/api/courses/'+id:'/api/courses',{method:id?'PATCH':'POST',body:fd,headers:{}});hideModal('courseModal');loadCourses();loadNotifications();}catch(e){alert(t('Ошибка')+': '+e.message);}
}
async function openCourse(id){
  try{const c=await api('/api/courses/'+id);const can=canManageSchoolClient();
    let modal=document.getElementById('courseDetailModal');if(!modal){modal=document.createElement('div');modal.id='courseDetailModal';modal.className='modal';modal.innerHTML='<div class="modal-box modal-wide" id="courseDetailBox"></div>';modal.onclick=e=>{if(e.target===modal)hideModal('courseDetailModal')};document.body.appendChild(modal);}
    document.getElementById('courseDetailBox').innerHTML=`<h2>🎓 ${esc(c.title)}</h2><p class="small">${esc(c.description||'')}</p>${c.content?`<div class="detail-section"><p class="prewrap wrap-anywhere">${esc(c.content)}</p></div>`:''}${renderLinks(c.links)}${renderAttachments(c.attachments)}<div class="detail-section"><h4>${t('Мой прогресс')}</h4><input type="range" min="0" max="100" value="${Number(c.progress)||0}" onchange="setCourseProgress('${c.id}',this.value)"> <span>${Number(c.progress)||0}%</span></div><div class="modal-buttons">${can?`<button class="btn btn-light" onclick="editCourse('${c.id}')">${t('Редактировать')}</button><button class="btn btn-danger" onclick="deleteCourse('${c.id}')">${t('Удалить курс')}</button>`:''}<button class="btn btn-light" onclick="hideModal('courseDetailModal')">${t('Закрыть')}</button></div>`;
    modal.classList.add('show');applyLanguage(currentUser?.language||'ru');
  }catch(e){alert(t('Ошибка')+': '+e.message);}
}
async function editCourse(id){const c=await api('/api/courses/'+id);hideModal('courseDetailModal');showCourseModal(c);}
async function deleteCourse(id){if(!confirm(t('Удалить курс?')))return;await api('/api/courses/'+id,{method:'DELETE'});hideModal('courseDetailModal');loadCourses();}
async function setCourseProgress(id,progress){await api('/api/courses/'+id+'/progress',{method:'PATCH',body:JSON.stringify({progress:Number(progress)})});openCourse(id);loadCourses();}

async function loadTasks() {
  try {
    const tasks = await api('/api/tasks');
    const open = tasks.filter(t => t.status === 'open').length;
    const badge = document.getElementById('taskBadge'); badge.style.display = open ? '' : 'none'; badge.textContent = open;
    document.getElementById('taskList').innerHTML = tasks.map(task => `<div class="task ${task.status==='done'?'done':''} task-clickable">
      <input type="checkbox" ${task.status==='done'?'checked':''} onclick="event.stopPropagation()" onchange="toggleTask('${task.id}',this.checked)">
      <div class="task-text" onclick="openTask('${task.id}')"><strong>${esc(task.title)}</strong><p>${esc((task.description||'').slice(0,120))}${(task.description||'').length>120?'…':''}</p>${task.due_date?`<small>${t('Срок:')} ${esc(task.due_date)}</small>`:''}</div>
      <span onclick="openTask('${task.id}')" class="status ${task.status==='done'?'green':(task.priority==='high'?'orange':'blue')}">${task.status==='done'?t('Готово'):(task.priority==='high'?t('Важно'):t('Обычная'))}</span></div>`).join('') || `<div class="empty">${t('Нет задач')}</div>`;
  } catch (err) { console.error('Tasks load failed',err); document.getElementById('taskList').innerHTML=`<div class="empty">${t('Ошибка')}</div>`; }
}
async function toggleTask(id,done){await api('/api/tasks/'+id,{method:'PATCH',body:JSON.stringify({status:done?'done':'open'})});loadTasks();}
async function showTaskModal(){ const users=await api('/api/team'); document.getElementById('taskAssignee').innerHTML=users.map(u=>`<option value="${u.id}" ${u.id===currentUser.id?'selected':''}>${esc(u.name)}</option>`).join(''); document.getElementById('taskModal').classList.add('show'); }
async function createTask(){
  const title=document.getElementById('taskTitle').value.trim(); if(!title)return alert(t('Введите название'));
  const fd=new FormData(); fd.append('title',title); fd.append('description',document.getElementById('taskDesc').value.trim()); fd.append('priority',document.getElementById('taskPriority').value); fd.append('assignee_id',document.getElementById('taskAssignee').value); fd.append('due_date',document.getElementById('taskDue').value); fd.append('links',document.getElementById('taskLinks').value);
  Array.from(document.getElementById('taskFiles').files||[]).forEach(x=>fd.append('attachments',x));
  await api('/api/tasks',{method:'POST',body:fd,headers:{}}); hideModal('taskModal'); document.getElementById('taskTitle').value=''; loadTasks();
}
async function openTask(id){ const tasks=await api('/api/tasks'); const task=tasks.find(x=>x.id===id); if(!task)return; const users=await api('/api/team'); const assignee=users.find(u=>u.id===task.assignee_id); const creator=users.find(u=>u.id===task.created_by); const canDelete=task.created_by===currentUser.id||['owner','admin'].includes(currentUser.role);
 document.getElementById('taskDetailBox').innerHTML=`<h2>${esc(task.title)}</h2><div class="detail-meta"><span class="status ${task.status==='done'?'green':(task.priority==='high'?'orange':'blue')}">${task.status==='done'?t('Готово'):(task.priority==='high'?t('Важно'):t('Обычная'))}</span> ${task.due_date?`<span>📅 ${esc(task.due_date)}</span>`:''}</div><div class="detail-section"><h4>${t('Описание')}</h4><p class="prewrap">${esc(task.description||t('Нет описания'))}</p></div><div class="detail-section"><h4>${t('Назначено')}</h4><p>${esc(assignee?.name||'—')}</p></div><div class="detail-section"><h4>${t('Автор')}</h4><p>${esc(creator?.name||'—')}</p></div>${renderLinks(task.links)}${renderAttachments(task.attachments)}<div class="modal-buttons">${canDelete?`<button class="btn btn-danger" onclick="deleteTask('${task.id}')">${t('Удалить задачу')}</button>`:''}<button class="btn btn-light" onclick="hideModal('taskDetailModal')">${t('Закрыть')}</button></div>`; document.getElementById('taskDetailModal').classList.add('show'); applyLanguage(currentUser.language||'ru'); }
async function deleteTask(id){if(!confirm(t('Удалить задачу? Это действие нельзя отменить.')))return;await api('/api/tasks/'+id,{method:'DELETE'});hideModal('taskDetailModal');loadTasks();}

async function loadTeam() {
  try {
    const users=await api('/api/team');
    const progress=await Promise.all(users.map(async u=>{try{return await api('/api/onboarding/progress/'+u.id);}catch{return {done:0,total:0,percent:0};}}));
    document.getElementById('teamGrid').innerHTML=users.map((u,i)=>{
      const prog=progress[i]||{done:0,total:0,percent:0};
      const onboarding=prog.total>0 ? (prog.percent===100
        ? `<div class="onboarding-team-status complete">✓ ${t('Адаптация завершена')}</div>`
        : `<div class="onboarding-team-status">${t('Запуск новичка')}: ${prog.done}/${prog.total} · ${prog.percent}%</div>`) : '';
      return `<div class="person person-clickable" onclick="openPerson('${u.id}')"><div class="person-avatar">${esc(u.avatar||'?')}</div><div><h4>${esc(u.name)}</h4><p>${t(roleLabels[u.role]||u.role)}</p><span class="status ${u.status==='online'?'green':'gray'}">${u.status==='online'?t('Онлайн'):t('Не в сети')}</span>${onboarding}</div></div>`;
    }).join('')||`<div class="empty">${t('Нет участников')}</div>`;
  } catch {document.getElementById('teamGrid').innerHTML=`<div class="empty">${t('Ошибка')}</div>`;}
}
async function openPerson(id){const users=await api('/api/team');const u=users.find(x=>x.id===id);if(!u)return;const prog=await api('/api/onboarding/progress/'+id);const p=u.permissions||{};const perms=['owner','technical_admin'].includes(currentUser.role)&&!['owner','technical_admin'].includes(u.role)?`<div class="detail-section"><h4>Разрешения</h4><label class="perm-check"><input type="checkbox" ${p.manage_school?'checked':''} onchange="setPermission('${u.id}','manage_school',this.checked)"> Добавлять и управлять курсами</label><label class="perm-check"><input type="checkbox" ${p.manage_onboarding?'checked':''} onchange="setPermission('${u.id}','manage_onboarding',this.checked)"> Редактировать программу новичка</label><label class="perm-check"><input type="checkbox" ${p.manage_content?'checked':''} onchange="setPermission('${u.id}','manage_content',this.checked)"> Управлять материалами</label><label class="perm-check"><input type="checkbox" ${p.manage_files?'checked':''} onchange="setPermission('${u.id}','manage_files',this.checked)"> Управлять файлами</label></div>`:'';document.getElementById('personDetailBox').innerHTML=`<div class="person-profile"><div class="person-avatar big">${esc(u.avatar||'?')}</div><h2>${esc(u.name)}</h2><p>${esc(u.email||'')}</p><p>${roleLabels[u.role]||u.role}</p><span class="status ${u.status==='online'?'green':'gray'}">${u.status==='online'?'Онлайн':'Не в сети'}</span></div><div class="detail-section"><h4>Запуск новичка</h4><div class="progress"><div class="progress-bar" style="width:${prog.percent}%"></div></div><p>${prog.done}/${prog.total} · ${prog.percent}% ${prog.percent===100?'✓ '+t('Адаптация завершена'):''}</p></div>${perms}<div class="modal-buttons">${u.id!==currentUser.id?`<button class="btn" onclick="startPrivateChatFromProfile('${u.id}')">💬 Личное сообщение</button>`:''}<button class="btn btn-light" onclick="hideModal('personModal')">Закрыть</button></div>`;document.getElementById('personModal').classList.add('show');}
async function startPrivateChatFromProfile(id){hideModal('personModal');await startPrivateChat(id);}

async function loadKnowledge(){try{const items=await api('/api/knowledge');document.getElementById('knowledgeGrid').innerHTML=items.map(k=>`<div class="knowledge knowledge-clickable" onclick="openKnowledge('${k.id}')"><div class="knowledge-icon">${k.icon||'📄'}</div><h3>${esc(k.title)}</h3><p>${esc(k.description||'')}</p><small>${(k.attachments||[]).length?`📎 ${(k.attachments||[]).length} влож.`:''} ${(k.links||[]).length?`🔗 ${(k.links||[]).length}`:''}</small></div>`).join('')||'<div class="empty">Пока пусто</div>';}catch{document.getElementById('knowledgeGrid').innerHTML=`<div class="empty">${t('Ошибка')}</div>`;}}
const KNOWLEDGE_EMOJIS=['📄','📘','📗','📕','📙','📚','📝','📌','📍','🔖','🔗','📎','📁','🗂️','🗃️','💡','⭐','✨','✅','☑️','⚠️','❗','❓','ℹ️','🎯','🚀','📣','🔔','📅','⏰','⌛','📊','📈','📉','💼','🏢','👥','👤','🤝','💬','📧','📞','🌐','🔒','🔑','🛡️','⚙️','🛠️','🔧','💻','🖥️','📱','🖨️','💾','☁️','🎓','🏆','📖','✏️','🧠','❤️','👍','😊','🙂','🔥','🎉','🎨','📷','🎬','🎵','🧾','💶','🛒','📦','🚚','🏠','📋'];
function ensureKnowledgeEmojiPicker(){const box=document.getElementById('knowIconPicker');if(!box||box.dataset.ready)return;box.innerHTML=KNOWLEDGE_EMOJIS.map(e=>`<button type="button" class="emoji-choice" data-icon="${e}" onclick="selectKnowledgeIcon('${e}');event.stopPropagation()">${e}</button>`).join('');box.dataset.ready='1';}
function toggleKnowledgeEmojiPicker(){ensureKnowledgeEmojiPicker();document.getElementById('knowIconPicker')?.classList.toggle('show');}
function selectKnowledgeIcon(icon){icon=icon||'📄';const input=document.getElementById('knowIcon');if(input)input.value=icon;const current=document.getElementById('knowEmojiCurrent');if(current)current.textContent=icon;document.querySelectorAll('#knowIconPicker .emoji-choice').forEach(b=>b.classList.toggle('selected',b.dataset.icon===icon));document.getElementById('knowIconPicker')?.classList.remove('show');}
function showKnowledgeModal(){const modal=document.getElementById('knowledgeModal');delete modal.dataset.editId;document.getElementById('knowTitle').value='';document.getElementById('knowDesc').value='';document.getElementById('knowContent').value='';document.getElementById('knowLinks').value='';document.getElementById('knowFiles').value='';selectKnowledgeIcon('📄');modal.classList.add('show');setTimeout(()=>document.getElementById('knowTitle')?.focus(),50);}
async function createKnowledge(){const title=document.getElementById('knowTitle').value.trim();if(!title)return alert(t('Введите название'));const fd=new FormData();fd.append('title',title);fd.append('description',document.getElementById('knowDesc').value.trim());fd.append('content',document.getElementById('knowContent').value.trim());fd.append('links',document.getElementById('knowLinks').value);fd.append('icon',document.getElementById('knowIcon').value.trim()||'📄');Array.from(document.getElementById('knowFiles').files||[]).forEach(x=>fd.append('attachments',x));const editId=document.getElementById('knowledgeModal').dataset.editId;await api(editId?'/api/knowledge/'+editId:'/api/knowledge',{method:editId?'PATCH':'POST',body:fd,headers:{}});delete document.getElementById('knowledgeModal').dataset.editId;hideModal('knowledgeModal');loadKnowledge();loadNotifications();}
async function openKnowledge(id){const k=await api('/api/knowledge/'+id);const canDelete=k.created_by===currentUser.id||['owner','technical_admin'].includes(currentUser.role)||!!currentUser.permissions?.manage_content;document.getElementById('knowledgeDetailBox').innerHTML=`<h2>${k.icon||'📄'} ${esc(k.title)}</h2><p class="small">${esc(k.description||'')}</p><div class="detail-section"><p class="prewrap wrap-anywhere">${esc(k.content||'')}</p></div>${renderLinks(k.links)}${renderAttachments(k.attachments)}<div class="modal-buttons">${canDelete?`<button class="btn btn-light" onclick="editKnowledge('${k.id}')">Редактировать</button><button class="btn btn-danger" onclick="deleteKnowledge('${k.id}')">Удалить материал</button>`:''}<button class="btn btn-light" onclick="hideModal('knowledgeDetailModal')">Закрыть</button></div>`;document.getElementById('knowledgeDetailModal').classList.add('show');}
async function editKnowledge(id){const k=await api('/api/knowledge/'+id);hideModal('knowledgeDetailModal');document.getElementById('knowTitle').value=k.title||'';document.getElementById('knowDesc').value=k.description||'';document.getElementById('knowContent').value=k.content||'';document.getElementById('knowLinks').value=(k.links||[]).join('\n');selectKnowledgeIcon(k.icon||'📄');document.getElementById('knowledgeModal').dataset.editId=id;document.getElementById('knowledgeModal').classList.add('show');setTimeout(()=>document.getElementById('knowTitle')?.focus(),50);}
async function deleteKnowledge(id){if(!confirm(t('Удалить материал')))return;try{await api('/api/knowledge/'+id,{method:'DELETE'});hideModal('knowledgeDetailModal');await loadKnowledge();await loadNotifications();}catch(e){alert(t('Ошибка')+': '+(e?.message||e));}}
function renderLinks(links=[]){if(!links?.length)return'';return `<div class="detail-section"><h4>Ссылки</h4>${links.map(x=>`<p><a href="${esc(x)}" target="_blank" rel="noopener">🔗 ${esc(x)}</a></p>`).join('')}</div>`;}
function renderAttachments(items=[]){if(!items?.length)return'';return `<div class="detail-section"><h4>Вложения</h4><div class="attachment-grid">${items.map(a=>a.type==='image'?`<a href="#" onclick="event.preventDefault();previewUrl('${a.url}','${a.type}','${esc(a.name)}')"><img src="${a.url}" alt="${esc(a.name)}"><span>${esc(a.name)}</span></a>`:a.type==='video'?`<div class="attachment"><video controls src="${a.url}"></video><span>${esc(a.name)}</span></div>`:`<a class="attachment file" href="${a.url}" target="_blank" download>📎 ${esc(a.name)}</a>`).join('')}</div></div>`;}

// ============ NOTIFICATIONS ============
async function loadNotifications(){if(!token)return;try{const list=await api('/api/notifications');const unread=list.filter(n=>!(n.read_by||[]).includes(currentUser.id));const badge=document.getElementById('notificationBadge');badge.textContent=unread.length;badge.style.display=unread.length?'':'none';document.getElementById('notificationList').innerHTML=list.length?list.slice(0,50).map(n=>`<div class="notification-item ${(n.read_by||[]).includes(currentUser.id)?'':'unread'}" onclick="readNotification('${n.id}')"><strong>${esc(n.text)}</strong><small>${new Date(n.created_at).toLocaleString(currentUser?.language==='fi'?'fi-FI':currentUser?.language==='en'?'en-GB':'ru-RU')}</small></div>`).join(''):'<div class="empty">Нет уведомлений</div>';}catch(e){console.error(e)}}
function toggleNotifications(){const p=document.getElementById('notificationPanel');p.classList.toggle('show');if(p.classList.contains('show'))loadNotifications();}
async function readNotification(id){
  const list=await api('/api/notifications'); const n=list.find(x=>x.id===id);
  await api('/api/notifications/'+id+'/read',{method:'PATCH',body:JSON.stringify({})});
  document.getElementById('notificationPanel')?.classList.remove('show'); loadNotifications();
  if(!n)return;
  if(n.type==='task'){await openPage('tasks');setTimeout(()=>openTask(n.ref_id),120);}
  else if(n.type==='material'){await openPage('knowledge');setTimeout(()=>openKnowledge(n.ref_id),120);}
  else if(n.type==='news'){await openPage('dashboard');setTimeout(()=>openNews(n.ref_id),120);}
  else if(n.type==='event'){await openPage('events');}
}
async function markAllNotifications(){await api('/api/notifications/read-all',{method:'POST',body:JSON.stringify({})});loadNotifications();}
document.addEventListener('click',e=>{const p=document.getElementById('notificationPanel'),b=document.getElementById('notificationBtn');if(p&&b&&!p.contains(e.target)&&!b.contains(e.target))p.classList.remove('show');});


// ============ ONBOARDING ============
async function loadOnboarding(){
  const box=document.getElementById('onboardingList');
  try{
    const steps=await api('/api/onboarding');
    const can=['owner','technical_admin'].includes(currentUser.role)||currentUser.permissions?.manage_onboarding;
    const addBtn=document.querySelector('.owner-onboarding'); if(addBtn)addBtn.style.display=can?'':'none';
    box.innerHTML=steps.length?steps.map((step,i)=>`<div class="onboarding-step ${step.completed?'done':''}">
      <input type="checkbox" ${step.completed?'checked':''} onclick="event.stopPropagation()" onchange="toggleOnboardingStep('${step.id}',this.checked)">
      <div class="onboarding-main" onclick="openOnboardingStep('${step.id}')" style="cursor:pointer;flex:1"><strong>${esc(localizeSeededOnboarding(step.title))}</strong><p>${esc(localizeSeededOnboarding(step.description||''))}</p></div>
      ${can?`<button class="btn btn-light" onclick="event.stopPropagation();editOnboardingStep('${step.id}')">${t('Редактировать')}</button>`:''}
    </div>`).join(''):`<div class="empty">${t('Этапов пока нет')}</div>`;
    applyLanguage(currentUser.language||'ru');
  }catch(err){console.error('Onboarding load failed',err);box.innerHTML=`<div class="empty">${t('Ошибка')}</div>`;}
}
async function toggleOnboardingStep(id,completed){try{await api('/api/onboarding/'+id,{method:'PATCH',body:JSON.stringify({completed})});loadOnboarding();}catch(e){alert(t('Ошибка')+': '+e.message);}}
async function openOnboardingStep(id){
  const steps=await api('/api/onboarding'); const step=steps.find(x=>x.id===id); if(!step)return;
  const can=['owner','technical_admin'].includes(currentUser.role)||currentUser.permissions?.manage_onboarding;
  document.getElementById('onboardingDetailBox').innerHTML=`<h2>${esc(localizeSeededOnboarding(step.title))}</h2><p class="small">${esc(localizeSeededOnboarding(step.description||''))}</p>${step.content?`<div class="detail-section"><p class="prewrap wrap-anywhere">${esc(step.content)}</p></div>`:''}${renderLinks(step.links)}${renderAttachments(step.attachments)}<div class="modal-buttons">${can?`<button class="btn btn-light" onclick="editOnboardingStep('${step.id}')">${t('Редактировать')}</button><button class="btn btn-danger" onclick="deleteOnboardingStep('${step.id}')">${t('Удалить')}</button>`:''}<button class="btn btn-light" onclick="hideModal('onboardingDetailModal')">${t('Закрыть')}</button></div>`;
  document.getElementById('onboardingDetailModal').classList.add('show'); applyLanguage(currentUser.language||'ru');
}
function onboardingEditor(step={}){
  document.getElementById('onboardingDetailBox').innerHTML=`<h2>${step.id?t('Редактировать этап'):t('Новый этап')}</h2>
    <div class="form-group"><label>${t('Название')}</label><input id="obTitle" value="${esc(step.title||'')}"></div>
    <div class="form-group"><label>${t('Краткое описание')}</label><input id="obDescription" value="${esc(step.description||'')}"></div>
    <div class="form-group"><label>${t('Содержание / инструкция')}</label><textarea id="obContent" rows="7">${esc(step.content||'')}</textarea></div>
    <div class="form-group"><label>${t('Ссылки')}</label><textarea id="obLinks" rows="3">${esc((step.links||[]).join('\n'))}</textarea></div>
    <div class="form-group"><label>${t('Файлы / фото / видео')}</label><input id="obFiles" type="file" multiple></div>
    ${step.attachments?.length?renderAttachments(step.attachments):''}
    <div class="modal-buttons">${step.id?`<button class="btn btn-danger" onclick="deleteOnboardingStep('${step.id}')">${t('Удалить')}</button>`:''}<button class="btn btn-light" onclick="hideModal('onboardingDetailModal')">${t('Отмена')}</button><button class="btn" onclick="saveOnboardingStep('${step.id||''}')">${t('Сохранить')}</button></div>`;
  document.getElementById('onboardingDetailModal').classList.add('show'); applyLanguage(currentUser.language||'ru');
}
function newOnboardingStep(){onboardingEditor({});}
async function editOnboardingStep(id){const steps=await api('/api/onboarding');const step=steps.find(x=>x.id===id);if(step)onboardingEditor(step);}
async function saveOnboardingStep(id){
  const title=document.getElementById('obTitle').value.trim(); if(!title)return alert(t('Введите название'));
  const fd=new FormData(); fd.append('title',title);fd.append('description',document.getElementById('obDescription').value.trim());fd.append('content',document.getElementById('obContent').value.trim());fd.append('links',document.getElementById('obLinks').value.trim());Array.from(document.getElementById('obFiles').files||[]).forEach(f=>fd.append('attachments',f));
  try{await api(id?'/api/onboarding/'+id+'/content':'/api/onboarding',{method:id?'PATCH':'POST',body:fd,headers:{}});hideModal('onboardingDetailModal');loadOnboarding();}catch(e){alert(t('Ошибка')+': '+e.message);}
}
async function deleteOnboardingStep(id){if(!confirm(t('Удалить этап? Это удалит его из программы для всей команды.')))return;try{await api('/api/onboarding/'+id+'/content',{method:'DELETE'});hideModal('onboardingDetailModal');loadOnboarding();}catch(e){alert(t('Ошибка')+': '+e.message);}}

// ============ MEDIA ============
async function loadMedia() {
  try {
    allMedia = await api('/api/media');
    renderMedia();
  } catch {
    document.getElementById('mediaGrid').innerHTML = `<div class="empty">${t('Ошибка загрузки')}</div>`;
  }
}

function filterMedia(type) {
  mediaFilter = type;
  document.querySelectorAll('.media-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.type === type);
  });
  renderMedia();
}

function renderMedia() {
  const list = mediaFilter === 'all' ? allMedia : allMedia.filter(m => m.type === mediaFilter);
  const grid = document.getElementById('mediaGrid');
  if (!list.length) {
    grid.innerHTML = `<div class="empty">${t('В этом разделе пока пусто')}</div>`;
    return;
  }
  grid.innerHTML = list.map(m => {
    let preview = '📄';
    if (m.type === 'images' && !m.content_locked) preview = `<img src="${m.url}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:10px;margin-bottom:10px">`; else if(m.content_locked) preview='🔒';
    else if (m.type === 'videos') preview = '🎬';
    const sizeMb = ((m.size || 0) / 1024 / 1024).toFixed(1);
    return `<div class="knowledge knowledge-clickable media-card" onclick="event.stopPropagation();previewMedia('${m.id}')">
      ${typeof preview === 'string' && preview.length < 5 ? `<div class="knowledge-icon">${preview}</div>` : preview}
      <h3 style="font-size:15px">${esc(m.title || m.originalname)}</h3>
      <p>${esc(m.uploader_name || '')} · ${sizeMb} ${t('МБ')}</p>
      <div style="margin-top:10px;display:flex;gap:8px">
        ${m.content_locked?`<span class="status gray">${t('Содержимое закрыто')}</span>`:`<button class="btn btn-light" style="font-size:12px;padding:6px 10px" onclick="event.stopPropagation();previewMedia('${m.id}')">${t('Открыть')}</button><a class="btn btn-light" style="font-size:12px;text-decoration:none;padding:6px 10px" href="${m.url}" onclick="event.stopPropagation()" download="${esc(m.originalname||m.title)}">${t('Скачать')}</a>`}
        <button class="btn btn-danger" style="font-size:12px;padding:6px 10px" onclick="event.stopPropagation();deleteMedia('${m.id}')">${t('Удалить')}</button>
      </div>
    </div>`;
  }).join('');
}

document.getElementById('fileInput').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;
  const progress = document.getElementById('uploadProgress');
  progress.style.display = 'block';
  for (let i = 0; i < files.length; i++) {
    progress.textContent = `Загрузка ${i + 1} из ${files.length}: ${files[i].name}...`;
    const fd = new FormData();
    fd.append('file', files[i]);
    fd.append('title', files[i].name);
    try {
      await api('/api/media/upload', { method: 'POST', body: fd, headers: {} });
    } catch (err) {
      alert('Ошибка: ' + files[i].name + ' — ' + err.message);
    }
  }
  progress.style.display = 'none';
  e.target.value = '';
  loadMedia();
  loadDashboard();
});

async function deleteMedia(id) {
  if (!confirm(t('Удалить файл?'))) return;
  try { await api('/api/media/' + id, { method: 'DELETE' }); await loadMedia(); await loadDashboard(); }
  catch(e){ alert(t('Ошибка')+': '+(e?.message||e)); }
}

// ============ CHAT ============
async function loadRooms() {
  try {
    const rooms = await api('/api/rooms');
    const closedRooms=JSON.parse(localStorage.getItem('space_closed_rooms')||'[]');
    const visibleRooms=rooms.filter(r=>r.type==='global'||!closedRooms.includes(r.id));
    const totalUnread=rooms.reduce((n,r)=>n+(Number(r.unread_count)||0),0);
    setChatUnreadBadge(totalUnread);
    document.getElementById('roomsList').innerHTML = visibleRooms.map(r => {
      const shownName=r.display_name||r.name;
      const icon=r.type==='private'?'👤 ':r.type==='support'?'🛟 ':r.access_locked?'🔒 ':'#';
      const unread=Number(r.unread_count)||0;
      return `<div class="chat-room ${r.id === currentRoomId ? 'active' : ''}" onclick="${r.access_locked?`alert(t('Доступ к общему чату должен разрешить владелец'))`:`joinRoom('${r.id}', '${esc(shownName)}', '${r.type || ''}')`}">
        <strong>${icon}${esc(localizeRoomName(shownName,r.type))}</strong><br>
        <small>${r.access_locked?'🔒 '+t('Доступ не предоставлен'):r.type === 'global' ? t('Групповой чат') : r.type === 'private' ? t('Личный чат') : r.type === 'support' ? t('Техническая поддержка Alex Node') : ''}</small>
        ${unread?`<span class="room-unread-badge">${unread>99?'99+':unread}</span>`:''}
        ${r.type!=='global'?`<button class="room-close-btn" title="${t('Закрыть чат')}" onclick="event.stopPropagation();closeChatSession('${r.id}')">×</button>`:''}
      </div>`;
    }).join('') || `<div class="empty">${t('Нет чатов')}</div>`;
    // Do not auto-open a conversation: entering Chat must not mark any room as read.
    // A room is read only after the user explicitly opens that conversation.
  } catch {
    document.getElementById('roomsList').innerHTML = `<div class="empty">${t('Ошибка')}</div>`;
  }
}

function closeChatSession(id){
  const set=new Set(JSON.parse(localStorage.getItem('space_closed_rooms')||'[]'));set.add(id);localStorage.setItem('space_closed_rooms',JSON.stringify([...set]));
  if(currentRoomId===id){currentRoomId=null;document.getElementById('messages').innerHTML='';document.getElementById('currentRoomName').textContent=t('Выберите чат');document.getElementById('currentRoomInfo').textContent='';document.getElementById('chatMessage').disabled=true;document.getElementById('sendBtn').disabled=true;document.getElementById('chatAttachBtn').disabled=true;}
  loadRooms();
}
function reopenChatSession(id){const a=JSON.parse(localStorage.getItem('space_closed_rooms')||'[]').filter(x=>x!==id);localStorage.setItem('space_closed_rooms',JSON.stringify(a));}

function setChatUnreadBadge(count){const b=document.getElementById('chatUnreadBadge');if(!b)return;b.textContent=count>99?'99+':count;b.style.display=count?'inline-flex':'none';}
async function refreshChatUnread(){if(!token)return;try{const rooms=await api('/api/rooms');setChatUnreadBadge(rooms.reduce((n,r)=>n+(Number(r.unread_count)||0),0));if(document.getElementById('chat')?.classList.contains('active')){const list=document.getElementById('roomsList');if(list)loadRooms();}}catch{}}

async function joinRoom(roomId, name, type) {
  reopenChatSession(roomId);
  if (currentRoomId && socket) socket.emit('leave:room', currentRoomId);
  currentRoomId = roomId;
  if (socket) socket.emit('join:room', roomId);
  document.getElementById('currentRoomName').textContent = (type === 'private' ? '👤 ' : type === 'support' ? '🛟 ' : '# ') + localizeRoomName(name,type);
  document.getElementById('currentRoomInfo').textContent = type === 'private' ? t('Приватный чат') : type === 'support' ? t('Техническая поддержка Alex Node') : t('Общий чат команды');
  document.getElementById('chatMessage').disabled = false; setTimeout(()=>{const ci=document.getElementById('chatMessage');autoGrowChatInput(ci);ci?.focus();},0);
  document.getElementById('sendBtn').disabled = false; document.getElementById('chatAttachBtn').disabled=false;
  try {
    const messages = await api('/api/rooms/' + roomId + '/messages');
    const box = document.getElementById('messages');
    box.innerHTML = '';
    messages.forEach(m => appendMessage(m));
    box.scrollTop = box.scrollHeight;
    try{await api('/api/rooms/'+roomId+'/read',{method:'POST'});}catch{}
    refreshChatUnread();
  } catch {
    document.getElementById('messages').innerHTML = `<div class="empty">${t('Не удалось загрузить')}</div>`;
  }
  loadRooms();
}

function appendMessage(msg) {
  const box = document.getElementById('messages');
  const isMe = msg.user_id === currentUser.id;
  const div = document.createElement('div');
  div.className = 'message' + (isMe ? ' me' : '');
  const time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString(currentUser?.language==='fi'?'fi-FI':currentUser?.language==='en'?'en-GB':'ru-RU', { hour: '2-digit', minute: '2-digit' }) : '';
  let body = esc(msg.text || '');
  if (msg.attachment && msg.attachment.url) {
    const x=msg.attachment; let preview='';
    if((x.mimetype||'').startsWith('image/')) preview=`<img src="${x.url}" alt="${esc(x.name||'')}">`;
    else if((x.mimetype||'').startsWith('video/')) preview=`<video controls src="${x.url}"></video>`;
    else if((x.mimetype||'').startsWith('audio/')) preview=`<audio controls src="${x.url}"></audio>`;
    body += `<div class="chat-attachment">${preview}<strong>📎 ${esc(x.name||t('Файл'))}</strong><div class="chat-file-actions"><a href="${x.url}" target="_blank" rel="noopener">${t('Открыть')}</a><a href="${x.url}" download="${esc(x.name||'file')}">${t('Скачать')}</a></div></div>`;
  }
  div.innerHTML = isMe
    ? `${body}<div class="msg-time">${time}</div>`
    : `<div class="msg-author">${esc(msg.user_name || '')}</div>${body}<div class="msg-time">${time}</div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function autoGrowChatInput(el){if(!el)return;el.style.height='auto';el.style.height=Math.min(el.scrollHeight,180)+'px';}
function handleChatKeydown(event){if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMessage();}}
function sendMessage() {
  const input = document.getElementById('chatMessage');
  const text = input.value.trim();
  if (!text || !currentRoomId || !socket) return;
  socket.emit('message:send', { roomId: currentRoomId, text });
  input.value = '';
  autoGrowChatInput(input);
}

function chooseChatFiles(){if(!currentRoomId)return;document.getElementById('chatFiles').click();}
async function sendChatFiles(fileList){const files=Array.from(fileList||[]);if(!currentRoomId||!files.length)return;for(const file of files){try{const fd=new FormData();fd.append('file',file);fd.append('roomId',currentRoomId);const x=await api('/api/chat/upload',{method:'POST',body:fd,headers:{}});socket.emit('message:send',{roomId:currentRoomId,text:'',attachment:x});}catch(e){alert(t('Не удалось загрузить')+': '+file.name+' — '+e.message);}}document.getElementById('chatFiles').value='';}
function openSupportWhatsApp(){window.open('https://wa.me/358458525293?text='+encodeURIComponent('Hello Alex Node IT Support. I need help with S.P.A.C.E.'),'_blank');}

async function showPrivateChatModal() {
  const users = await api('/api/team');
  const others = users.filter(u => u.id !== currentUser.id);
  document.getElementById('privateUserList').innerHTML = others.length
    ? others.map(u => `
      <div class="person" style="cursor:pointer;margin-bottom:8px" onclick="startPrivateChat('${u.id}')">
        <div class="person-avatar">${esc(u.avatar || '?')}</div>
        <div><h4>${esc(u.name)}</h4><p>${roleLabels[u.role] || ''}</p></div>
      </div>`).join('')
    : '<div class="empty">Нет других участников. Пригласите коллег.</div>';
  document.getElementById('privateChatModal').classList.add('show');
}

async function startPrivateChat(userId) {
  const room = await api('/api/rooms/private', { method: 'POST', body: JSON.stringify({ userId }) });
  hideModal('privateChatModal');
  openPage('chat');
  setTimeout(() => joinRoom(room.id, room.name, 'private'), 100);
}

// ============ ADMIN / INVITES ============
async function loadAdminUsers() {
  try {
    const users = await api('/api/team');
    const progressPairs=await Promise.all(users.map(async u=>{try{return [u.id,await api('/api/onboarding/progress/'+u.id)];}catch{return [u.id,{done:0,total:0,percent:0}];}}));
    const progressByUser=Object.fromEntries(progressPairs);
    const ownerMode = currentUser.role === 'owner';
    // Development mode: Alex Node Technical Administrator can test Owner-level management controls
    // for non-protected business accounts, without becoming the business Owner.
    const developmentAdminMode = currentUser.role === 'technical_admin';
    const managementMode = ownerMode || developmentAdminMode;
    const canManageUsers = managementMode || (currentUser.role === 'admin' && !!currentUser.permissions?.manage_users);
    const permText = (p) => {
      const names=[];
      if(p.manage_users) names.push(t('Пользователи'));
      if(p.manage_content) names.push(t('Контент'));
      if(p.manage_events) names.push(t('События'));
      if(p.manage_files) names.push(t('Файлы'));
      if(p.manage_school) names.push(t('Школа'));
      if(p.manage_onboarding) names.push(t('Запуск новичка'));
      return names.length ? `<span class="small">${names.join(', ')}</span>` : `<span class="small">${t('Обычные права роли')}</span>`;
    };
    document.getElementById('adminUsersList').innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:14px"><thead><tr style="text-align:left;border-bottom:1px solid var(--border)"><th style="padding:8px">${t('Имя / Email')}</th><th style="padding:8px">${t('Должность')}</th><th style="padding:8px">${t('Системная роль')}</th><th style="padding:8px">${t('Разрешения')}</th><th style="padding:8px">${t('Доступ')}</th></tr></thead><tbody>${users.map(u=>{
      const p=u.permissions||{}, owner=u.role==='owner', admin=u.role==='admin', tech=u.role==='technical_admin', suspended=u.account_status==='suspended', self=u.id===currentUser.id;
      let checks;
      if(owner) checks=`<span class="status green">${t('Полный доступ')}</span>`;
      else if(tech) {
        checks = ownerMode ? `<span class="small">Technical system administration</span><br><label class="perm-check"><input type="checkbox" ${p.manage_content?'checked':''} onchange="setPermission('${u.id}','manage_content',this.checked)"> Materials</label><label class="perm-check"><input type="checkbox" ${p.manage_school?'checked':''} onchange="setPermission('${u.id}','manage_school',this.checked)"> School</label><label class="perm-check"><input type="checkbox" ${p.manage_events?'checked':''} onchange="setPermission('${u.id}','manage_events',this.checked)"> Events</label><label class="perm-check"><input type="checkbox" ${p.manage_onboarding?'checked':''} onchange="setPermission('${u.id}','manage_onboarding',this.checked)"> Onboarding</label><label class="perm-check"><input type="checkbox" ${p.manage_files?'checked':''} onchange="setPermission('${u.id}','manage_files',this.checked)"> File management</label><label class="perm-check"><input type="checkbox" ${p.upload_files?'checked':''} onchange="setPermission('${u.id}','upload_files',this.checked)"> Upload files</label><label class="perm-check"><input type="checkbox" ${p.delete_files?'checked':''} onchange="setPermission('${u.id}','delete_files',this.checked)"> Delete files</label><label class="perm-check"><input type="checkbox" ${p.read_file_contents?'checked':''} onchange="setPermission('${u.id}','read_file_contents',this.checked)"> ${t('Читать содержимое файлов')}</label><label class="perm-check"><input type="checkbox" ${p.global_chat_support?'checked':''} onchange="setPermission('${u.id}','global_chat_support',this.checked)"> ${t('Доступ IT Support к новым сообщениям общего чата')}</label>` : `<span class="status green">Development access: full module & user management</span><br><span class="small">Technical system administration</span>`;
      } else if(admin) {
        checks = managementMode ? `<label class="perm-check"><input type="checkbox" ${p.manage_users?'checked':''} onchange="setPermission('${u.id}','manage_users',this.checked)"> ${t('Пользователи')}</label><label class="perm-check"><input type="checkbox" ${p.manage_content?'checked':''} onchange="setPermission('${u.id}','manage_content',this.checked)"> ${t('Контент')}</label><label class="perm-check"><input type="checkbox" ${p.manage_events?'checked':''} onchange="setPermission('${u.id}','manage_events',this.checked)"> ${t('События')}</label><label class="perm-check"><input type="checkbox" ${p.manage_files?'checked':''} onchange="setPermission('${u.id}','manage_files',this.checked)"> ${t('Файлы')}</label><label class="perm-check"><input type="checkbox" ${p.manage_school?'checked':''} onchange="setPermission('${u.id}','manage_school',this.checked)"> ${t('Школа')}</label><label class="perm-check"><input type="checkbox" ${p.manage_onboarding?'checked':''} onchange="setPermission('${u.id}','manage_onboarding',this.checked)"> ${t('Запуск новичка')}</label>` : permText(p);
      } else checks=`<span class="small">${t('Обычные права роли')}</span>`;
      const position=(owner||tech)?'—':`<input class="job-title-input" value="${esc(u.position||'')}" placeholder="${t('Должность / функция')}" onchange="setUserPosition('${u.id}',this.value)" ${(!ownerMode && self)?'disabled':''}>`;
      let roleControl;
      if(managementMode && !owner && !tech && !self) roleControl=`<select class="role-select" onchange="changeRole('${u.id}',this.value)"><option value="member" ${u.role==='member'?'selected':''}>${t('Участник команды')}</option><option value="admin" ${admin?'selected':''}>${t('Администратор')}</option></select>`;
      else roleControl=`<span>${t(roleLabels[u.role]||u.role)}</span>`;
      const actions=(owner||tech||self)?'—':`<div class="admin-actions">${canManageUsers?`<button class="btn btn-light btn-small" onclick="resetUserPassword('${u.id}')">${t('Сбросить пароль')}</button>`:''} ${managementMode?(suspended?`<button class="btn btn-small" onclick="accountAction('${u.id}','restore','${esc(u.name)}')">${t('Восстановить доступ')}</button>`:`<button class="btn btn-light btn-small" onclick="accountAction('${u.id}','suspend','${esc(u.name)}')">${t('Приостановить')}</button>`)+` <button class="btn btn-danger btn-small" onclick="accountAction('${u.id}','remove','${esc(u.name)}')">${t('Удалить аккаунт')}</button>`:''}</div>`;
      return `<tr class="${suspended?'account-status-suspended':''}" style="border-bottom:1px solid #f1f5f9"><td style="padding:8px"><strong>${esc(u.name)}</strong>${self?` <span class="small">(${t('Это вы')})</span>`:''}${suspended?` <span class="status orange">${t('Приостановлен')}</span>`:''}<br><span class="small">${esc(u.email)}</span>${(()=>{const op=progressByUser[u.id]||{done:0,total:0,percent:0};return op.total>0?`<br><span class="small onboarding-admin-status ${op.percent===100?'complete':''}">${op.percent===100?'✓ '+t('Адаптация завершена'):t('Запуск новичка')+': '+op.done+'/'+op.total+' · '+op.percent+'%'}</span>`:'';})()}</td><td style="padding:8px">${position}</td><td style="padding:8px">${roleControl}</td><td style="padding:8px">${checks}</td><td style="padding:8px">${actions}</td></tr>`;
    }).join('')}</tbody></table>`;
  } catch(e) { document.getElementById('adminUsersList').innerHTML=`<div class="empty">${t('Ошибка')}</div>`; }
}
async function setUserPosition(id,position){try{await api('/api/users/'+id+'/position',{method:'PATCH',body:JSON.stringify({position})});}catch(e){alert(e.message);loadAdminUsers();}}
async function accountAction(id,action,name){
  const label=action==='suspend'?t('Приостановить'):action==='restore'?t('Восстановить доступ'):t('Удалить аккаунт');
  if(!confirm(`${label}: ${name}?`))return;
  let password='';
  if(currentUser.role==='owner'){ password=prompt(t('Введите пароль владельца для подтверждения')); if(!password)return; }
  try{await api('/api/users/'+id+'/account-action',{method:'POST',body:JSON.stringify({action,ownerPassword:password})});loadAdminUsers();loadTeam();}catch(e){alert(e.message);}
}
async function setPermission(id, key, value) {
  const users=await api('/api/team'); const u=users.find(x=>x.id===id); if(!u) return;
  const permissions={...(u.permissions||{}),[key]:value};
  try { await api('/api/users/'+id+'/permissions',{method:'PATCH',body:JSON.stringify(permissions)}); }
  catch(e){ alert(e.message); loadAdminUsers(); }
}
async function resetUserPassword(id) {
  if(!confirm('Создать одноразовый временный пароль для этого пользователя? Старый пароль перестанет работать.')) return;
  try { const r=await api('/api/users/'+id+'/reset-password',{method:'POST'}); alert('Временный доступ создан.\n\nEmail: '+r.email+'\nПароль: '+r.tempPassword+'\n\nПередайте пароль пользователю безопасным способом. После входа он задаст новый пароль.'); }
  catch(e){ alert(e.message); }
}

async function changeRole(id, role) {
  try {
    await api('/api/users/' + id + '/role', { method: 'PATCH', body: JSON.stringify({ role }) });
    loadAdminUsers();
  } catch(e) { alert(e.message); loadAdminUsers(); }
}

function showInviteModal() { document.getElementById('inviteModal').classList.add('show'); }
async function createInvite() {
  try {
    const data = await api('/api/invites', {
      method: 'POST',
      body: JSON.stringify({
        email: document.getElementById('inviteEmail').value.trim(),
        role: document.getElementById('inviteRole').value
      })
    });
    hideModal('inviteModal');
    alert(
      'Приглашение создано!\n\n' +
      'Передайте коллеге:\n' +
      'Email: ' + data.user.email + '\n' +
      'Пароль: ' + data.tempPassword + '\n\n' +
      'При входе система попросит задать постоянный email и пароль.'
    );
  } catch (e) {
    alert(e.message);
  }
}

// ============ PROFILE / SETTINGS / PREVIEW ============
function toggleUserMenu(e){e?.stopPropagation();document.getElementById('userMenu').classList.toggle('show');}
document.addEventListener('click',()=>document.getElementById('userMenu')?.classList.remove('show'));
async function openSettings(){document.getElementById('userMenu').classList.remove('show');const me=await api('/api/me');document.getElementById('languageSelect').value=me.language||'ru';document.getElementById('settingsModal').classList.add('show');}
async function saveSettings(){const language=document.getElementById('languageSelect').value;await api('/api/me/settings',{method:'PATCH',body:JSON.stringify({language})});currentUser.language=language;localStorage.setItem('ts_user',JSON.stringify(currentUser));hideModal('settingsModal');applyLanguage(language);if(document.getElementById('chat')?.classList.contains('active')){loadRooms();}}
async function openMyProfile(){document.getElementById('userMenu').classList.remove('show');const p=await api('/api/onboarding/progress/'+currentUser.id);document.getElementById('myProfileBox').innerHTML=`<h2>${esc(currentUser.name)}</h2><p>${esc(currentUser.email)}</p><div class="detail-section"><h4>${t('Запуск новичка')}</h4><div class="progress"><div class="progress-bar" style="width:${p.percent}%"></div></div><p>${p.done}/${p.total} · ${p.percent}% ${p.percent===100?'✓':''}</p></div><div class="modal-buttons"><button class="btn btn-light" onclick="hideModal('myProfileModal')">Закрыть</button></div>`;document.getElementById('myProfileModal').classList.add('show');}
async function previewMedia(id){
  const m=allMedia.find(x=>x.id===id); if(!m)return;
  const box=document.getElementById('mediaPreviewBox');
  box.innerHTML=`<h2>${esc(m.title||m.originalname)}</h2><div class="file-preview-loading">${t('Загрузка предпросмотра')}…</div><div class="modal-buttons"><a class="btn" href="${m.url}" download="${esc(m.originalname||m.title)}">${t('Скачать')}</a><button class="btn btn-light" onclick="hideModal('mediaPreviewModal')">${t('Закрыть')}</button></div>`;
  document.getElementById('mediaPreviewModal').classList.add('show');
  if(m.content_locked){box.querySelector('.file-preview-loading').innerHTML=`<div class="file-open-info">🔒 ${t('Содержимое закрыто')}</div>`;return;}
  let body='';
  if(m.type==='images') body=`<img class="preview-large" src="${m.url}">`;
  else if(m.type==='videos') body=`<video class="preview-large" controls src="${m.url}"></video>`;
  else if((m.mimetype||'').startsWith('audio/')) body=`<audio controls style="width:100%;margin:24px 0" src="${m.url}"></audio>`;
  else if(m.mimetype==='application/pdf') body=`<iframe class="file-frame" src="${m.url}"></iframe>`;
  else {
    try{
      const p=await api('/api/media/'+id+'/preview');
      if(p.kind==='html') body=`<div class="document-preview">${p.html||''}</div>`;
      else if(p.kind==='text') body=`<pre class="text-file-preview">${esc(p.text||'')}</pre>`;
      else body=`<div class="file-open-info">📄 <strong>${esc(m.originalname||m.title)}</strong><p>${t('Предпросмотр для этого типа файла недоступен. Файл можно скачать.')}</p></div>`;
    }catch(e){body=`<div class="file-open-info">📄 <strong>${esc(m.originalname||m.title)}</strong><p>${esc(e.message||t('Не удалось создать предпросмотр'))}</p></div>`;}
  }
  const loading=box.querySelector('.file-preview-loading'); if(loading)loading.outerHTML=body;
  applyLanguage(currentUser.language||'ru');
}
function previewUrl(url,type,name){document.getElementById('mediaPreviewBox').innerHTML=`<h2>${esc(name)}</h2>${type==='image'?`<img class="preview-large" src="${url}">`:type==='video'?`<video class="preview-large" controls src="${url}"></video>`:`<div class="file-open-info">📄 ${esc(name)}</div>`}<div class="modal-buttons"><a class="btn" href="${url}" download="${esc(name)}">${t('Скачать')}</a><button class="btn btn-light" onclick="hideModal('mediaPreviewModal')">Закрыть</button></div>`;document.getElementById('mediaPreviewModal').classList.add('show');}
function localizeRoomName(name,type){if(type==='global'){const clean=String(name||'').replace(/^#\s*/,'');if(['Общий чат','Общий чат команды','General chat','Team group chat','Yleinen keskustelu','Tiimin yhteinen keskustelu'].includes(clean))return t('Общий чат');}return name||'';}
function localizeSeededOnboarding(value){const map={
'1. Добро пожаловать в команду':'1. Добро пожаловать в команду','Знакомство с компанией и командой':'Знакомство с компанией и командой','2. Основы работы':'2. Основы работы','Правила, инструменты и основные процессы':'Правила, инструменты и основные процессы','3. Пройти базовое обучение':'3. Пройти базовое обучение','Уроки и материалы':'Уроки и материалы','4. Выполнить первое задание':'4. Выполнить первое задание','Практическая часть':'Практическая часть','5. Встреча с руководителем':'5. Встреча с руководителем','Подведение итогов адаптации':'Подведение итогов адаптации'};return map[value]?t(map[value]):value;}

const I18N={
en:{'Главная':'Home','Запуск новичка':'Newcomer onboarding','Школа':'School','Мероприятия':'Events','Задачи':'Tasks','Команда':'Team','Материалы':'Materials','Файлы и медиа':'Files & media','Чат':'Chat','Помощник':'Assistant','Управление':'Management','Мой профиль':'My profile','Настройки':'Settings','Выйти':'Sign out','Поиск...':'Search...','Курсы и обучение.':'Courses and training.','Пошаговая программа адаптации.':'Step-by-step onboarding program.','Участники пространства.':'Workspace members.','Контроль выполнения.':'Task tracking.','Встречи и события.':'Meetings and events.','Внутреннее пространство команды':'Internal team workspace','Курсов пока нет':'No courses yet','Нет мероприятий':'No events','Нет задач':'No tasks','Нет участников':'No members','Пока пусто':'Nothing here yet','Загрузка...':'Loading...','Новый курс':'New course','+ Новый курс':'+ New course','+ Создать':'+ Create','+ Новая задача':'+ New task','+ Пригласить':'+ Invite','+ Добавить':'+ Add','+ Загрузить':'+ Upload','+ Добавить этап':'+ Add step','Название':'Title','Краткое описание':'Short description','Описание':'Description','Информация':'Information','Содержание / инструкция':'Content / instructions','Ссылки':'Links','Вложения':'Attachments','Файлы / фото / видео':'Files / photos / videos','Дата':'Date','Время':'Time','Место':'Location','Онлайн':'Online','Не в сети':'Offline','Отмена':'Cancel','Закрыть':'Close','Сохранить':'Save','Создать':'Create','Добавить':'Add','Опубликовать':'Publish','Редактировать':'Edit','Удалить':'Delete','Удалить курс':'Delete course','Мой прогресс':'My progress','Готово':'Done','В процессе':'In progress','Новый этап':'New step','Редактировать этап':'Edit step','Мероприятие':'Event','Редактировать мероприятие':'Edit event','Новый курс / учебный материал':'New course / training material','Редактировать курс':'Edit course','Курсов пока нет. Админ может добавить.':'No courses yet. An authorized user can add one.','Нет мероприятий':'No events','Этапов пока нет':'No onboarding steps yet','Язык / Language / Kieli':'Language','Русский':'Russian','Прочитать все':'Mark all read','Уведомления':'Notifications','Нет уведомлений':'No notifications','Название и дата обязательны':'Title and date are required','Введите название':'Enter a title','Заполните название и дату':'Enter a title and date','Удалить курс?':'Delete this course?','Удалить мероприятие?':'Delete this event?','Удалить этап? Это удалит его из программы для всей команды.':'Delete this step? It will be removed from the program for the whole team.','Владелец / Главный администратор':'Owner / Main administrator','Со-администратор':'Co-administrator','Наставник':'Mentor','Участник':'Member','Разрешения':'Permissions','Полный доступ':'Full access','Добавлять и управлять курсами':'Create and manage courses','Редактировать программу новичка':'Edit onboarding program','Управлять материалами':'Manage materials','Управлять файлами':'Manage files','Личное сообщение':'Private message','Запуск новичка':'Newcomer onboarding','Пройдено':'Completed','Открыть':'Open','Скачать':'Download','Удалить файл?':'Delete file?','Файлы':'Files','Фото':'Photos','Видео':'Videos','Сообщение...':'Message...','Личный чат':'Private chat','Общий чат команды':'Team group chat','Приватный чат':'Private chat','Нет чатов':'No chats','Не удалось загрузить':'Could not load','Ошибка':'Error','Обычный':'Normal','Важный':'High','Назначить':'Assign','Приоритет':'Priority','Срок':'Due date','Подробное описание':'Detailed description','Новая задача':'New task','Создать приглашение':'Create invitation','Пригласить коллегу':'Invite colleague','Роль':'Role','Пользователи и права доступа':'Users and permissions'},
fi:{'Главная':'Etusivu','Запуск новичка':'Uuden jäsenen perehdytys','Школа':'Koulutus','Мероприятия':'Tapahtumat','Задачи':'Tehtävät','Команда':'Tiimi','Материалы':'Materiaalit','Файлы и медиа':'Tiedostot ja media','Чат':'Keskustelu','Помощник':'Avustaja','Управление':'Hallinta','Мой профиль':'Oma profiili','Настройки':'Asetukset','Выйти':'Kirjaudu ulos','Поиск...':'Haku...','Курсы и обучение.':'Kurssit ja koulutus.','Пошаговая программа адаптации.':'Vaiheittainen perehdytysohjelma.','Участники пространства.':'Työtilan jäsenet.','Контроль выполнения.':'Tehtävien seuranta.','Встречи и события.':'Tapaamiset ja tapahtumat.','Внутреннее пространство команды':'Tiimin sisäinen työtila','Курсов пока нет':'Ei kursseja vielä','Нет мероприятий':'Ei tapahtumia','Нет задач':'Ei tehtäviä','Нет участников':'Ei jäseniä','Пока пусто':'Ei sisältöä vielä','Загрузка...':'Ladataan...','Новый курс':'Uusi kurssi','+ Новый курс':'+ Uusi kurssi','+ Создать':'+ Luo','+ Новая задача':'+ Uusi tehtävä','+ Пригласить':'+ Kutsu','+ Добавить':'+ Lisää','+ Загрузить':'+ Lataa','+ Добавить этап':'+ Lisää vaihe','Название':'Nimi','Краткое описание':'Lyhyt kuvaus','Описание':'Kuvaus','Информация':'Tiedot','Содержание / инструкция':'Sisältö / ohjeet','Ссылки':'Linkit','Вложения':'Liitteet','Файлы / фото / видео':'Tiedostot / kuvat / videot','Дата':'Päivämäärä','Время':'Aika','Место':'Paikka','Онлайн':'Verkossa','Не в сети':'Poissa linjoilta','Отмена':'Peruuta','Закрыть':'Sulje','Сохранить':'Tallenna','Создать':'Luo','Добавить':'Lisää','Опубликовать':'Julkaise','Редактировать':'Muokkaa','Удалить':'Poista','Удалить курс':'Poista kurssi','Мой прогресс':'Oma edistyminen','Готово':'Valmis','В процессе':'Kesken','Новый этап':'Uusi vaihe','Редактировать этап':'Muokkaa vaihetta','Мероприятие':'Tapahtuma','Редактировать мероприятие':'Muokkaa tapahtumaa','Новый курс / учебный материал':'Uusi kurssi / koulutusmateriaali','Редактировать курс':'Muokkaa kurssia','Курсов пока нет. Админ может добавить.':'Ei kursseja vielä. Valtuutettu käyttäjä voi lisätä kurssin.','Этапов пока нет':'Perehdytysvaiheita ei ole vielä','Язык / Language / Kieli':'Kieli','Русский':'Venäjä','Прочитать все':'Merkitse kaikki luetuiksi','Уведомления':'Ilmoitukset','Нет уведомлений':'Ei ilmoituksia','Название и дата обязательны':'Nimi ja päivämäärä ovat pakollisia','Введите название':'Anna nimi','Заполните название и дату':'Anna nimi ja päivämäärä','Удалить курс?':'Poistetaanko kurssi?','Удалить мероприятие?':'Poistetaanko tapahtuma?','Удалить этап? Это удалит его из программы для всей команды.':'Poistetaanko vaihe? Se poistetaan koko tiimin perehdytysohjelmasta.','Владелец / Главный администратор':'Omistaja / Pääylläpitäjä','Со-администратор':'Apuylläpitäjä','Наставник':'Mentori','Участник':'Jäsen','Разрешения':'Oikeudet','Полный доступ':'Täysi käyttöoikeus','Добавлять и управлять курсами':'Luo ja hallitse kursseja','Редактировать программу новичка':'Muokkaa perehdytysohjelmaa','Управлять материалами':'Hallitse materiaaleja','Управлять файлами':'Hallitse tiedostoja','Личное сообщение':'Yksityisviesti','Пройдено':'Suoritettu','Открыть':'Avaa','Скачать':'Lataa','Удалить файл?':'Poistetaanko tiedosto?','Файлы':'Tiedostot','Фото':'Kuvat','Видео':'Videot','Сообщение...':'Viesti...','Личный чат':'Yksityiskeskustelu','Общий чат команды':'Tiimin yhteinen keskustelu','Приватный чат':'Yksityiskeskustelu','Нет чатов':'Ei keskusteluja','Не удалось загрузить':'Lataus epäonnistui','Ошибка':'Virhe','Обычный':'Normaali','Важный':'Tärkeä','Назначить':'Vastuuhenkilö','Приоритет':'Prioriteetti','Срок':'Määräaika','Подробное описание':'Tarkka kuvaus','Новая задача':'Uusi tehtävä','Создать приглашение':'Luo kutsu','Пригласить коллегу':'Kutsu kollega','Роль':'Rooli','Пользователи и права доступа':'Käyttäjät ja käyttöoikeudet'}
};
Object.assign(I18N.en,{"Главное": "MAIN", "Работа": "WORK", "Помощь": "HELP", "Доброе утро": "Good morning", "Добрый день": "Good afternoon", "Добрый вечер": "Good evening", "Ваше рабочее пространство. Пока пусто — добавьте задачи, файлы и коллег.": "Your workspace. Add tasks, files and colleagues to get started.", "участников": "members", "в хранилище": "in storage", "открытых": "open", "важных": "high priority", "предстоящих": "upcoming", "Быстрый старт": "Quick start", "Ближайшие мероприятия": "Upcoming events", "Все →": "All →", "Пока нет мероприятий": "No upcoming events", "Чаты": "Chats", "Групповой чат": "Group chat", "Техническая поддержка Alex Node": "Alex Node technical support", "Выберите чат": "Select a chat", "Отправить": "Send", "+ Личный чат": "+ Private chat", "Общий чат команды и личные переписки. Для паролей используйте защищённый менеджер паролей, а не обычный чат.": "Team group chat and private conversations. Use a secure password manager for passwords, not regular chat.", "Техническая поддержка S.P.A.C.E. напрямую от разработчика приложения.": "S.P.A.C.E. technical support directly from the application developer.", "Контакты поддержки": "Support contacts", "Напишите напрямую в Alex Node IT Support по вопросам работы S.P.A.C.E..": "Contact Alex Node IT Support directly about S.P.A.C.E.", "Открыть чат с IT Support": "Open IT Support chat", "О приложении": "About", "Все": "Everyone", "Участники": "Participants", "Выберите «Все» или конкретных сотрудников.": "Select “Everyone” or specific team members.", "Для кого мероприятие, о чём оно и нужно ли участие": "Who the event is for, what it is about, and whether attendance is required", "Файл": "File", "Прикрепить файл": "Attach file", "Важно": "High", "Обычная": "Normal", "Срок:": "Due:", "Назначено": "Assigned to", "Автор": "Created by", "Нет описания": "No description", "Удалить задачу": "Delete task", "Удалить задачу? Это действие нельзя отменить.": "Delete this task? This action cannot be undone.", "Материал": "Material", "Новый материал": "New material", "Текст материала": "Material text", "Иконка": "Icon", "Удалить материал": "Delete material", "Инструкции, документы, ссылки, изображения и видео.": "Instructions, documents, links, images and videos.", "Общее хранилище: документы, фото, видео и другие файлы.": "Shared storage: documents, photos, videos and other files.", "Все файлы": "All files", "Загрузить файлы": "Upload files", "В этом разделе пока пусто": "Nothing in this section yet", "Ошибка загрузки": "Loading error", "МБ": "MB", "Настройки": "Settings", "Язык / Language / Kieli": "Language", "Onboarding / Запуск новичка": "Onboarding", "Разрешения": "Permissions", "Управление рабочим пространством. Владелец бизнеса имеет главный уровень доступа.": "Workspace management. The business owner has the highest level of access.", "Хранилище": "Storage", "Участники и роли.": "Members and roles.", "Файлы, фото и видео команды.": "Team files, photos and videos.", "Владелец имеет полный доступ. Для со-администраторов можно включать только нужные разрешения.": "The owner has full access. Co-administrators can be given only the permissions they need.", "Спросить": "Ask", "Вопрос...": "Question...", "Здравствуйте!": "Hello!", "Чем помочь?": "How can I help?", "Где файлы и видео?": "Where are files and videos?", "Как написать лично?": "How do I send a private message?", "Как пригласить коллегу?": "How do I invite a colleague?", "Работа без интернета": "Working offline", "Подскажет, где найти разделы и материалы.": "Helps you find sections and materials."});
Object.assign(I18N.fi,{"Главное": "PÄÄVALIKKO", "Работа": "TYÖ", "Помощь": "OHJE", "Доброе утро": "Hyvää huomenta", "Добрый день": "Hyvää päivää", "Добрый вечер": "Hyvää iltaa", "Ваше рабочее пространство. Пока пусто — добавьте задачи, файлы и коллег.": "Työtilasi. Aloita lisäämällä tehtäviä, tiedostoja ja kollegoita.", "участников": "jäsentä", "в хранилище": "tallennettuna", "открытых": "avointa", "важных": "tärkeää", "предстоящих": "tulossa", "Быстрый старт": "Pika-aloitus", "Ближайшие мероприятия": "Tulevat tapahtumat", "Все →": "Kaikki →", "Пока нет мероприятий": "Ei tulevia tapahtumia", "Чаты": "Keskustelut", "Групповой чат": "Ryhmäkeskustelu", "Техническая поддержка Alex Node": "Alex Node tekninen tuki", "Выберите чат": "Valitse keskustelu", "Отправить": "Lähetä", "+ Личный чат": "+ Yksityiskeskustelu", "Общий чат команды и личные переписки. Для паролей используйте защищённый менеджер паролей, а не обычный чат.": "Tiimin yhteinen keskustelu ja yksityisviestit. Käytä salasanoille suojattua salasananhallintaa, älä tavallista keskustelua.", "Техническая поддержка S.P.A.C.E. напрямую от разработчика приложения.": "S.P.A.C.E.-sovelluksen tekninen tuki suoraan kehittäjältä.", "Контакты поддержки": "Tuen yhteystiedot", "Напишите напрямую в Alex Node IT Support по вопросам работы S.P.A.C.E..": "Ota yhteyttä Alex Node IT Supportiin S.P.A.C.E.-sovellusta koskevissa asioissa.", "Открыть чат с IT Support": "Avaa IT-tuen keskustelu", "О приложении": "Tietoja sovelluksesta", "Все": "Kaikki", "Участники": "Osallistujat", "Выберите «Все» или конкретных сотрудников.": "Valitse “Kaikki” tai tietyt tiimin jäsenet.", "Для кого мероприятие, о чём оно и нужно ли участие": "Kenelle tapahtuma on tarkoitettu, mistä siinä on kyse ja onko osallistuminen tarpeen", "Файл": "Tiedosto", "Прикрепить файл": "Liitä tiedosto", "Важно": "Tärkeä", "Обычная": "Normaali", "Срок:": "Määräaika:", "Назначено": "Vastuuhenkilö", "Автор": "Luonut", "Нет описания": "Ei kuvausta", "Удалить задачу": "Poista tehtävä", "Удалить задачу? Это действие нельзя отменить.": "Poistetaanko tehtävä? Toimintoa ei voi perua.", "Материал": "Materiaali", "Новый материал": "Uusi materiaali", "Текст материала": "Materiaalin teksti", "Иконка": "Kuvake", "Удалить материал": "Poista materiaali", "Инструкции, документы, ссылки, изображения и видео.": "Ohjeet, asiakirjat, linkit, kuvat ja videot.", "Общее хранилище: документы, фото, видео и другие файлы.": "Yhteinen tallennustila: asiakirjat, kuvat, videot ja muut tiedostot.", "Все файлы": "Kaikki tiedostot", "Загрузить файлы": "Lataa tiedostoja", "В этом разделе пока пусто": "Tässä osiossa ei ole vielä sisältöä", "Ошибка загрузки": "Latausvirhe", "МБ": "Mt", "Onboarding / Запуск новичка": "Perehdytys", "Управление рабочим пространством. Владелец бизнеса имеет главный уровень доступа.": "Työtilan hallinta. Yrityksen omistajalla on korkein käyttöoikeustaso.", "Хранилище": "Tallennustila", "Участники и роли.": "Jäsenet ja roolit.", "Файлы, фото и видео команды.": "Tiimin tiedostot, kuvat ja videot.", "Владелец имеет полный доступ. Для со-администраторов можно включать только нужные разрешения.": "Omistajalla on täydet oikeudet. Apuylläpitäjille voidaan antaa vain tarvittavat oikeudet.", "Спросить": "Kysy", "Вопрос...": "Kysymys...", "Здравствуйте!": "Hei!", "Чем помочь?": "Miten voin auttaa?", "Где файлы и видео?": "Missä tiedostot ja videot ovat?", "Как написать лично?": "Miten lähetän yksityisviestin?", "Как пригласить коллегу?": "Miten kutsun kollegan?", "Работа без интернета": "Työskentely ilman internetiä", "Подскажет, где найти разделы и материалы.": "Auttaa löytämään osiot ja materiaalit."});
Object.assign(I18N.en,{"Вход": "Sign in", "Пароль": "Password", "Войти": "Sign in", "Первый вход успешен. Создайте постоянный email и пароль — они будут использоваться всегда.": "First sign-in successful. Create your permanent email and password; they will be used from now on.", "Ваше имя": "Your name", "Постоянный email": "Permanent email", "Новый пароль": "New password", "Повторите пароль": "Repeat password", "Создать постоянный аккаунт": "Create permanent account", "Добрый день 👋": "Good afternoon 👋", "1. Загрузите материалы в «Файлы и медиа»": "1. Upload materials to “Files & media”", "2. Пригласите коллег в «Управление» (админ)": "2. Invite colleagues in “Management” (admin)", "3. Общайтесь в «Чат» — общий и личные": "3. Use “Chat” for group and private conversations", "4. Материалы доступны даже без интернета, если уже загружены на этот компьютер": "4. Materials already downloaded to this computer remain available offline", "Пока только вы": "Only you for now", "Общее хранилище: документы, фото, видео. Доступно всей команде. Уже загруженное работает и без интернета на этом компьютере.": "Shared storage for documents, photos and videos. Available to the whole team. Files already downloaded to this computer also work offline.", "Хранилище пусто. Загрузите первый файл.": "Storage is empty. Upload the first file.", "Live-доставка сообщений между разными компьютерами будет работать после подключения S.P.A.C.E. к общему серверу. На локальной версии чат сохраняется только на этом компьютере.": "Live message delivery between different computers will work after S.P.A.C.E. is connected to the shared server. In the local version, chat is stored only on this computer.", "Создать одноразовый вход для нового участника.": "Create a one-time sign-in for a new member.", "Создаётся одноразовый вход. Коллега войдёт и задаст свой постоянный email и пароль.": "A one-time sign-in is created. The colleague signs in and sets a permanent email and password.", "Email (необязательно, для подсказки)": "Email (optional, for reference)", "Администратор": "Administrator", "Выберите коллегу для приватной переписки.": "Select a colleague for a private conversation.", "Файлы, фото, видео, Word, Excel, PowerPoint, PDF": "Files, photos, videos, Word, Excel, PowerPoint, PDF", "Одна ссылка на строку": "One link per line", "Опишите задачу подробно...": "Describe the task in detail...", "Инструкция, заметки, обучение...": "Instructions, notes, training...", "Минимум 8 символов": "At least 8 characters", "Повторите новый пароль": "Repeat the new password", "важных": "high priority"});
Object.assign(I18N.fi,{"Вход": "Kirjaudu sisään", "Пароль": "Salasana", "Войти": "Kirjaudu sisään", "Первый вход успешен. Создайте постоянный email и пароль — они будут использоваться всегда.": "Ensimmäinen kirjautuminen onnistui. Luo pysyvä sähköposti ja salasana, joita käytetään jatkossa.", "Ваше имя": "Nimesi", "Постоянный email": "Pysyvä sähköposti", "Новый пароль": "Uusi salasana", "Повторите пароль": "Toista salasana", "Создать постоянный аккаунт": "Luo pysyvä tili", "Добрый день 👋": "Hyvää päivää 👋", "1. Загрузите материалы в «Файлы и медиа»": "1. Lataa materiaalit kohtaan “Tiedostot ja media”", "2. Пригласите коллег в «Управление» (админ)": "2. Kutsu kollegat kohdassa “Hallinta” (ylläpitäjä)", "3. Общайтесь в «Чат» — общий и личные": "3. Käytä “Keskustelu”-osiota ryhmä- ja yksityisviesteihin", "4. Материалы доступны даже без интернета, если уже загружены на этот компьютер": "4. Tälle tietokoneelle jo ladatut materiaalit toimivat myös ilman internetiä", "Пока только вы": "Toistaiseksi vain sinä", "Общее хранилище: документы, фото, видео. Доступно всей команде. Уже загруженное работает и без интернета на этом компьютере.": "Yhteinen tallennustila asiakirjoille, kuville ja videoille. Koko tiimin käytettävissä. Tälle tietokoneelle jo ladatut tiedostot toimivat myös ilman internetiä.", "Хранилище пусто. Загрузите первый файл.": "Tallennustila on tyhjä. Lataa ensimmäinen tiedosto.", "Live-доставка сообщений между разными компьютерами будет работать после подключения S.P.A.C.E. к общему серверу. На локальной версии чат сохраняется только на этом компьютере.": "Viestien reaaliaikainen toimitus eri tietokoneiden välillä toimii, kun S.P.A.C.E. liitetään yhteiseen palvelimeen. Paikallisessa versiossa keskustelu tallennetaan vain tälle tietokoneelle.", "Создать одноразовый вход для нового участника.": "Luo kertakäyttöinen kirjautuminen uudelle jäsenelle.", "Создаётся одноразовый вход. Коллега войдёт и задаст свой постоянный email и пароль.": "Luodaan kertakäyttöinen kirjautuminen. Kollegasi kirjautuu sisään ja määrittää pysyvän sähköpostin ja salasanan.", "Email (необязательно, для подсказки)": "Sähköposti (valinnainen)", "Администратор": "Ylläpitäjä", "Выберите коллегу для приватной переписки.": "Valitse kollega yksityiskeskusteluun.", "Файлы, фото, видео, Word, Excel, PowerPoint, PDF": "Tiedostot, kuvat, videot, Word, Excel, PowerPoint, PDF", "Одна ссылка на строку": "Yksi linkki per rivi", "Опишите задачу подробно...": "Kuvaile tehtävä tarkasti...", "Инструкция, заметки, обучение...": "Ohjeet, muistiinpanot, koulutus...", "Минимум 8 символов": "Vähintään 8 merkkiä", "Повторите новый пароль": "Toista uusi salasana", "важных": "tärkeää"});

Object.assign(I18N.en,{'Имя / Email':'Name / Email','Доступ':'Access','Владелец':'Owner','Роль':'Role','Разрешения':'Permissions','Срок:':'Due:','Описание':'Description','Назначено':'Assigned to','Автор':'Created by','Нет описания':'No description','Удалить задачу':'Delete task','Удалить задачу? Это действие нельзя отменить.':'Delete task? This action cannot be undone.','Обычные права роли':'Standard role permissions','Файлы':'Files','Школа':'School','Onboarding':'Onboarding'});
Object.assign(I18N.fi,{'Имя / Email':'Nimi / Sähköposti','Доступ':'Käyttöoikeus','Владелец':'Omistaja','Роль':'Rooli','Разрешения':'Oikeudet','Срок:':'Määräaika:','Описание':'Kuvaus','Назначено':'Vastuuhenkilö','Автор':'Luonut','Нет описания':'Ei kuvausta','Удалить задачу':'Poista tehtävä','Удалить задачу? Это действие нельзя отменить.':'Poistetaanko tehtävä? Toimintoa ei voi perua.','Обычные права роли':'Roolin normaalit oikeudet','Файлы':'Tiedostot','Школа':'Koulutus','Onboarding':'Perehdytys'});
Object.assign(I18N.en,{'Общий чат':'General chat','Групповой чат':'Group chat','1. Добро пожаловать в команду':'1. Welcome to the team','Знакомство с компанией и командой':'Introduction to the company and team','2. Основы работы':'2. Work basics','Правила, инструменты и основные процессы':'Rules, tools and core processes','3. Пройти базовое обучение':'3. Complete basic training','Уроки и материалы':'Lessons and materials','4. Выполнить первое задание':'4. Complete the first task','Практическая часть':'Practical part','5. Встреча с руководителем':'5. Meeting with the manager','Подведение итогов адаптации':'Onboarding review','Личный чат':'Private chat'});
Object.assign(I18N.fi,{'Общий чат':'Yleinen keskustelu','Групповой чат':'Ryhmäkeskustelu','1. Добро пожаловать в команду':'1. Tervetuloa tiimiin','Знакомство с компанией и командой':'Tutustuminen yritykseen ja tiimiin','2. Основы работы':'2. Työn perusteet','Правила, инструменты и основные процессы':'Säännöt, työkalut ja keskeiset prosessit','3. Пройти базовое обучение':'3. Suorita peruskoulutus','Уроки и материалы':'Oppitunnit ja materiaalit','4. Выполнить первое задание':'4. Suorita ensimmäinen tehtävä','Практическая часть':'Käytännön osuus','5. Встреча с руководителем':'5. Tapaaminen esihenkilön kanssa','Подведение итогов адаптации':'Perehdytyksen yhteenveto','Личный чат':'Yksityiskeskustelu'});


Object.assign(I18N.en,{'Новости S.P.A.C.E.':'S.P.A.C.E. News','Объявления компании и обновления приложения.':'Company announcements and application updates.','+ Новость':'+ News','Новостей пока нет':'No news yet','Новая новость':'New post','Редактировать новость':'Edit post','Заголовок':'Title','Категория':'Category','Компания':'Company','Обновление':'Update','Текст новости':'News text','Закрепить новость сверху':'Pin news to top','Опубликовать':'Publish','Заполните заголовок и текст':'Enter a title and text','Удалить новость?':'Delete this news post?','Новость больше недоступна':'This news post is no longer available','Открыть новость':'Open news','Онлайн':'Online','Не в сети':'Offline','Нет участников':'No members','Ссылки':'Links','Вложения':'Attachments','Нет уведомлений':'No notifications','Ошибка загрузки':'Loading error','В этом разделе пока пусто':'Nothing in this section yet','Открыть':'Open','Скачать':'Download','Удалить':'Delete','Удалить файл?':'Delete file?','Нет других участников. Пригласите коллег.':'No other members. Invite a colleague.','Пользователи':'Users','Контент':'Content','События':'Events','Сбросить пароль':'Reset password','Создать одноразовый временный пароль для этого пользователя? Старый пароль перестанет работать.':'Create a one-time temporary password for this user? The old password will stop working.','Сессия истекла':'Session expired','Ошибка входа':'Sign-in error','Пароли не совпадают':'Passwords do not match','Загрузка':'Uploading','из':'of','Этот тип файла открывается программой, установленной на компьютере, либо скачивается как копия.':'This file type opens with an application installed on the computer, or can be downloaded as a copy.','влож.':'attachments'});
Object.assign(I18N.fi,{'Онлайн':'Verkossa','Не в сети':'Poissa linjoilta','Нет участников':'Ei jäseniä','Ссылки':'Linkit','Вложения':'Liitteet','Нет уведомлений':'Ei ilmoituksia','Ошибка загрузки':'Latausvirhe','В этом разделе пока пусто':'Tässä osiossa ei ole vielä sisältöä','Открыть':'Avaa','Скачать':'Lataa','Удалить':'Poista','Удалить файл?':'Poistetaanko tiedosto?','Нет других участников. Пригласите коллег.':'Ei muita jäseniä. Kutsu kollega.','Пользователи':'Käyttäjät','Контент':'Sisältö','События':'Tapahtumat','Сбросить пароль':'Nollaa salasana','Создать одноразовый временный пароль для этого пользователя? Старый пароль перестанет работать.':'Luodaanko tälle käyttäjälle kertakäyttöinen väliaikainen salasana? Vanha salasana lakkaa toimimasta.','Сессия истекла':'Istunto on vanhentunut','Ошибка входа':'Kirjautumisvirhe','Пароли не совпадают':'Salasanat eivät täsmää','Загрузка':'Ladataan','из':'/','Этот тип файла открывается программой, установленной на компьютере, либо скачивается как копия.':'Tämä tiedostotyyppi avataan tietokoneelle asennetulla ohjelmalla tai ladataan kopiona.','влож.':'liitettä'});

Object.assign(I18N.en,{'Это вы':'You','Должность':'Position','Системная роль':'System role','Должность / функция':'Position / job title','Участник команды':'Team Member','Полный доступ':'Full access','Приостановить':'Suspend','Восстановить доступ':'Restore access','Удалить аккаунт':'Remove account','Приостановлен':'Suspended','Введите пароль владельца для подтверждения':'Enter the Owner password to confirm','Администратор':'Administrator','Техническая поддержка Alex Node':'Alex Node IT Support','Приватный чат':'Private chat','Общий чат команды':'Team group chat'});
Object.assign(I18N.fi,{'Это вы':'Sinä','Должность':'Tehtävänimike','Системная роль':'Järjestelmärooli','Должность / функция':'Tehtävänimike / tehtävä','Участник команды':'Tiimin jäsen','Полный доступ':'Täysi käyttöoikeus','Приостановить':'Keskeytä käyttöoikeus','Восстановить доступ':'Palauta käyttöoikeus','Удалить аккаунт':'Poista tili','Приостановлен':'Keskeytetty','Введите пароль владельца для подтверждения':'Vahvista antamalla omistajan salasana','Администратор':'Ylläpitäjä','Техническая поддержка Alex Node':'Alex Node IT-tuki','Приватный чат':'Yksityiskeskustelu','Общий чат команды':'Tiimin yhteinen keskustelu'});
Object.assign(I18N.en,{'Адаптация завершена':'Onboarding completed'});
Object.assign(I18N.fi,{'Адаптация завершена':'Perehdytys suoritettu'});
const originalText=new WeakMap(), originalPlaceholder=new WeakMap(), originalTitle=new WeakMap();

Object.assign(I18N.en,{'Технический администратор / IT Support':'Technical Administrator / IT Support','Содержимое закрыто':'Content locked','Доступ к общему чату должен разрешить владелец':'The Owner must grant IT Support access to the group chat','Доступ не предоставлен':'Access not granted','Читать содержимое файлов':'Read file contents','Доступ IT Support к новым сообщениям общего чата':'IT Support access to new group-chat messages'});
Object.assign(I18N.fi,{'Технический администратор / IT Support':'Tekninen ylläpitäjä / IT-tuki','Содержимое закрыто':'Sisältö lukittu','Доступ к общему чату должен разрешить владелец':'Omistajan on annettava IT-tuelle pääsy yhteiseen keskusteluun','Доступ не предоставлен':'Pääsyä ei myönnetty','Читать содержимое файлов':'Lue tiedostojen sisältöä','Доступ IT Support к новым сообщениям общего чата':'IT-tuen pääsy uusiin yhteisen keskustelun viesteihin'});
function t(key,lang=currentUser?.language||'ru'){if(lang==='ru')return key;const hit=I18N[lang]?.[key];if(hit)return hit;const m=String(key).match(/^([^A-Za-zА-Яа-яЁё0-9+]*)(.+)$/);if(m&&m[1]&&I18N[lang]?.[m[2]])return m[1]+I18N[lang][m[2]];return key;}
Object.assign(I18N.en,{'Выбрать emoji':'Choose emoji','Загрузка предпросмотра':'Loading preview','Предпросмотр для этого типа файла недоступен. Файл можно скачать.':'Preview is unavailable for this file type. You can still download it.','Не удалось создать предпросмотр':'Could not create preview'});
Object.assign(I18N.fi,{'Выбрать emoji':'Valitse emoji','Загрузка предпросмотра':'Esikatselua ladataan','Предпросмотр для этого типа файла недоступен. Файл можно скачать.':'Tälle tiedostotyypille ei ole esikatselua. Voit silti ladata tiedoston.','Не удалось создать предпросмотр':'Esikatselua ei voitu luoda'});
function applyLanguage(lang='ru'){
  document.documentElement.lang=lang; currentUser.language=lang;
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=walker.nextNode()){if(['SCRIPT','STYLE'].includes(n.parentElement?.tagName))continue;if(!originalText.has(n))originalText.set(n,n.nodeValue);const original=originalText.get(n);const trimmed=original.trim();if(!trimmed)continue;const translated=t(trimmed,lang);n.nodeValue=original.replace(trimmed,translated);}
  document.querySelectorAll('[placeholder]').forEach(el=>{if(!originalPlaceholder.has(el))originalPlaceholder.set(el,el.getAttribute('placeholder'));el.setAttribute('placeholder',t(originalPlaceholder.get(el),lang));});
  document.querySelectorAll('[title]').forEach(el=>{if(!originalTitle.has(el))originalTitle.set(el,el.getAttribute('title'));el.setAttribute('title',t(originalTitle.get(el),lang));});
  const role=document.getElementById('headerRole');if(role&&currentUser)role.textContent=t(roleLabels[currentUser.role]||currentUser.role,lang);
  const dg=document.getElementById('dashGreeting');if(dg&&currentUser){const h=new Date().getHours(),g=h<12?'Доброе утро':h<18?'Добрый день':'Добрый вечер';dg.textContent=`${t(g,lang)}, ${currentUser.name.split(' ')[0]} 👋`;}
}
let i18nTimer;const i18nObserver=new MutationObserver(()=>{clearTimeout(i18nTimer);i18nTimer=setTimeout(()=>{const a=document.activeElement;const editing=isEditableControl(a)||Date.now()<editorFocusGuardUntil;if(currentUser?.language&&!editing)applyLanguage(currentUser.language)},180)});i18nObserver.observe(document.body,{childList:true,subtree:true});

// ============ ALEX NODE SUPPORT ============
async function loadSupport() {
  try {
    const info = await api('/api/support');
    // Contact information is also present statically so support remains visible offline.
    return info;
  } catch { return null; }
}

async function openSupportChat() {
  try {
    const rooms = await api('/api/rooms');
    const supportRooms = rooms.filter(r => r.type === 'support');
    openPage('chat');
    // For a regular employee there is exactly one private support thread: open it directly.
    if (currentUser?.role !== 'technical_admin' && supportRooms.length) {
      const room = supportRooms[0];
      return setTimeout(() => joinRoom(room.id, room.display_name || room.name, 'support'), 100);
    }
    // IT Support must never try to create/open a chat with itself. It sees one private
    // support thread per employee in the chat list and chooses the required request there.
    if (currentUser?.role === 'technical_admin') {
      setTimeout(() => loadRooms(), 100);
      return;
    }
    // If an employee has no thread yet, reloading rooms creates the personal support thread server-side.
    setTimeout(async () => {
      await loadRooms();
      const refreshed = await api('/api/rooms');
      const room = refreshed.find(r => r.type === 'support');
      if (room) joinRoom(room.id, room.display_name || room.name, 'support');
    }, 100);
  } catch {
    alert(t('Нет соединения с чатом') + '. an@alexnode.fi | +358 45 852 5293');
  }
}

// ============ ASSISTANT ============
function askBot(q) {
  const a=document.getElementById('botAnswer'); const raw=String(q||'').toLowerCase();
  let key='assistant.default';
  if(/файл|видео|file|video|tiedosto|videot?/.test(raw))key='assistant.files';
  else if(/чат|личн|chat|private|keskust|yksityis/.test(raw))key='assistant.chat';
  else if(/команд|приглас|team|invite|tiimi|kutsu/.test(raw))key='assistant.invite';
  else if(/оффлайн|интернет|offline|internet|verkko/.test(raw))key='assistant.offline';
  const answers={
    ru:{'assistant.files':'<strong>📁 Файлы и медиа</strong><br><br>В разделе «Файлы и медиа» находятся файлы, фото и видео команды. Используйте кнопку «+ Загрузить» для добавления файлов.','assistant.chat':'<strong>💬 Чаты</strong><br><br>В разделе «Чат» есть общий чат и личные переписки с коллегами.','assistant.invite':'<strong>👥 Приглашение</strong><br><br>Откройте «Управление» → «Пригласить коллегу». Новый участник войдёт по временным данным и создаст постоянный пароль.','assistant.offline':'<strong>📴 Без интернета</strong><br><br>Уже загруженные на этот компьютер материалы доступны локально. Чат и синхронизация между компьютерами требуют интернет.','assistant.default':'Спросите про файлы, чат, приглашения или работу без интернета.'},
    en:{'assistant.files':'<strong>📁 Files & media</strong><br><br>The “Files & media” section contains team files, photos and videos. Use “+ Upload” to add files.','assistant.chat':'<strong>💬 Chats</strong><br><br>The “Chat” section contains the team group chat and private conversations with colleagues.','assistant.invite':'<strong>👥 Invitation</strong><br><br>Open “Management” → “Invite colleague”. The new member signs in with temporary credentials and creates a permanent password.','assistant.offline':'<strong>📴 Working offline</strong><br><br>Materials already downloaded to this computer remain available locally. Chat and synchronization between computers require internet.','assistant.default':'Ask about files, chat, invitations or working offline.'},
    fi:{'assistant.files':'<strong>📁 Tiedostot ja media</strong><br><br>“Tiedostot ja media” -osiossa ovat tiimin tiedostot, kuvat ja videot. Lisää tiedostoja painikkeella “+ Lataa”.','assistant.chat':'<strong>💬 Keskustelut</strong><br><br>“Keskustelu”-osiossa ovat tiimin yhteinen keskustelu ja yksityiskeskustelut kollegoiden kanssa.','assistant.invite':'<strong>👥 Kutsu</strong><br><br>Avaa “Hallinta” → “Kutsu kollega”. Uusi jäsen kirjautuu väliaikaisilla tunnuksilla ja luo pysyvän salasanan.','assistant.offline':'<strong>📴 Työskentely ilman internetiä</strong><br><br>Tälle tietokoneelle jo ladatut materiaalit toimivat paikallisesti. Keskustelu ja tietokoneiden välinen synkronointi vaativat internetyhteyden.','assistant.default':'Kysy tiedostoista, keskusteluista, kutsuista tai työskentelystä ilman internetiä.'}
  }; a.innerHTML=(answers[currentUser?.language||'ru']||answers.ru)[key];
}
function customBotQuestion(){const q=document.getElementById('botInput').value.trim();if(!q)return;askBot(q);document.getElementById('botInput').value='';}

// Keep role/permissions synchronized across LAN clients while the app is open.
setInterval(async()=>{
  if(!token || !currentUser) return;
  try {
    const live=await api('/api/me');
    const changed=live.role!==currentUser.role || JSON.stringify(live.permissions||{})!==JSON.stringify(currentUser.permissions||{});
    currentUser=live; localStorage.setItem('ts_user',JSON.stringify(currentUser));
    if(changed){
      document.getElementById('headerRole').textContent=roleLabels[currentUser.role]||currentUser.role;
      const isAdmin=['owner','admin'].includes(currentUser.role);
      document.querySelectorAll('.admin-only').forEach(el=>{el.classList.toggle('show',isAdmin);el.style.display=isAdmin?'block':'none';});
      const active=document.querySelector('.page.active');
      if(active?.id==='events') loadEvents();
      if(active?.id==='school') loadCourses();
      if(active?.id==='onboarding') loadOnboarding();
      if(active?.id==='admin') loadAdminUsers();
    }
  }catch(e){}
},5000);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// ===== Online preview presentation login =====
// Show the real login screen, visibly fill the isolated preview credentials,
// then sign in automatically. This is intentionally limited to the preview build.
async function runPreviewAutoLogin(){
  if(token) return;
  const email=document.getElementById('loginEmail');
  const password=document.getElementById('loginPassword');
  const form=document.getElementById('loginForm');
  if(!email||!password||!form) return;
  const typeInto=async(el,value)=>{
    el.focus(); el.value='';
    for(const ch of value){ el.value+=ch; el.dispatchEvent(new Event('input',{bubbles:true})); await new Promise(r=>setTimeout(r,35)); }
  };
  await new Promise(r=>setTimeout(r,650));
  await typeInto(email,'olga.preview@space.local');
  await typeInto(password,'SPACEpreview2026!');
  await new Promise(r=>setTimeout(r,500));
  form.requestSubmit();
}

(async function init() {
  if (token) {
    try {
      currentUser = await api('/api/me');
      if (currentUser.must_complete_registration) {
        document.getElementById('authScreen').style.display = 'flex';
        document.getElementById('loginForm').style.display = 'none';
            document.getElementById('authTabs').style.display = 'none';
        document.getElementById('completeForm').style.display = 'block';
        return;
      }
      showApp();
    } catch { logout(); setTimeout(runPreviewAutoLogin,250); }
  } else {
    runPreviewAutoLogin();
  }
})();


Object.assign(I18N.fi,{'Новости S.P.A.C.E.':'S.P.A.C.E.-uutiset','Объявления компании и обновления приложения.':'Yrityksen tiedotteet ja sovelluspäivitykset.','+ Новость':'+ Uutinen','Новостей пока нет':'Ei uutisia vielä','Новая новость':'Uusi uutinen','Редактировать новость':'Muokkaa uutista','Заголовок':'Otsikko','Категория':'Luokka','Компания':'Yritys','Обновление':'Päivitys','Текст новости':'Uutisteksti','Закрепить новость сверху':'Kiinnitä uutinen ylös','Опубликовать':'Julkaise','Заполните заголовок и текст':'Anna otsikko ja teksti','Удалить новость?':'Poistetaanko uutinen?','Новость больше недоступна':'Uutinen ei ole enää saatavilla','Открыть новость':'Avaa uutinen'});
// ============ DASHBOARD NEWS / ANNOUNCEMENTS ============
function canManageNewsClient(){return currentUser && (currentUser.role==='owner'||currentUser.role==='technical_admin');}
function newsCategoryLabel(c){const m={company:'Компания',important:'Важно',update:'Обновление',it:'IT',announcement:'Объявление',team:'Команда',training:'Обучение',project:'Проект',client:'Клиенты',external:'Внешние новости',reminder:'Напоминание',success:'Достижения',other:'Другое'};return t(m[c]||'Другое');}
function newsDate(v){try{return new Date(v).toLocaleString(currentUser?.language==='fi'?'fi-FI':currentUser?.language==='en'?'en-GB':'ru-RU',{dateStyle:'medium',timeStyle:'short'});}catch{return '';}}
async function loadDashboardNews(){
  const box=document.getElementById('dashNews'); if(!box)return;
  const add=document.getElementById('addNewsBtn'); if(add)add.style.display=canManageNewsClient()?'inline-flex':'none';
  try{const list=await api('/api/news');
    box.innerHTML=list.length?list.slice(0,5).map(n=>`<div class="news-item" role="button" tabindex="0" onclick="openNews('${n.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openNews('${n.id}')}" title="${esc(t('Открыть новость'))}"><div><div class="news-title-row">${n.pinned?'<span class="news-pin">📌</span>':''}<h4>${esc(n.title)}</h4><span class="news-tag ${esc(n.category||'company')}">${esc(newsCategoryLabel(n.category))}</span></div><div class="news-preview">${esc((n.content||'').length>220?(n.content||'').slice(0,220)+'…':(n.content||''))}</div></div><div class="news-meta">${esc(n.author_name||'S.P.A.C.E.')}<br>${esc(newsDate(n.created_at))}</div></div>`).join(''):`<div class="empty">${t('Новостей пока нет')}</div>`;
  }catch(e){console.error('News load failed',e);box.innerHTML=`<div class="empty">${t('Ошибка загрузки')}</div>`;}
}
function showNewsModal(n={}){if(!canManageNewsClient())return;document.getElementById('newsModal').dataset.editId=n.id||'';document.getElementById('newsModalTitle').textContent=n.id?t('Редактировать новость'):t('Новая новость');document.getElementById('newsTitle').value=n.title||'';document.getElementById('newsContent').value=n.content||'';document.getElementById('newsCategory').value=n.category||'company';document.getElementById('newsPinned').checked=!!n.pinned;document.getElementById('newsVideoLink').value=n.video_link||'';document.getElementById('newsFiles').value='';document.getElementById('newsModal').classList.add('show');setTimeout(()=>document.getElementById('newsTitle')?.focus(),60);}
async function saveNews(){const title=document.getElementById('newsTitle').value.trim(),content=document.getElementById('newsContent').value.trim();if(!title||!content)return alert(t('Заполните заголовок и текст'));const id=document.getElementById('newsModal').dataset.editId;const fd=new FormData();fd.append('title',title);fd.append('content',content);fd.append('category',document.getElementById('newsCategory').value);fd.append('pinned',document.getElementById('newsPinned').checked?'true':'false');fd.append('video_link',document.getElementById('newsVideoLink').value.trim());Array.from(document.getElementById('newsFiles').files||[]).forEach(f=>fd.append('attachments',f));await api(id?'/api/news/'+id:'/api/news',{method:id?'PATCH':'POST',body:fd,headers:{}});hideModal('newsModal');await loadDashboardNews();await loadNotifications();}
function normalizeVideoUrl(raw){try{const u=new URL(String(raw||'').trim());return /^https?:$/.test(u.protocol)?u.href:'';}catch{return '';}}
function videoEmbedInfo(raw){const url=normalizeVideoUrl(raw);if(!url)return null;let m;
  if((m=url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)))return {url,embed:`https://www.youtube.com/embed/${m[1]}`,kind:'iframe',host:'YouTube'};
  if((m=url.match(/vimeo\.com\/(?:video\/)?(\d+)/)))return {url,embed:`https://player.vimeo.com/video/${m[1]}`,kind:'iframe',host:'Vimeo'};
  if((m=url.match(/(?:dailymotion\.com\/video\/|dai\.ly\/)([A-Za-z0-9]+)/)))return {url,embed:`https://www.dailymotion.com/embed/video/${m[1]}`,kind:'iframe',host:'Dailymotion'};
  if(/\.(mp4|webm|ogg|m4v|mov)(?:[?#]|$)/i.test(url))return {url,embed:url,kind:'video',host:new URL(url).hostname};
  return {url,embed:url,kind:'website',host:new URL(url).hostname.replace(/^www\./,'')};
}
function toggleNewsVideoPlayer(id){const el=document.getElementById(id);if(!el)return;el.classList.toggle('show');}
function newsVideoPreview(raw){const v=videoEmbedInfo(raw);if(!v)return'';const safe=esc(v.url),playerId='newsVideo_'+Math.random().toString(36).slice(2);let player='';
  if(v.kind==='video')player=`<video class="news-video-frame" controls preload="metadata" src="${esc(v.embed)}"></video>`;
  else player=`<iframe class="news-video-frame" src="${esc(v.embed)}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  return `<div class="detail-section news-video-card"><div class="news-video-card-head"><div><b>🎬 ${t('Видео')}</b><div class="news-video-source">${esc(v.host)}</div></div><div class="news-video-actions"><button type="button" class="btn btn-light" onclick="toggleNewsVideoPlayer('${playerId}')">▶ ${t('Смотреть в S.P.A.C.E.')}</button><a class="btn btn-light" href="${safe}" target="_blank" rel="noopener noreferrer">↗ ${t('Открыть на сайте')}</a></div></div><div id="${playerId}" class="news-video-inline show">${player}<div class="news-video-fallback">${t('Если сайт запрещает встроенный просмотр, откройте видео на сайте.')}</div></div></div>`;}

function insertNewsEmoji(e){const ta=document.getElementById('newsContent');const a=ta.selectionStart??ta.value.length,b=ta.selectionEnd??a;ta.value=ta.value.slice(0,a)+e+ta.value.slice(b);ta.focus();ta.selectionStart=ta.selectionEnd=a+e.length;}
function toggleNewsEmojiPicker(){document.getElementById('newsEmojiPicker')?.classList.toggle('show');}
async function openNews(id){try{const n=await api('/api/news/'+id);const can=canManageNewsClient();document.getElementById('newsDetailBox').innerHTML=`<div class="news-title-row">${n.pinned?'<span class="news-pin">📌</span>':''}<h2>${esc(n.title)}</h2><span class="news-tag ${esc(n.category||'company')}">${esc(newsCategoryLabel(n.category))}</span></div><div class="news-detail-meta">${esc(n.author_name||'S.P.A.C.E.')} · ${esc(newsDate(n.created_at))}</div><div class="news-detail-text">${esc(n.content||'')}</div>${newsVideoPreview(n.video_link)}${renderAttachments(n.attachments||[])}<div class="modal-buttons">${can?`<button class="btn btn-light" onclick="editNews('${n.id}')">${t('Редактировать')}</button><button class="btn btn-danger" onclick="deleteNews('${n.id}')">${t('Удалить')}</button>`:''}<button class="btn btn-light" onclick="hideModal('newsDetailModal')">${t('Закрыть')}</button></div>`;document.getElementById('newsDetailModal').classList.add('show');}catch(e){alert(t('Новость больше недоступна'));}}
async function editNews(id){const n=await api('/api/news/'+id);hideModal('newsDetailModal');showNewsModal(n);}
async function deleteNews(id){if(!confirm(t('Удалить новость?')))return;await api('/api/news/'+id,{method:'DELETE'});hideModal('newsDetailModal');loadDashboardNews();}

Object.assign(I18N.en,{'Закрыть чат':'Close chat','Объявление':'Announcement','Обучение':'Training','Проект':'Project','Клиенты':'Clients','Внешние новости':'External news','Напоминание':'Reminder','Достижения':'Achievements','Другое':'Other','Открыть видео':'Open video','Видео / ссылка':'Video / link','Добавить emoji':'Add emoji','Видео':'Video','Смотреть в S.P.A.C.E.':'Watch in S.P.A.C.E.','Открыть на сайте':'Open on website','Если сайт запрещает встроенный просмотр, откройте видео на сайте.':'If the website blocks embedded playback, open the video on its website.'});Object.assign(I18N.fi,{'Закрыть чат':'Sulje keskustelu','Объявление':'Ilmoitus','Обучение':'Koulutus','Проект':'Projekti','Клиенты':'Asiakkaat','Внешние новости':'Ulkoiset uutiset','Напоминание':'Muistutus','Достижения':'Saavutukset','Другое':'Muu','Открыть видео':'Avaa video','Видео / ссылка':'Video / linkki','Добавить emoji':'Lisää emoji','Видео':'Video','Смотреть в S.P.A.C.E.':'Katso S.P.A.C.E.:ssa','Открыть на сайте':'Avaa verkkosivulla','Если сайт запрещает встроенный просмотр, откройте видео на сайте.':'Jos sivusto estää upotetun toiston, avaa video sivustolla.'});
