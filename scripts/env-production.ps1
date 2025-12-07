# PowerShell script to switch to production environment
Write-Host "
 Switching to PRODUCTION environment..." -ForegroundColor Cyan

if (Test-Path .env.production) {
    Copy-Item .env.production .env -Force
    Write-Host " Copied .env.production to .env" -ForegroundColor Green
    Write-Host "
 Current configuration:" -ForegroundColor Yellow
    Get-Content .env | Select-String -Pattern "^(NODE_ENV|CORS_ORIGIN|FRONTEND_URL|GOOGLE_CALLBACK_URL)=" | ForEach-Object { Write-Host "  " }
    Write-Host "
  WARNING: You are now using PRODUCTION settings!" -ForegroundColor Red
    Write-Host "   Make sure you're deploying to the correct server!" -ForegroundColor Yellow
} else {
    Write-Host " .env.production not found!" -ForegroundColor Red
    Write-Host "   Please create .env.production first" -ForegroundColor Yellow
    exit 1
}

Write-Host "
 Ready for production deployment!" -ForegroundColor Green
