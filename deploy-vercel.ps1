# Deploy luchtreiniger-allergie.nl to Vercel
# Run this script after configuring Vercel token

Write-Host "🚀 Vercel Deployment Script" -ForegroundColor Green
Write-Host "============================="

# Check if Vercel CLI is installed
$vercelCheck = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelCheck) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install --global vercel
}

# Build Hugo site
Write-Host "📦 Building Hugo site..." -ForegroundColor Cyan
hugo --minify --cleanDestinationDir

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Hugo build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful" -ForegroundColor Green
Write-Host "📁 Files generated: $(Get-ChildItem -Path ./public -File -Recurse | Measure-Object).Count" -ForegroundColor Cyan

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host "Note: You need to:" -ForegroundColor Yellow
Write-Host "1. Run: vercel login" -ForegroundColor Yellow
Write-Host "2. Run: vercel --prod" -ForegroundColor Yellow
Write-Host "3. Configure domain: luchtreiniger-allergie.nl" -ForegroundColor Yellow

# Show deployment commands
Write-Host "`n📋 Deployment Commands:" -ForegroundColor Green
Write-Host "======================"
Write-Host "vercel login" -ForegroundColor Cyan
Write-Host "vercel --prod" -ForegroundColor Cyan
Write-Host "vercel domains add luchtreiniger-allergie.nl" -ForegroundColor Cyan

# Show site information
Write-Host "`n🌐 Site Information:" -ForegroundColor Green
Write-Host "==================="
Write-Host "Primary URL: https://luchtreiniger-allergie.nl" -ForegroundColor Cyan
Write-Host "Test Methodologie: https://luchtreiniger-allergie.nl/test-methodologie/" -ForegroundColor Cyan
Write-Host "Sitemap: https://luchtreiniger-allergie.nl/sitemap.xml" -ForegroundColor Cyan
Write-Host "robots.txt: https://luchtreiniger-allergie.nl/robots.txt" -ForegroundColor Cyan

# DNS configuration
Write-Host "`n🔧 DNS Configuration:" -ForegroundColor Green
Write-Host "====================="
Write-Host "After Vercel deployment, configure DNS:" -ForegroundColor Yellow
Write-Host "Type    Name                        Value" -ForegroundColor Cyan
Write-Host "A       luchtreiniger-allergie.nl   [Vercel IP]" -ForegroundColor Cyan
Write-Host "CNAME   www                         cname.vercel-dns.com" -ForegroundColor Cyan

Write-Host "`n✅ Ready for deployment!" -ForegroundColor Green