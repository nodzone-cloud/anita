const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const dataDir = process.env.SPACE_DATA_DIR || process.env.TEAMSPACE_DATA_DIR || path.join(__dirname, '..', 'data');
const uploadsDir = path.join(dataDir, 'uploads');
const dbPath = path.join(dataDir, 'db.json');

['files', 'images', 'videos'].forEach(folder => {
  const p = path.join(uploadsDir, folder);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

function load() {
  if (!fs.existsSync(dbPath)) return null;
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')); } catch { return null; }
}
function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

let db = load();

if (!db) {
  // ONLINE PREVIEW start.
  // This isolated preview uses an Owner account for Olga so the complete
  // current functionality can be explored without a registration step.
  // The login screen still appears and fills/signs in automatically for presentation.
  const inviteId = uuidv4();
  db = {
    settings: {
      company_name: 'S.P.A.C.E.',
      setup_complete: false
    },
    users: [
      {
        id: inviteId,
        email: 'olga.preview@space.local',
        password: bcrypt.hashSync('SPACEpreview2026!', 10),
        name: 'Olga Larkina',
        role: 'owner',
        permissions: { manage_users: true, manage_content: true, manage_events: true, manage_files: true, manage_school: true, manage_onboarding: true },
        language: 'ru',
        avatar: 'O',
        status: 'offline',
        is_invite: false,
        must_complete_registration: false,
        created_at: new Date().toISOString()
      }
    ],
    invites: [],
    support: {
      name: 'Alex Node IT Support',
      email: 'an@alexnode.fi',
      phone: '+358 45 852 5293',
      website: 'https://alexnode.fi'
    },
    tasks: [],
    events: [],
    courses: [],
    course_progress: [],
    onboarding_steps: [
      { id: uuidv4(), title: '1. Добро пожаловать в команду', description: 'Знакомство с компанией и командой', order_num: 1 },
      { id: uuidv4(), title: '2. Основы работы', description: 'Правила, инструменты и основные процессы', order_num: 2 },
      { id: uuidv4(), title: '3. Пройти базовое обучение', description: 'Уроки и материалы', order_num: 3 },
      { id: uuidv4(), title: '4. Выполнить первое задание', description: 'Практическая часть', order_num: 4 },
      { id: uuidv4(), title: '5. Встреча с руководителем', description: 'Подведение итогов адаптации', order_num: 5 }
    ],
    user_onboarding: [],
    knowledge: [],
    media: [],
    chat_rooms: [
      {
        id: uuidv4(),
        name: 'Alex Node IT Support',
        description: 'Техническая поддержка S.P.A.C.E.',
        type: 'support',
        member_ids: [],
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Общий чат',
        description: 'Групповой чат всей команды',
        type: 'global',
        member_ids: [],
        created_at: new Date().toISOString()
      }
    ],
    messages: [],
    private_chats: [],
    notifications: [],
    news: []
  };
  save(db);
  console.log('S.P.A.C.E. Online Preview database created.');
  console.log('Preview Owner: olga.preview@space.local');
}

// Lightweight migrations for upgrades from earlier TeamSpace builds.
// Preserve client data while introducing OWNER + Alex Node support.
if (db) {
  db.settings = db.settings || { company_name: 'S.P.A.C.E.', setup_complete: false };
  db.support = db.support || {
    name: 'Alex Node IT Support',
    email: 'an@alexnode.fi',
    phone: '+358 45 852 5293',
    website: 'https://alexnode.fi'
  };
  db.chat_rooms = db.chat_rooms || [];
  db.notifications = db.notifications || [];
  db.news = db.news || [];
  db.messages = db.messages || [];
  db.messages.forEach(m=>{ m.read_by = Array.isArray(m.read_by) ? m.read_by : [m.user_id].filter(Boolean); });
  db.knowledge = db.knowledge || [];
  db.tasks = db.tasks || [];
  db.knowledge.forEach(k => { k.attachments = k.attachments || []; k.links = k.links || []; });
  db.tasks.forEach(t => { t.attachments = t.attachments || []; t.links = t.links || []; });
  db.events = db.events || []; db.events.forEach(e=>{e.description=e.description||'';e.participant_ids=e.participant_ids||['all'];});
  db.courses = db.courses || []; db.course_progress = db.course_progress || [];
  db.courses.forEach(c=>{ c.attachments=c.attachments||[]; c.links=c.links||[]; c.content=c.content||''; });
  db.onboarding_steps = db.onboarding_steps || []; db.user_onboarding = db.user_onboarding || [];
  db.onboarding_steps.forEach(x=>{x.attachments=x.attachments||[];x.links=x.links||[];x.content=x.content||'';});
  if (!db.chat_rooms.some(r => r.type === 'support')) {
    db.chat_rooms.unshift({
      id: uuidv4(),
      name: 'Alex Node IT Support',
      description: 'Техническая поддержка S.P.A.C.E.',
      type: 'support',
      member_ids: [],
      created_at: new Date().toISOString()
    });
  }
  // Alex Node is technical support, never the business owner.
  // The business owner (Olga) is a separate protected account created/invited later.
  const alexSupport = db.users.find(u => (u.email || '').toLowerCase() === 'an@alexnode.fi');
  if (alexSupport) {
    alexSupport.role = 'technical_admin';
    alexSupport.system_account = true;
    // 2.4.8 development profile: Alex can test all business modules and file handling.
    // These are ordinary permissions (not ownership) and Olga can turn them off later.
    if (!db.settings.tech_permissions_248_initialized) {
      alexSupport.permissions = {
        technical_admin: true, manage_users: true,
        manage_content: true, manage_events: true, manage_files: true,
        manage_school: true, manage_onboarding: true,
        upload_files: true, delete_files: true, read_file_contents: true,
        global_chat_support: !!alexSupport.permissions?.global_chat_support
      };
      db.settings.tech_permissions_248_initialized = true;
    }
  }
  // 2.4.9 development-access correction: ordinary Administrators must NOT inherit
  // Alex Node's developer powers. Reset previously auto-granted business permissions once.
  if (!db.settings.admin_permissions_separated_249) {
    db.users.forEach(u => {
      if (u.role === 'admin') u.permissions = {
        manage_users:false, manage_content:false, manage_events:false,
        manage_files:false, manage_school:false, manage_onboarding:false
      };
    });
    db.settings.admin_permissions_separated_249 = true;
  }

  db.users.forEach(u => {
    if (u.role === 'owner') u.permissions = { manage_users: true, manage_content: true, manage_events: true, manage_files: true, manage_school: true, manage_onboarding: true, read_file_contents: true, upload_files: true, delete_files: true, global_chat_support: true };
    else if (u.role === 'technical_admin') u.permissions = {
      technical_admin:true,
      manage_users: u.permissions?.manage_users !== false,
      manage_content: u.permissions?.manage_content !== false,
      manage_events: u.permissions?.manage_events !== false,
      manage_files: u.permissions?.manage_files !== false,
      manage_school: u.permissions?.manage_school !== false,
      manage_onboarding: u.permissions?.manage_onboarding !== false,
      upload_files: u.permissions?.upload_files !== false,
      delete_files: u.permissions?.delete_files !== false,
      read_file_contents: u.permissions?.read_file_contents !== false,
      global_chat_support: !!u.permissions?.global_chat_support
    };
    else if (u.role === 'admin' && !u.permissions) u.permissions = { manage_users: false, manage_content: false, manage_events: false, manage_files: false };
    else if (!u.permissions) u.permissions = {};
    u.language = u.language || 'ru';
  });
  save(db);
}

const store = {
  get() { return db; },
  save() { save(db); },

  findUserByEmail(email) {
    return db.users.find(u => u.email === (email || '').toLowerCase());
  },
  findUserById(id) {
    return db.users.find(u => u.id === id);
  },
  getUsers() {
    return db.users
      .filter(u => (!u.is_invite || !u.must_complete_registration) && !u.removed)
      .map(({ password, ...u }) => u);
  },
  getAllUsersRaw() { return db.users; },
  addUser(user) {
    db.users.push(user);
    save(db);
    return user;
  },
  updateUser(id, fields) {
    const u = db.users.find(x => x.id === id);
    if (u) Object.assign(u, fields);
    save(db);
    return u;
  },
  completeRegistration(inviteUserId, { email, password, name }) {
    const u = db.users.find(x => x.id === inviteUserId);
    if (!u || !u.must_complete_registration) return null;
    if (store.findUserByEmail(email) && store.findUserByEmail(email).id !== inviteUserId) {
      return { error: 'Email уже занят' };
    }
    u.email = email.toLowerCase();
    u.password = bcrypt.hashSync(password, 10);
    u.name = name;
    u.avatar = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
    u.is_invite = false;
    u.must_complete_registration = false;
    u.status = 'online';
    if (u.email === 'an@alexnode.fi') {
      u.role = 'technical_admin';
      u.system_account = true;
      u.permissions = { technical_admin:true, manage_users:true, manage_content:true, manage_events:true, manage_files:true, manage_school:true, manage_onboarding:true, upload_files:true, delete_files:true, read_file_contents:true, global_chat_support:false };
    }
    db.settings.setup_complete = true;
    // Ensure user is in global room
    const global = db.chat_rooms.find(r => r.type === 'global');
    if (global && !global.member_ids.includes(u.id)) {
      global.member_ids.push(u.id);
    }
    save(db);
    return u;
  },
  createInvite({ email, role, created_by }) {
    const id = uuidv4();
    const tempPass = 'Invite' + Math.random().toString(36).slice(2, 8);
    const user = {
      id,
      email: (email || `invite-${id.slice(0, 8)}@temp.local`).toLowerCase(),
      password: bcrypt.hashSync(tempPass, 10),
      name: 'Приглашённый',
      role: role || 'member',
      permissions: role === 'admin' ? { manage_users: false, manage_content: false, manage_events: false, manage_files: false, manage_school: false, manage_onboarding: false } : {},
      language: 'ru',
      position: '',
      account_status: 'active',
      removed: false,
      avatar: '?',
      status: 'offline',
      is_invite: true,
      must_complete_registration: true,
      invited_by: created_by,
      created_at: new Date().toISOString()
    };
    db.users.push(user);
    save(db);
    return { user: { id, email: user.email, role: user.role }, tempPassword: tempPass };
  },

  getTasks() { return [...db.tasks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); },
  addTask(t) { db.tasks.push(t); save(db); return t; },
  updateTask(id, fields) {
    const t = db.tasks.find(x => x.id === id);
    if (t) Object.assign(t, fields);
    save(db);
    return t;
  },
  deleteTask(id) { db.tasks = db.tasks.filter(t => t.id !== id); save(db); },

  getEvents() { return [...db.events].sort((a, b) => (a.date || '').localeCompare(b.date || '')); },
  addEvent(e) { db.events.push(e); save(db); return e; },
  updateEvent(id, fields) { const e=db.events.find(x=>x.id===id); if(e) Object.assign(e,fields); save(db); return e; },
  deleteEvent(id) { db.events=db.events.filter(e=>e.id!==id); save(db); },

  getCourses() { return db.courses; },
  getCourseById(id) { return db.courses.find(c=>c.id===id); },
  addCourse(c) { db.courses.push(c); save(db); return c; },
  updateCourse(id, fields) { const c=db.courses.find(x=>x.id===id); if(c) Object.assign(c,fields); save(db); return c; },
  deleteCourse(id) { db.courses=db.courses.filter(c=>c.id!==id); db.course_progress=db.course_progress.filter(p=>p.course_id!==id); save(db); },
  getCourseProgress(userId) { return db.course_progress.filter(p => p.user_id === userId); },
  setCourseProgress(userId, courseId, progress) {
    const ex = db.course_progress.find(p => p.user_id === userId && p.course_id === courseId);
    if (ex) ex.progress = progress;
    else db.course_progress.push({ user_id: userId, course_id: courseId, progress });
    save(db);
  },

  getOnboardingSteps() { return [...db.onboarding_steps].sort((a, b) => a.order_num - b.order_num); },
  getOnboardingStep(id) { return db.onboarding_steps.find(s=>s.id===id); },
  addOnboardingStep(step) { db.onboarding_steps.push(step); save(db); return step; },
  deleteOnboardingStep(id) { db.onboarding_steps=db.onboarding_steps.filter(s=>s.id!==id); db.user_onboarding=db.user_onboarding.filter(p=>p.step_id!==id); save(db); },
  updateOnboardingStep(id, fields) { const s=db.onboarding_steps.find(x=>x.id===id); if(s) Object.assign(s,fields); save(db); return s; },
  getUserOnboarding(userId) { return db.user_onboarding.filter(p => p.user_id === userId); },
  setOnboarding(userId, stepId, completed) {
    const ex = db.user_onboarding.find(p => p.user_id === userId && p.step_id === stepId);
    if (ex) ex.completed = completed ? 1 : 0;
    else db.user_onboarding.push({ user_id: userId, step_id: stepId, completed: completed ? 1 : 0 });
    save(db);
  },

  getKnowledge() { return db.knowledge; },
  getKnowledgeById(id) { return db.knowledge.find(k => k.id === id); },
  addKnowledge(item) { db.knowledge.push(item); save(db); return item; },
  updateKnowledge(id, fields) { const k=db.knowledge.find(x=>x.id===id); if(k) Object.assign(k,fields); save(db); return k; },
  deleteKnowledge(id) { db.knowledge=db.knowledge.filter(k=>k.id!==id); save(db); },

  getNews() { return (db.news || []).filter(n=>!n.deleted).sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned) || new Date(b.created_at)-new Date(a.created_at)); },
  getNewsById(id) { return (db.news || []).find(n=>n.id===id && !n.deleted); },
  addNews(item) { db.news.push(item); save(db); return item; },
  updateNews(id, fields) { const n=(db.news||[]).find(x=>x.id===id && !x.deleted); if(n) Object.assign(n,fields); save(db); return n; },
  deleteNews(id) { const n=(db.news||[]).find(x=>x.id===id); if(n){n.deleted=true;n.deleted_at=new Date().toISOString();} save(db); return n; },

  getNotifications(userId) { return db.notifications.filter(n => !n.user_id || n.user_id === userId).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)); },
  addNotification(n) { db.notifications.push(n); save(db); return n; },
  markNotification(id,userId) { const n=db.notifications.find(x=>x.id===id && (!x.user_id || x.user_id===userId)); if(n){ n.read_by=n.read_by||[]; if(!n.read_by.includes(userId)) n.read_by.push(userId); } save(db); return n; },
  markAllNotifications(userId) { db.notifications.forEach(n=>{ if(!n.user_id || n.user_id===userId){n.read_by=n.read_by||[]; if(!n.read_by.includes(userId))n.read_by.push(userId);} }); save(db); },

  getMedia(type) {
    if (type) return db.media.filter(m => m.type === type);
    return db.media;
  },
  addMedia(item) { db.media.push(item); save(db); return item; },
  deleteMedia(id) {
    const item = db.media.find(m => m.id === id);
    if (item && item.filepath) {
      try { fs.unlinkSync(item.filepath); } catch {}
    }
    db.media = db.media.filter(m => m.id !== id);
    save(db);
  },

  getRooms(userId) {
    const u = db.users.find(x=>x.id===userId);
    // Support is private per employee. Technical Admin sees one support thread per employee.
    if (u && u.role !== 'technical_admin') store.getOrCreateSupportChat(userId);
    return db.chat_rooms.filter(r => {
      if (r.type === 'global') return true;
      if (r.type === 'support') return (r.member_ids || []).includes(userId);
      if (r.type === 'private') return (r.member_ids || []).includes(userId);
      return false;
    });
  },
  getRoom(id) { return db.chat_rooms.find(r => r.id === id); },
  getOrCreateSupportChat(userId) {
    const tech = db.users.find(u=>u.role==='technical_admin' && !u.removed);
    if (!tech || userId===tech.id) return null;
    let room=db.chat_rooms.find(r=>r.type==='support' && (r.member_ids||[]).length===2 && r.member_ids.includes(userId) && r.member_ids.includes(tech.id));
    if(!room){
      const user=db.users.find(u=>u.id===userId);
      room={id:uuidv4(),name:'Alex Node IT Support — '+(user?.name||user?.email||'User'),description:'Private technical support',type:'support',member_ids:[userId,tech.id],support_user_id:userId,created_at:new Date().toISOString()};
      db.chat_rooms.push(room); save(db);
    }
    return room;
  },
  getOrCreatePrivateChat(userA, userB) {
    let room = db.chat_rooms.find(r =>
      r.type === 'private' &&
      r.member_ids &&
      r.member_ids.includes(userA) &&
      r.member_ids.includes(userB) &&
      r.member_ids.length === 2
    );
    if (!room) {
      const ua = store.findUserById(userA);
      const ub = store.findUserById(userB);
      room = {
        id: uuidv4(),
        name: [ua?.name, ub?.name].filter(Boolean).join(' ↔ ') || 'Личный чат',
        description: 'Приватный чат',
        type: 'private',
        member_ids: [userA, userB],
        created_at: new Date().toISOString()
      };
      db.chat_rooms.push(room);
      save(db);
    }
    return room;
  },
  getMessages(roomId, since = null) {
    return db.messages
      .filter(m => m.room_id === roomId && (!since || new Date(m.created_at) >= new Date(since)))
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .slice(-300);
  },
  addMessage(msg) { msg.read_by=Array.isArray(msg.read_by)?msg.read_by:[msg.user_id].filter(Boolean); db.messages.push(msg); save(db); return msg; },
  markRoomRead(roomId,userId){ db.messages.forEach(m=>{if(m.room_id===roomId && m.user_id!==userId){m.read_by=m.read_by||[];if(!m.read_by.includes(userId))m.read_by.push(userId);}}); save(db); },
  unreadCount(roomId,userId){ return db.messages.filter(m=>m.room_id===roomId && m.user_id!==userId && !(m.read_by||[]).includes(userId)).length; },

  stats() {
    const realUsers = db.users.filter(u => !u.must_complete_registration && !u.system_account);
    const team = realUsers.length;
    const tasks = db.tasks.filter(t => t.status === 'open').length;
    const urgentTasks = db.tasks.filter(t => t.status === 'open' && t.priority === 'high').length;
    const today = new Date().toISOString().slice(0, 10);
    const events = db.events.filter(e => (e.date || '') >= today).length;
    const mediaCount = db.media.length;
    return { team, learning: 0, tasks, urgentTasks, events, media: mediaCount };
  }
};

module.exports = store;
