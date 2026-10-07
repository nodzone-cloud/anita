@echo off
setlocal
set "CFG1=%APPDATA%\S.P.A.C.E.\connection.json"
set "CFG2=%APPDATA%\space-internal-workspace\connection.json"
echo.
echo S.P.A.C.E. 2.4.9 - LAN CLIENT SETUP (FIXED)
echo -------------------------------------------
echo Enter the LAN IPv4 address of the SERVER computer.
echo Example: 192.168.1.100
echo.
set /p SERVERIP=Server IP: 
if "%SERVERIP%"=="" goto :cancel
if not exist "%APPDATA%\S.P.A.C.E." mkdir "%APPDATA%\S.P.A.C.E."
if not exist "%APPDATA%\space-internal-workspace" mkdir "%APPDATA%\space-internal-workspace"
>"%CFG1%" echo {"mode":"client","serverUrl":"http://%SERVERIP%:3000"}
>"%CFG2%" echo {"mode":"client","serverUrl":"http://%SERVERIP%:3000"}
echo.
echo Client mode saved: http://%SERVERIP%:3000
echo Configuration written to both supported Electron data locations.
echo Close S.P.A.C.E. completely and start it again.
pause
exit /b 0
:cancel
echo Cancelled.
pause
