const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const os = require('os');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const store = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;
const dataRoot = process.env.SPACE_DATA_DIR || process.env.TEAMSPACE_DATA_DIR || path.join(__dirname, '..', 'data');
const uploadsRoot = path.join(dataRoot, 'uploads');
fs.mkdirSync(dataRoot, { recursive: true });
const secretPath = path.join(dataRoot, '.jwt-secret');
let JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  try { JWT_SECRET = fs.readFileSync(secretPath, 'utf8').trim(); } catch {}
  if (!JWT_SECRET) {
    JWT_SECRET = crypto.randomBytes(48).toString('hex');
    fs.writeFileSync(secretPath, JWT_SECRET, { mode: 0o600 });
  }
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', (req,res,next)=>{
  const cookie=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('space_token='));
  const token=req.query.access_token || (cookie?decodeURIComponent(cookie.split('=').slice(1).join('=')):'');
  try {
    const user=jwt.verify(token,JWT_SECRET);
    const live=store.findUserById(user.id)||user;
    if(live.role==='technical_admin' && !live.permissions?.read_file_contents) return res.status(403).send('File content access is not permitted for IT Support');
    next();
  } catch { return res.status(401).send('Authentication required'); }
}, express.static(uploadsRoot));
app.use(express.static(path.join(__dirname, '..', 'public')));

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = 'files';
    if (file.mimetype.startsWith('image/')) folder = 'images';
    else if (file.mimetype.startsWith('video/')) folder = 'videos';
    const dest = path.join(uploadsRoot, folder);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename(req, file, cb) {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._\-\u0400-\u04FF]/g, '_');
    cb(null, Date.now() + '_' + safe);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }
});

function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Требуется авторизация' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Always use live role/permissions so Owner changes take effect without issuing a new token.
    req.user = store.findUserById(decoded.id) || decoded;
    if (!req.user || req.user.removed) return res.status(401).json({ error: 'Account removed' });
    if (req.user.account_status === 'suspended') return res.status(403).json({ error: 'Account suspended' });
    next();
  } catch {
    return res.status(401).json({ error: 'Неверный токен' });
  }
}

function adminOnly(req, res, next) {
  if (!(req.user.role === 'owner' || req.user.role === 'technical_admin' || (req.user.role === 'admin' && req.user.permissions?.manage_users))) return res.status(403).json({ error: 'Нет права управления пользователями' });
  next();
}

function signUser(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    must_complete_registration: !!user.must_complete_registration,
    permissions: user.permissions || {}
  }, JWT_SECRET, { expiresIn: '30d' });
}

app.get('/api/health', (req, res) => res.json({ ok:true, app:'S.P.A.C.E.', version:'2.4.9', mode:'LAN-ready' }));

// ============ AUTH ============
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Введите email и пароль' });

  const user = store.findUserByEmail(email);
  if (!user || user.removed || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }
  if (user.account_status === 'suspended') return res.status(403).json({ error: 'Аккаунт приостановлен владельцем' });

  store.updateUser(user.id, { status: 'online' });
  const token = signUser(user);
  res.cookie('space_token', token, { httpOnly:true, sameSite:'strict', maxAge:30*24*60*60*1000 });
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      permissions: user.permissions || {},
      must_complete_registration: !!user.must_complete_registration,
      language: user.language || 'ru'
    }
  });
});

// First-time: set permanent email + password
app.post('/api/complete-registration', auth, (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Заполните все поля' });
  if (password.length < 8) return res.status(400).json({ error: 'Пароль минимум 8 символов' });

  const result = store.completeRegistration(req.user.id, { email, password, name });
  if (!result) return res.status(400).json({ error: 'Регистрация уже завершена' });
  if (result.error) return res.status(400).json({ error: result.error });

  const token = signUser(result);
  res.cookie('space_token', token, { httpOnly:true, sameSite:'strict', maxAge:30*24*60*60*1000 });
  res.json({
    token,
    user: {
      id: result.id,
      email: result.email,
      name: result.name,
      role: result.role,
      avatar: result.avatar,
      permissions: result.permissions || {},
      must_complete_registration: false,
      language: result.language || 'ru'
    }
  });
});

// Public self-registration is intentionally disabled. New accounts are created only by administrator invites.

app.get('/api/me', auth, (req, res) => {
  const user = store.findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  const { password, ...safe } = user;
  res.json(safe);
});
app.patch('/api/me/settings', auth, (req,res)=>{ const lang=['ru','en','fi'].includes(req.body.language)?req.body.language:'ru'; const u=store.updateUser(req.user.id,{language:lang}); res.json({ok:true,language:u.language}); });

