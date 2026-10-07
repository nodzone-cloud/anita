@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo   S.P.A.C.E. Windows Installer Builder
echo ========================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js LTS is not installed.
  echo Install Node.js LTS, then run this file again.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found.
  pause
  exit /b 1
)
echo [1/2] Installing build dependencies...
call npm install --no-audit --no-fund
if errorlevel 1 goto :fail
echo.
echo [2/2] Building S.P.A.C.E. Setup.exe...
call npm run pack
if errorlevel 1 goto :fail
echo.
echo SUCCESS. Opening dist folder...
start "" "%~dp0dist"
pause
exit /b 0
:fail
echo.
echo BUILD FAILED. Copy the error shown above.
pause
exit /b 1
