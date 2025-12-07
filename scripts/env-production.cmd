@echo off
REM Batch script to switch to production environment (Windows CMD)
echo.
echo [Switching to PRODUCTION environment...]

if exist .env.production (
    copy /Y .env.production .env >nul
    echo [OK] Copied .env.production to .env
    echo.
    echo Current configuration:
    findstr /R "^NODE_ENV= ^CORS_ORIGIN= ^FRONTEND_URL= ^GOOGLE_CALLBACK_URL=" .env
    echo.
    echo [WARNING] You are now using PRODUCTION settings!
    echo Make sure you're deploying to the correct server!
    echo.
    echo [OK] Ready for production deployment!
) else (
    echo [ERROR] .env.production not found!
    echo Please create .env.production first
    exit /b 1
)