// Admin creates one-time invite for a colleague
app.post('/api/invites', auth, adminOnly, (req, res) => {
  const { email, role } = req.body;
  let wanted = role || 'member';
  if (wanted === 'owner') {
    if (store.get().users.some(u => u.role === 'owner')) return res.status(409).json({error:'Owner already exists'});
    if (req.user.role !== 'technical_admin') return res.status(403).json({error:'Only IT Support can bootstrap the first Owner account'});
  }
  const invite = store.createInvite({ email, role: wanted, created_by: req.user.id });
  res.json(invite);
});

// ============ TEAM ============
app.get('/api/team', auth, (req, res) => res.json(store.getUsers()));

app.patch('/api/users/:id/role', auth, adminOnly, (req, res) => {
  if (!['owner','technical_admin'].includes(req.user.role)) return res.status(403).json({ error: 'Only Owner or Technical Administrator in development mode can change system roles' });
  const { role } = req.body;
  if (!['admin', 'member'].includes(role)) return res.status(400).json({ error: 'Неверная роль' });
  const target = store.findUserById(req.params.id);
  if (!target) return res.status(404).json({ error: 'Пользователь не найден' });
  if (target.role === 'owner' || target.role === 'technical_admin') return res.status(403).json({ error: 'Protected role cannot be changed' });
  // System roles must change actual capabilities, not only the label shown in Management.
  // Administrator starts with the full business-admin capability set; Owner can then disable individual permissions.
  // Role and permissions are separate. Promoting somebody to Administrator does not
  // give Alex Node's development powers; Owner/Technical Admin grants permissions explicitly.
  const permissions = role === 'admin' ? {
    manage_users:false, manage_content:false, manage_events:false,
    manage_files:false, manage_school:false, manage_onboarding:false
  } : {};
  store.updateUser(req.params.id, { role, permissions });
  res.json({ ok: true, role, permissions });
});

app.patch('/api/users/:id/permissions', auth, adminOnly, (req, res) => {
  if (!['owner','technical_admin'].includes(req.user.role)) return res.status(403).json({ error: 'Only Owner or Technical Administrator in development mode can change permissions' });
  const target = store.findUserById(req.params.id);
  if (!target) return res.status(404).json({ error: 'Пользователь не найден' });
  if (target.role === 'owner') return res.status(403).json({ error: 'Owner permissions are fixed' });
  if (target.role === 'technical_admin') {
    if (req.user.role !== 'owner') return res.status(403).json({error:'Only Owner can change IT Support data access'});
    const old = target.permissions || {};
    const wasChat = !!old.global_chat_support, nowChat = !!req.body.global_chat_support;
    const permissions = {
      technical_admin:true,
      manage_users: req.body.manage_users !== undefined ? !!req.body.manage_users : !!old.manage_users,
      manage_content: req.body.manage_content !== undefined ? !!req.body.manage_content : !!old.manage_content,
      manage_events: req.body.manage_events !== undefined ? !!req.body.manage_events : !!old.manage_events,
      manage_files: req.body.manage_files !== undefined ? !!req.body.manage_files : !!old.manage_files,
      manage_school: req.body.manage_school !== undefined ? !!req.body.manage_school : !!old.manage_school,
      manage_onboarding: req.body.manage_onboarding !== undefined ? !!req.body.manage_onboarding : !!old.manage_onboarding,
      upload_files: req.body.upload_files !== undefined ? !!req.body.upload_files : !!old.upload_files,
      delete_files: req.body.delete_files !== undefined ? !!req.body.delete_files : !!old.delete_files,
      read_file_contents: req.body.read_file_contents !== undefined ? !!req.body.read_file_contents : !!old.read_file_contents,
      global_chat_support:nowChat
    };
    const fields={permissions};
    if(nowChat && !wasChat) fields.global_chat_since=new Date().toISOString();
    if(!nowChat) fields.global_chat_since=null;
    store.updateUser(req.params.id, fields);
    return res.json({ok:true,permissions,global_chat_since:fields.global_chat_since});
  }
  const allowed = ['manage_users','manage_content','manage_events','manage_files','manage_school','manage_onboarding'];
  const permissions = {};
  allowed.forEach(k => permissions[k] = !!req.body[k]);
  store.updateUser(req.params.id, { permissions });
  res.json({ ok: true, permissions });
});

// Passwords are never readable. Admin can issue a temporary password instead.
app.post('/api/users/:id/reset-password', auth, adminOnly, (req, res) => {
  const target = store.findUserById(req.params.id);
  if (!target) return res.status(404).json({ error: 'Пользователь не найден' });
  if (target.id === req.user.id && req.user.role !== 'owner') return res.status(403).json({ error: 'Administrators cannot reset their own password here' });
  if (target.role === 'technical_admin' && req.user.role !== 'owner') return res.status(403).json({ error: 'Protected account' });
  if (target.role === 'owner' && req.user.role !== 'owner') return res.status(403).json({ error: 'Только владелец может сбросить пароль владельца' });
  const tempPassword = 'Reset' + Math.random().toString(36).slice(2, 9) + '!';
  store.updateUser(target.id, { password: bcrypt.hashSync(tempPassword, 10), must_complete_registration: true });
  res.json({ ok: true, email: target.email, tempPassword });
});

