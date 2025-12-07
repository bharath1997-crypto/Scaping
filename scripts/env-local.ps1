# PowerShell script to switch to local development environment
Write-Host "
 Switching to LOCAL development environment..." -ForegroundColor Cyan

if (Test-Path .env.local) {
    Copy-Item .env.local .env -Force
    Write-Host " Copied .env.local to .env" -ForegroundColor Green
    Write-Host "
 Current configuration:" -ForegroundColor Yellow
    Get-Content .env | Select-String -Pattern "^(NODE_ENV|CORS_ORIGIN|FRONTEND_URL|GOOGLE_CALLBACK_URL)=" | ForEach-Object { Write-Host "  " }
} else {
    Write-Host " .env.local not found!" -ForegroundColor Red
    Write-Host "   Please create .env.local first" -ForegroundColor Yellow
    exit 1
}

Write-Host "
 Ready for local development!" -ForegroundColor Green
Write-Host "   Run: npm run dev" -ForegroundColor White
