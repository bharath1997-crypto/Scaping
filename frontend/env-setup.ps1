# Domain Setup Script for AppCortex (PowerShell)
# This script helps you set up environment variables for your domain

Write-Host "🚀 AppCortex Domain Setup" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Ask for domain
$domain = Read-Host "Enter your domain (e.g., appcortex.pro)"

if ([string]::IsNullOrWhiteSpace($domain)) {
    Write-Host "❌ Domain is required!" -ForegroundColor Red
    exit 1
}

# Ask for environment
Write-Host ""
Write-Host "Select environment:"
Write-Host "1) Production (https://$domain)"
Write-Host "2) Development (http://localhost:3000)"
$envChoice = Read-Host "Enter choice [1-2]"

switch ($envChoice) {
    "1" {
        $envType = "production"
        $apiUrl = "https://$domain/api/v1"
        $siteUrl = "https://$domain"
    }
    "2" {
        $envType = "development"
        $apiUrl = "http://localhost:4000/api/v1"
        $siteUrl = "http://localhost:3000"
        $domain = "localhost"
    }
    default {
        Write-Host "❌ Invalid choice!" -ForegroundColor Red
        exit 1
    }
}

# Create .env.local file
$envFile = ".env.local"

Write-Host ""
Write-Host "📝 Creating $envFile..." -ForegroundColor Yellow

$content = @"
# AppCortex Environment Variables ($envType)
# Generated on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# API URL
NEXT_PUBLIC_API_URL=$apiUrl

# Domain Configuration
NEXT_PUBLIC_DOMAIN=$domain
NEXT_PUBLIC_SITE_URL=$siteUrl
"@

$content | Out-File -FilePath $envFile -Encoding utf8

Write-Host "✅ Created $envFile" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Configuration:" -ForegroundColor Cyan
Write-Host "   Domain: $domain"
Write-Host "   API URL: $apiUrl"
Write-Host "   Site URL: $siteUrl"
Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Review $envFile and update if needed"
Write-Host "2. Update Google OAuth settings with your domain"
Write-Host "3. Configure DNS records"
Write-Host "4. Set up SSL certificate"
Write-Host ""
Write-Host "See DOMAIN_SETUP.md for detailed instructions."