// Owner-managed business position (job title) and account lifecycle.
app.patch('/api/users/:id/position', auth, adminOnly, (req,res)=>{
  const target=store.findUserById(req.params.id); if(!target)return res.status(404).json({error:'Пользователь не найден'});
  if(target.role==='owner'||target.role==='technical_admin')return res.status(403).json({error:'Protected account'});
  const position=String(req.body.position||'').trim().slice(0,120); store.updateUser(target.id,{position}); res.json({ok:true,position});
});
app.post('/api/users/:id/account-action', auth, (req,res)=>{
  // During development the protected Alex Node Technical Administrator can manage
  // ordinary business accounts, while Owner and Technical Administrator accounts remain protected.
  if(!['owner','technical_admin'].includes(req.user.role))return res.status(403).json({error:'Only Owner or Technical Administrator in development mode can manage accounts'});
  const actor=store.findUserById(req.user.id); const target=store.findUserById(req.params.id);
  if(!target)return res.status(404).json({error:'Пользователь не найден'});
  if(target.role==='owner'||target.role==='technical_admin'||target.id===actor.id)return res.status(403).json({error:'Protected account'});
  const action=req.body.action; if(!['suspend','restore','remove'].includes(action))return res.status(400).json({error:'Invalid action'});
  if(actor.role==='owner'&&(!req.body.ownerPassword||!bcrypt.compareSync(req.body.ownerPassword,actor.password)))return res.status(403).json({error:'Неверный пароль владельца'});
  if(action==='suspend') store.updateUser(target.id,{account_status:'suspended',status:'offline'});
  if(action==='restore') store.updateUser(target.id,{account_status:'active'});
  if(action==='remove') store.updateUser(target.id,{account_status:'removed',removed:true,status:'offline',removed_at:new Date().toISOString()});
  res.json({ok:true,action});
});

// ============ TASKS ============
app.get('/api/tasks', auth, (req, res) => res.json(store.getTasks()));
app.post('/api/tasks', auth, upload.array('attachments', 10), (req, res) => {
  const { title, description, priority, assignee_id, due_date, links } = req.body;
  if (!title) return res.status(400).json({ error: 'Название обязательно' });
  const attachments=(req.files||[]).map(fileToAttachment);
  const task = {
    id: uuidv4(), title, description: description || '', status: 'open',
    priority: priority || 'normal', assignee_id: assignee_id || req.user.id, created_by: req.user.id,
    due_date: due_date || '', links: parseLinks(links), attachments,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  };
  store.addTask(task); notifyAll(`Новая задача: ${title}`, 'task', task.id, req.user.id);
  res.json(task);
});
app.patch('/api/tasks/:id', auth, upload.array('attachments', 10), (req, res) => {
  const old=store.getTasks().find(t=>t.id===req.params.id); if(!old) return res.status(404).json({error:'Не найдено'});
  const fields={...req.body,updated_at:new Date().toISOString()};
  if(req.body.links!==undefined) fields.links=parseLinks(req.body.links);
  if(req.files?.length) fields.attachments=[...(old.attachments||[]),...req.files.map(fileToAttachment)];
  const task = store.updateTask(req.params.id, fields); res.json(task);
});
app.delete('/api/tasks/:id', auth, (req, res) => {
  const task=store.getTasks().find(t=>t.id===req.params.id); if(!task) return res.status(404).json({error:'Не найдено'});
  if(task.created_by!==req.user.id && !['owner','admin','technical_admin'].includes(req.user.role)) return res.status(403).json({error:'Удалять задачу может её автор или администратор'});
  store.deleteTask(req.params.id); res.json({ ok: true });
});

// ============ EVENTS ============
app.get('/api/events', auth, (req, res) => res.json(store.getEvents().map(e=>({...e,participant_names:(e.participant_ids||['all']).includes('all')?[]:(e.participant_ids||[]).map(id=>store.findUserById(id)?.name).filter(Boolean)}))));
app.post('/api/events', auth, (req, res) => {
  if (!(req.user.role === 'owner' || req.user.role === 'technical_admin' || req.user.permissions?.manage_events)) return res.status(403).json({ error: 'Нет прав' });
  const { title, date, time, location } = req.body;
  if (!title || !date) return res.status(400).json({ error: 'Название и дата обязательны' });
  const event = {
    id: uuidv4(), title, date, time: time || '', location: location || 'Онлайн',
    description: req.body.description || '', participant_ids: Array.isArray(req.body.participant_ids) ? req.body.participant_ids : ['all'],
    participants: 0, created_by: req.user.id, created_at: new Date().toISOString()
  };
  store.addEvent(event);
  res.json(event);
});
app.patch('/api/events/:id', auth, (req,res)=>{ if(!(req.user.role==='owner'||req.user.role==='technical_admin'||req.user.permissions?.manage_events)) return res.status(403).json({error:'Нет прав'}); const e=store.updateEvent(req.params.id,{title:req.body.title,date:req.body.date,time:req.body.time||'',location:req.body.location||'Онлайн',description:req.body.description||'',participant_ids:Array.isArray(req.body.participant_ids)?req.body.participant_ids:['all']}); if(!e)return res.status(404).json({error:'Не найдено'}); res.json(e); });
app.delete('/api/events/:id', auth, (req,res)=>{ if(!(req.user.role==='owner'||req.user.role==='technical_admin'||req.user.permissions?.manage_events)) return res.status(403).json({error:'Нет прав'}); store.deleteEvent(req.params.id); res.json({ok:true}); });

