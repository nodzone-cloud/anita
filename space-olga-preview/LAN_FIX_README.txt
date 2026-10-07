S.P.A.C.E. 2.4.9 LAN FIX

Fix: the original 2.4.9 configurator could write connection.json to %APPDATA%\S.P.A.C.E. while Electron read its userData from %APPDATA%\space-internal-workspace. As a result the Samsung client silently started its own localhost server and rejected accounts created on the main PC.

This build reads both locations and the configuration scripts write both locations.
