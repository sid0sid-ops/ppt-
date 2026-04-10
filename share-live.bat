@echo off
TITLE BioAlign-Pro Live Sharer
echo ==========================================
echo   🌐 SHARING BIOALIGN-PRO TO THE WEB
echo ==========================================
echo.
echo [1] Verifying server is likely running on 8080...
echo [2] Initializing Tunnel...
echo.
echo ⚠️  KEEP THIS WINDOW OPEN TO KEEP THE LINK ALIVE.
echo ⚠️  DO NOT SHARE YOUR IP PRIVATELY, ONLY THIS LINK.
echo.
echo Generating public link...
echo ------------------------------------------
npx localtunnel --port 8080
echo ------------------------------------------
echo.
echo [!] If localtunnel is stuck, press CTRL+C and run again.
pause