// ============ COURSES ============
app.get('/api/courses', auth, (req, res) => {
  const courses = store.getCourses(); const progress = store.getCourseProgress(req.user.id); const map={}; progress.forEach(p=>map[p.course_id]=p.progress);
  res.json(courses.map(c=>({...c,progress:map[c.id]||0})));
});
function canManageSchool(user){ return ['owner','technical_admin'].includes(user.role) || !!user.permissions?.manage_school; }
app.get('/api/courses/:id',auth,(req,res)=>{const c=store.getCourseById(req.params.id);if(!c)return res.status(404).json({error:'Курс не найден'});const p=store.getCourseProgress(req.user.id).find(x=>x.course_id===c.id);res.json({...c,progress:p?.progress||0});});
app.post('/api/courses', auth, upload.array('attachments',20), (req,res)=>{
  if(!canManageSchool(req.user)) return res.status(403).json({error:'Нет права добавлять курсы'});
  const {title,description,content,links}=req.body;if(!title)return res.status(400).json({error:'Название обязательно'});
  const c={id:uuidv4(),title,description:description||'',content:content||'',links:parseLinks(links),attachments:(req.files||[]).map(fileToAttachment),created_by:req.user.id,created_at:new Date().toISOString()};store.addCourse(c);notifyAll(`Новый курс: ${title}`,'course',c.id,req.user.id);res.json(c);
});
app.patch('/api/courses/:id',auth,upload.array('attachments',20),(req,res)=>{if(!canManageSchool(req.user))return res.status(403).json({error:'Нет прав'});const old=store.getCourseById(req.params.id);if(!old)return res.status(404).json({error:'Не найдено'});const f={title:req.body.title||old.title,description:req.body.description??old.description,content:req.body.content??old.content,links:req.body.links!==undefined?parseLinks(req.body.links):old.links,attachments:[...(old.attachments||[]),...(req.files||[]).map(fileToAttachment)]};res.json(store.updateCourse(req.params.id,f));});
app.patch('/api/courses/:id/progress',auth,(req,res)=>{const progress=Math.max(0,Math.min(100,Number(req.body.progress)||0));store.setCourseProgress(req.user.id,req.params.id,progress);res.json({ok:true,progress});});
app.delete('/api/courses/:id',auth,(req,res)=>{if(!canManageSchool(req.user))return res.status(403).json({error:'Нет прав'});store.deleteCourse(req.params.id);res.json({ok:true});});

// ============ ONBOARDING ============
app.post('/api/onboarding',auth,upload.array('attachments',10),(req,res)=>{if(!(req.user.role==='owner'||req.user.role==='technical_admin'||req.user.permissions?.manage_onboarding))return res.status(403).json({error:'Нет прав'});const steps=store.getOnboardingSteps();const step={id:uuidv4(),title:req.body.title||'Новый этап',description:req.body.description||'',content:req.body.content||'',links:parseLinks(req.body.links),attachments:(req.files||[]).map(fileToAttachment),order_num:steps.length?Math.max(...steps.map(x=>x.order_num||0))+1:1};res.json(store.addOnboardingStep(step));});
app.delete('/api/onboarding/:stepId/content',auth,(req,res)=>{if(!(req.user.role==='owner'||req.user.role==='technical_admin'||req.user.permissions?.manage_onboarding))return res.status(403).json({error:'Нет прав'});store.deleteOnboardingStep(req.params.stepId);res.json({ok:true});});
app.get('/api/onboarding', auth, (req, res) => {
  const steps = store.getOnboardingSteps();
  const progress = store.getUserOnboarding(req.user.id);
  const map = {};
  progress.forEach(p => { map[p.step_id] = p.completed; });
  res.json(steps.map(s => ({ ...s, completed: !!map[s.id] })));
});
app.patch('/api/onboarding/:stepId', auth, (req, res) => {
  store.setOnboarding(req.user.id, req.params.stepId, !!req.body.completed);
  res.json({ ok: true });
});
app.get('/api/onboarding/progress/:userId',auth,(req,res)=>{const steps=store.getOnboardingSteps();const p=store.getUserOnboarding(req.params.userId);const done=p.filter(x=>x.completed).length;res.json({done,total:steps.length,percent:steps.length?Math.round(done/steps.length*100):0,steps:steps.map(s=>({...s,completed:!!p.find(x=>x.step_id===s.id)?.completed}))});});
app.patch('/api/onboarding/:stepId/content',auth,upload.array('attachments',10),(req,res)=>{if(!(req.user.role==='owner'||req.user.role==='technical_admin'||req.user.permissions?.manage_onboarding))return res.status(403).json({error:'Нет прав'});const old=store.getOnboardingStep(req.params.stepId);if(!old)return res.status(404).json({error:'Не найдено'});const fields={title:req.body.title||old.title,description:req.body.description||'',content:req.body.content||'',links:parseLinks(req.body.links),attachments:[...(old.attachments||[]),...(req.files||[]).map(fileToAttachment)]};res.json(store.updateOnboardingStep(req.params.stepId,fields));});

