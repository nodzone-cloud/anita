@echo off
setlocal
set "CFG1=%APPDATA%\S.P.A.C.E.\connection.json"
set "CFG2=%APPDATA%\space-internal-workspace\connection.json"
if not exist "%APPDATA%\S.P.A.C.E." mkdir "%APPDATA%\S.P.A.C.E."
if not exist "%APPDATA%\space-internal-workspace" mkdir "%APPDATA%\space-internal-workspace"
>"%CFG1%" echo {"mode":"server","serverUrl":"http://localhost:3000"}
>"%CFG2%" echo {"mode":"server","serverUrl":"http://localhost:3000"}
echo.
echo S.P.A.C.E. 2.4.9 - LAN SERVER SETUP (FIXED)
echo -------------------------------------------
echo This computer is now configured as the S.P.A.C.E. LAN server.
echo Close S.P.A.C.E. completely and start it again.
echo.
echo Your IPv4 addresses:
ipconfig | findstr /i "IPv4"
echo.
echo Client computers should use this computer's LAN IPv4 address.
pause
