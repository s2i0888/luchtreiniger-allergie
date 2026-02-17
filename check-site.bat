@echo off
echo ============================================
echo Luchtreiniger Allergie - Local Development
echo ============================================
echo.
echo [1] Checking Hugo installation...
if exist "C:\Hugo\bin\hugo.exe" (
    echo ✅ Hugo found at: C:\Hugo\bin\hugo.exe
) else (
    echo ❌ Hugo not found at C:\Hugo\bin\hugo.exe
    echo Please install Hugo Extended first
    pause
    exit /b 1
)

echo.
echo [2] Starting Hugo development server...
echo Site will be available at: http://localhost:1316/
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
"C:\Hugo\bin\hugo.exe" server --buildDrafts --port 1316

echo.
echo [3] Server stopped
echo You can close this window
pause