// ============ KNOWLEDGE ============
function parseLinks(v){ if(!v) return []; if(Array.isArray(v)) return v; try{const x=JSON.parse(v);return Array.isArray(x)?x:[v]}catch{return String(v).split(/\n|,/).map(x=>x.trim()).filter(Boolean)} }
function fileToAttachment(f){ let type='file'; if(f.mimetype.startsWith('image/'))type='image'; else if(f.mimetype.startsWith('video/'))type='video'; const folder=type==='image'?'images':type==='video'?'videos':'files'; return {id:uuidv4(),name:f.originalname,mimetype:f.mimetype,size:f.size,type,url:'/uploads/'+folder+'/'+f.filename}; }
function notifyAll(text,type,refId,actorId){ for(const u of store.getAllUsersRaw()){ if(!u.must_complete_registration && u.id!==actorId) store.addNotification({id:uuidv4(),user_id:u.id,text,type,ref_id:refId,read_by:[],created_at:new Date().toISOString()}); } }
app.get('/api/knowledge', auth, (req, res) => res.json(store.getKnowledge()));
app.get('/api/knowledge/:id', auth, (req,res)=>{const k=store.getKnowledgeById(req.params.id); if(!k)return res.status(404).json({error:'Материал не найден'});res.json(k)});
app.post('/api/knowledge', auth, upload.array('attachments', 10), (req, res) => {
  const { title, description, icon, content, links } = req.body;
  if (!title) return res.status(400).json({ error: 'Название обязательно' });
  const item = { id: uuidv4(), title, description: description || '', icon: icon || '📄', content: content || '', links:parseLinks(links), attachments:(req.files||[]).map(fileToAttachment), created_by:req.user.id, created_at:new Date().toISOString() };
  store.addKnowledge(item); notifyAll(`Новый материал: ${title}`,'material',item.id,req.user.id); res.json(item);
});
app.patch('/api/knowledge/:id',auth,upload.array('attachments',10),(req,res)=>{const k=store.getKnowledgeById(req.params.id);if(!k)return res.status(404).json({error:'Не найдено'});if(k.created_by!==req.user.id&&!['owner','technical_admin'].includes(req.user.role)&&!req.user.permissions?.manage_content)return res.status(403).json({error:'Нет прав'});const f={title:req.body.title||k.title,description:req.body.description??k.description,icon:(req.body.icon||k.icon||'📄'),content:req.body.content??k.content,links:req.body.links!==undefined?parseLinks(req.body.links):k.links,attachments:[...(k.attachments||[]),...(req.files||[]).map(fileToAttachment)]};res.json(store.updateKnowledge(req.params.id,f));});
app.delete('/api/knowledge/:id',auth,(req,res)=>{const k=store.getKnowledgeById(req.params.id);if(!k)return res.status(404).json({error:'Не найдено'});if(k.created_by!==req.user.id&&!['owner','technical_admin'].includes(req.user.role)&&!req.user.permissions?.manage_content)return res.status(403).json({error:'Нет прав'});store.deleteKnowledge(req.params.id);res.json({ok:true})});

