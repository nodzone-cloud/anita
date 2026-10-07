S.P.A.C.E. 2.4.9 ONLINE PREVIEW

Purpose
- Browser version of the current S.P.A.C.E. build for Olga Larkina.
- No functionality was intentionally removed from the web/server application.
- Login is shown for presentation, then the preview credentials are typed and submitted automatically.
- Olga enters as Owner / Main Administrator and can explore management functions.

Preview account (isolated demo data only)
Email: olga.preview@space.local
Password: SPACEpreview2026!

Run locally
1. npm install
2. npm start
3. Open http://localhost:3000

Online hosting
This package includes render.yaml and is ready for a Node hosting service such as Render.
The app needs a Node server; it is NOT a static-only website.

Important hosting note
The current S.P.A.C.E. data store is file-based (data/db.json + data/uploads). On hosts with ephemeral storage, data can reset after redeploy/restart unless persistent storage is configured. This does not reduce the preview UI/functionality, but production deployment should use persistent storage/database.

Based on: SPACE_2.4.9_UNIVERSAL_NEWS_VIDEO_STOP_FIX_Source
