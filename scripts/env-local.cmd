@echo off
REM Batch script to switch to local development environment (Windows CMD)
echo.
echo [Switching to LOCAL development environment...]

if exist .env.local (
    copy /Y .env.local .env >nul
    echo [OK] Copied .env.local to .env
    echo.
    echo Current configuration:
    findstr /R "^NODE_ENV= ^CORS_ORIGIN= ^FRONTEND_URL= ^GOOGLE_CALLBACK_URL=" .env
    echo.
    echo [OK] Ready for local development!
    echo Run: npm run dev
) else (
    echo [ERROR] .env.local not found!
    echo Please create .env.local first
    exit /b 1
)