// ============ NEWS / ANNOUNCEMENTS ============
function canManageNews(user){ return user.role === 'owner' || user.role === 'technical_admin'; }
app.get('/api/news', auth, (req,res)=>{
  const users=store.getAllUsersRaw();
  res.json(store.getNews().map(n=>({...n,author_name:users.find(u=>u.id===n.created_by)?.name||'S.P.A.C.E.'})));
});
app.get('/api/news/:id', auth, (req,res)=>{
  const n=store.getNewsById(req.params.id); if(!n)return res.status(404).json({error:'News not found'});
  const u=store.findUserById(n.created_by); res.json({...n,author_name:u?.name||'S.P.A.C.E.'});
});
app.post('/api/news', auth, upload.array('attachments',10), (req,res)=>{
  if(!canManageNews(req.user))return res.status(403).json({error:'Only Owner or IT Support can publish news'});
  const title=String(req.body.title||'').trim(); const content=String(req.body.content||'').trim();
  if(!title||!content)return res.status(400).json({error:'Title and text are required'});
  const item={id:uuidv4(),title:title.slice(0,180),content:content.slice(0,12000),category:String(req.body.category||'company').slice(0,30),pinned:String(req.body.pinned)==='true'||req.body.pinned===true,video_link:String(req.body.video_link||'').slice(0,2000),attachments:(req.files||[]).map(fileToAttachment),created_by:req.user.id,created_at:new Date().toISOString(),updated_at:new Date().toISOString()};
  store.addNews(item); notifyAll(`Новая новость: ${title}`,'news',item.id,req.user.id); res.json(item);
});
app.patch('/api/news/:id', auth, upload.array('attachments',10), (req,res)=>{
  if(!canManageNews(req.user))return res.status(403).json({error:'No permission'});
  const old=store.getNewsById(req.params.id);if(!old)return res.status(404).json({error:'News not found'});
  const fields={updated_at:new Date().toISOString()};
  if(req.body.title!==undefined)fields.title=String(req.body.title).trim().slice(0,180);
  if(req.body.content!==undefined)fields.content=String(req.body.content).trim().slice(0,12000);
  if(req.body.category!==undefined)fields.category=String(req.body.category).slice(0,30);
  if(req.body.pinned!==undefined)fields.pinned=String(req.body.pinned)==='true'||req.body.pinned===true;
  if(req.body.video_link!==undefined)fields.video_link=String(req.body.video_link||'').slice(0,2000);
  if((req.files||[]).length)fields.attachments=[...(old.attachments||[]),...(req.files||[]).map(fileToAttachment)];
  res.json(store.updateNews(req.params.id,fields));
});
app.delete('/api/news/:id', auth, (req,res)=>{if(!canManageNews(req.user))return res.status(403).json({error:'No permission'});if(!store.getNewsById(req.params.id))return res.status(404).json({error:'News not found'});store.deleteNews(req.params.id);res.json({ok:true});});

// ============ NOTIFICATIONS ============
app.get('/api/notifications',auth,(req,res)=>res.json(store.getNotifications(req.user.id)));
app.patch('/api/notifications/:id/read',auth,(req,res)=>{store.markNotification(req.params.id,req.user.id);res.json({ok:true})});
app.post('/api/notifications/read-all',auth,(req,res)=>{store.markAllNotifications(req.user.id);res.json({ok:true})});

// ============ MEDIA (files / images / videos) ============
app.get('/api/media', auth, (req, res) => {
  const type = req.query.type; // files | images | videos
  const liveUser=store.findUserById(req.user.id)||req.user;
  const list=store.getMedia(type || null).map(m=>{ if(liveUser.role==='technical_admin'&&!liveUser.permissions?.read_file_contents){const {filepath,url,...meta}=m;return {...meta,content_locked:true};} return m; });
  res.json(list);
});

app.get('/api/media/:id/preview', auth, async (req,res)=>{
  const item=store.getMedia().find(m=>m.id===req.params.id);
  if(!item)return res.status(404).json({error:'Не найдено'});
  const live=store.findUserById(req.user.id)||req.user;
  if(live.role==='technical_admin'&&!live.permissions?.read_file_contents)return res.status(403).json({error:'File content access is not permitted for IT Support'});
  try{
    const ext=path.extname(item.originalname||'').toLowerCase();
    const mime=(item.mimetype||'').toLowerCase();
    const textExt=new Set(['.txt','.md','.csv','.json','.xml','.html','.htm','.css','.js','.ts','.jsx','.tsx','.py','.ps1','.bat','.cmd','.log','.ini','.cfg','.yml','.yaml','.sql']);
    if(textExt.has(ext)||mime.startsWith('text/')||mime.includes('json')||mime.includes('xml')){
      let text=fs.readFileSync(item.filepath,'utf8'); if(text.length>1500000)text=text.slice(0,1500000)+'\n\n[Preview truncated]';
      return res.json({kind:'text',text});
    }
    if(ext==='.docx'||mime.includes('wordprocessingml')){
      const mammoth=require('mammoth'); const out=await mammoth.convertToHtml({path:item.filepath});
      return res.json({kind:'html',html:out.value});
    }
    if(['.xlsx','.xls','.xlsm','.ods'].includes(ext)||mime.includes('spreadsheet')||mime.includes('excel')){
      const XLSX=require('xlsx'); const wb=XLSX.readFile(item.filepath,{cellDates:true});
      let html=''; for(const name of wb.SheetNames.slice(0,20)){html+=`<div class="sheet-title">${escapeHtml(name)}</div>`+XLSX.utils.sheet_to_html(wb.Sheets[name],{id:'',editable:false});}
      return res.json({kind:'html',html});
    }
    if(ext==='.pptx'||mime.includes('presentationml')){
      const AdmZip=require('adm-zip'); const zip=new AdmZip(item.filepath); const entries=zip.getEntries().filter(e=>/^ppt\/slides\/slide\d+\.xml$/.test(e.entryName)).sort((a,b)=>Number(a.entryName.match(/slide(\d+)/)[1])-Number(b.entryName.match(/slide(\d+)/)[1]));
      const decode=x=>x.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
      let html=''; entries.forEach((e,i)=>{const xml=e.getData().toString('utf8');const texts=[...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map(m=>decode(m[1]));html+=`<div class="slide-preview"><div class="slide-title">Slide ${i+1}</div>${texts.map(t=>`<div>${escapeHtml(t)}</div>`).join('')}</div>`;});
      return res.json({kind:'html',html:html||'<p>No text preview available for this presentation.</p>'});
    }
    return res.json({kind:'unsupported'});
  }catch(e){console.error('Preview failed',e);return res.status(500).json({error:'Не удалось создать предпросмотр: '+e.message});}
});

function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}

