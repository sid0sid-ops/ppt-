@echo off
TITLE BioAlign-Pro Engine Launcher
echo ==========================================
echo   🚀 STARTING BIOALIGN-PRO ENGINE
echo ==========================================
echo.
echo [1] Checking dependencies...
if not exist node_modules (
    echo [!] node_modules not found. Installing...
    call npm install
)

echo [2] Launching Local Server + CSS Watcher...
echo [!] TIP: Keep this window open while working.
echo [!] TIP: Close this window to stop the server.
echo.
echo Opening browser to http://localhost:8080 ...
start http://localhost:8080

call npm run dev

pause
