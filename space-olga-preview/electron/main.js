const { app, BrowserWindow, shell, Menu, session, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let serverStarted = false;
let connectionMode = 'server';
let serverUrl = 'http://localhost:3000';

function loadConnectionConfig() {
  // app.getPath('userData') is authoritative. Older 2.4.9 setup scripts wrote
  // connection.json under %APPDATA%\S.P.A.C.E., while Electron can use the
  // package-name directory (%APPDATA%\space-internal-workspace). Read both so
  // LAN client mode works regardless of which 2.4.9 build/configurator was used.
  const candidates = [
    path.join(app.getPath('userData'), 'connection.json'),
    path.join(app.getPath('appData'), 'S.P.A.C.E.', 'connection.json'),
    path.join(app.getPath('appData'), 'space-internal-workspace', 'connection.json')
  ];
  let cfg = null;
  for (const configPath of candidates) {
    try {
      cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (cfg) break;
    } catch {}
  }
  if (cfg && cfg.mode === 'client' && /^https?:\/\//i.test(cfg.serverUrl || '')) {
    connectionMode = 'client';
    serverUrl = String(cfg.serverUrl).replace(/\/$/, '');
  } else {
    connectionMode = 'server';
    serverUrl = 'http://localhost:3000';
  }
}


async function startBackend() {
  if (serverStarted) return;
  // Store writable database/uploads outside app.asar so installed builds persist safely.
  const dataDir = path.join(app.getPath('userData'), 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  process.env.SPACE_DATA_DIR = dataDir;
  // When packaged, server files live next to app resources
  const serverPath = path.join(__dirname, '..', 'server', 'index.js');
  const { startServer } = require(serverPath);
  await startServer(3000);
  serverStarted = true;
}

async function createWindow() {
  // Remove stale frontend/service-worker caches between installed versions.
  // This deliberately preserves localStorage and the S.P.A.C.E. data directory.
  try {
    await session.defaultSession.clearCache();
    await session.defaultSession.clearStorageData({ storages: ['serviceworkers', 'cachestorage'] });
  } catch (e) { console.warn('Cache cleanup skipped:', e.message); }
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'S.P.A.C.E.',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Windows/Electron can occasionally show the window without giving the renderer
    // keyboard focus. Explicitly focus it so text fields work immediately.
    mainWindow.focus();
    setTimeout(() => { if (mainWindow && !mainWindow.isDestroyed()) mainWindow.focus(); }, 150);
  });
  mainWindow.webContents.on('did-finish-load', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
  try {
    await mainWindow.loadURL(serverUrl);
  } catch (err) {
    // Never leave the installed client apparently 'not opening' when the LAN server is unavailable.
    // Show the window and a local diagnostic page so the user can see exactly what to fix.
    const safeServer = String(serverUrl).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const detail = connectionMode === 'client'
      ? `Server: ${serverUrl}\n\nCheck that the server PC is running, both computers are on the same LAN/Wi-Fi, and Windows Firewall allows TCP port 3000.`
      : String(err.message || err);
    await mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`<!doctype html><html><head><meta charset="utf-8"><title>S.P.A.C.E.</title><style>body{font-family:Segoe UI,Arial,sans-serif;background:#f5f7fb;color:#111827;padding:48px}main{max-width:760px;margin:auto;background:white;border:1px solid #e5e7eb;border-radius:18px;padding:32px;box-shadow:0 12px 35px rgba(0,0,0,.08)}h1{margin-top:0}.server{padding:12px;background:#f3f4f6;border-radius:10px;font-family:Consolas,monospace}</style></head><body><main><h1>S.P.A.C.E. LAN connection</h1><p>The application opened correctly, but it cannot reach the LAN server.</p><div class="server">${safeServer}</div><p>Start S.P.A.C.E. on the server PC, confirm both computers are on the same network, and check TCP port 3000. Then close and reopen S.P.A.C.E.</p></main></body></html>`));
    mainWindow.show();
    await dialog.showMessageBox(mainWindow,{type:'error',title:'S.P.A.C.E. connection',message:connectionMode==='client'?'Cannot connect to the S.P.A.C.E. LAN server.':'Cannot start the local S.P.A.C.E. server.',detail});
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(async () => {
  try {
    loadConnectionConfig();
    if (connectionMode === 'server') await startBackend();
    await createWindow();
  } catch (err) {
    console.error(err);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) await createWindow();
});