app.post('/api/media/upload', auth, upload.single('file'), (req, res) => {
  if (req.user.role==='technical_admin' && !req.user.permissions?.upload_files) return res.status(403).json({error:'No upload permission'});
  if (!req.file) return res.status(400).json({ error: 'Файл не выбран' });
  let type = 'files';
  if (req.file.mimetype.startsWith('image/')) type = 'images';
  else if (req.file.mimetype.startsWith('video/')) type = 'videos';

  const rel = path.join(type, req.file.filename).replace(/\\/g, '/');
  const item = {
    id: uuidv4(),
    title: req.body.title || req.file.originalname,
    description: req.body.description || '',
    type,
    mimetype: req.file.mimetype,
    size: req.file.size,
    filename: req.file.filename,
    originalname: req.file.originalname,
    filepath: req.file.path,
    url: '/uploads/' + rel,
    uploaded_by: req.user.id,
    uploader_name: req.user.name,
    created_at: new Date().toISOString()
  };
  store.addMedia(item);
  res.json(item);
});

app.delete('/api/media/:id', auth, (req, res) => {
  const item = store.getMedia().find(m => m.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Не найдено' });
  if (req.user.role==='technical_admin' && !req.user.permissions?.delete_files) return res.status(403).json({error:'No delete permission'});
  if (item.uploaded_by !== req.user.id && !['owner','admin','technical_admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Нет прав' });
  }
  store.deleteMedia(req.params.id);
  res.json({ ok: true });
});

app.post('/api/chat/upload', auth, upload.single('file'), (req,res)=>{if(!req.file)return res.status(400).json({error:'Файл не выбран'});const room=store.getRoom(req.body.roomId);if(!room)return res.status(404).json({error:'Чат не найден'});if(['private','support'].includes(room.type)&&!(room.member_ids||[]).includes(req.user.id))return res.status(403).json({error:'Нет доступа'});if(room.type==='global'&&(store.findUserById(req.user.id)||req.user).role==='technical_admin'&&!(store.findUserById(req.user.id)||req.user).permissions?.global_chat_support)return res.status(403).json({error:'Owner has not granted IT Support access to the group chat'});let type='file';if(req.file.mimetype.startsWith('image/'))type='image';else if(req.file.mimetype.startsWith('video/'))type='video';else if(req.file.mimetype.startsWith('audio/'))type='audio';const folder=req.file.mimetype.startsWith('image/')?'images':req.file.mimetype.startsWith('video/')?'videos':'files';res.json({id:uuidv4(),name:req.file.originalname,mimetype:req.file.mimetype,size:req.file.size,type,url:'/uploads/'+folder+'/'+req.file.filename});});

// ============ CHAT ============
app.get('/api/rooms', auth, (req, res) => {
  const rooms = store.getRooms(req.user.id);
  res.json(rooms.map(r => ({
    ...r,
    messageCount: ((store.findUserById(req.user.id)||req.user).role==='technical_admin'&&r.type==='global') ? ((store.findUserById(req.user.id)||req.user).permissions?.global_chat_support ? store.getMessages(r.id, store.findUserById(req.user.id)?.global_chat_since).length : 0) : store.getMessages(r.id).length,
    unread_count: store.unreadCount(r.id, req.user.id),
    display_name: r.type==='support' && (store.findUserById(req.user.id)||req.user).role==='technical_admin' ? ('IT Support ↔ '+(store.findUserById(r.support_user_id)?.name||'User')) : (r.type==='support' ? 'Alex Node IT Support' : r.name),
    access_locked: (store.findUserById(req.user.id)||req.user).role==='technical_admin'&&r.type==='global'&&!(store.findUserById(req.user.id)||req.user).permissions?.global_chat_support
  })));
});

app.post('/api/rooms/private', auth, (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'Укажите пользователя' });
  if (userId === req.user.id) return res.status(400).json({ error: 'Нельзя чат с собой' });
  const room = store.getOrCreatePrivateChat(req.user.id, userId);
  res.json(room);
});

app.get('/api/rooms/:id/messages', auth, (req, res) => {
  const room = store.getRoom(req.params.id);
  if (!room) return res.status(404).json({ error: 'Чат не найден' });
  if (['private','support'].includes(room.type) && !(room.member_ids || []).includes(req.user.id)) {
    return res.status(403).json({ error: 'Нет доступа' });
  }
  if(room.type==='global'&&(store.findUserById(req.user.id)||req.user).role==='technical_admin'&&!(store.findUserById(req.user.id)||req.user).permissions?.global_chat_support)return res.status(403).json({error:'Owner has not granted IT Support access to the group chat'});
  const techSince=(room.type==='global'&&(store.findUserById(req.user.id)||req.user).role==='technical_admin')?store.findUserById(req.user.id)?.global_chat_since:null;
  const messages = store.getMessages(req.params.id,techSince).map(m => {
    const u = store.findUserById(m.user_id);
    return { ...m, user_name: u ? u.name : 'Участник', user_avatar: u ? u.avatar : '?' };
  });
  store.markRoomRead(req.params.id, req.user.id);
  res.json(messages);
});

app.post('/api/rooms/:id/read', auth, (req,res)=>{ const room=store.getRoom(req.params.id); if(!room)return res.status(404).json({error:'Chat not found'}); if(['private','support'].includes(room.type)&&!(room.member_ids||[]).includes(req.user.id))return res.status(403).json({error:'No access'}); store.markRoomRead(room.id,req.user.id); res.json({ok:true}); });

app.get('/api/support', auth, (req, res) => {
  const db = store.get();
  res.json(db.support || { name: 'Alex Node IT Support', email: 'an@alexnode.fi', phone: '+358 45 852 5293', website: 'https://alexnode.fi' });
});

app.get('/api/stats', auth, (req, res) => res.json(store.stats()));

// SOCKET
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Auth required'));
  try {
    socket.user = jwt.verify(token, JWT_SECRET);
    const live=store.findUserById(socket.user.id);
    if(!live || live.removed || live.account_status==='suspended') return next(new Error('Account disabled'));
    next();
  } catch { next(new Error('Invalid token')); }
});

io.on('connection', (socket) => {
  const userId = socket.user.id;
  store.updateUser(userId, { status: 'online' });
  io.emit('user:status', { userId, status: 'online' });

  socket.on('join:room', (roomId) => { const room=store.getRoom(roomId); const u=store.findUserById(userId); if(!room)return; if(['private','support'].includes(room.type)&&!(room.member_ids||[]).includes(userId))return; if(room.type==='global'&&u?.role==='technical_admin'&&!u.permissions?.global_chat_support)return; socket.join(roomId); });
  socket.on('leave:room', (roomId) => socket.leave(roomId));

  socket.on('message:send', (data) => {
    const { roomId, text, attachment } = data;
    if ((!text || !text.trim()) && !attachment) return;
    const room = store.getRoom(roomId);
    if (!room) return;
    if (['private','support'].includes(room.type) && !(room.member_ids || []).includes(userId)) return;
    const liveUser=store.findUserById(userId);
    if(!liveUser || liveUser.removed || liveUser.account_status==='suspended') return;
    if(room.type==='global'&&liveUser?.role==='technical_admin'&&!liveUser.permissions?.global_chat_support)return;

    const msg = {
      id: uuidv4(),
      room_id: roomId,
      user_id: userId,
      text: (text || '').trim(),
      attachment: attachment || null,
      created_at: new Date().toISOString()
    };
    store.addMessage(msg);
    const outgoing={...msg,user_name:liveUser.name||socket.user.name,user_avatar:liveUser.avatar||socket.user.avatar};
    io.to(roomId).emit('message:new', outgoing);
    // All connected clients can refresh their personal unread counters; room access is still enforced server-side.
    io.emit('chat:activity', {room_id:roomId,sender_id:userId});
  });

  socket.on('disconnect', () => {
    store.updateUser(userId, { status: 'offline' });
    io.emit('user:status', { userId, status: 'offline' });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

function getLanAddresses(port) {
  const out=[];
  for (const list of Object.values(os.networkInterfaces())) for (const n of (list||[])) {
    if (n.family === 'IPv4' && !n.internal) out.push(`http://${n.address}:${port}`);
  }
  return out;
}
function startServer(port = PORT) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '0.0.0.0', () => {
      server.removeListener('error', reject);
      console.log(`S.P.A.C.E. local: http://localhost:${port}`);
      getLanAddresses(port).forEach(a => console.log(`S.P.A.C.E. LAN: ${a}`));
      resolve(server);
    });
  });
}


if (require.main === module) {
  startServer();
}

module.exports = { app, server, startServer, io };
