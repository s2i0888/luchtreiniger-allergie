# ============================================
# Luchtreiniger Allergie - Quick Start Script
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Luchtreiniger Allergie - Local Development" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check Hugo installation
$hugoPath = "C:\Hugo\bin\hugo.exe"
if (Test-Path $hugoPath) {
    Write-Host "[1] ✅ Hugo found at: $hugoPath" -ForegroundColor Green
} else {
    Write-Host "[1] ❌ Hugo not found at $hugoPath" -ForegroundColor Red
    Write-Host "Please install Hugo Extended first" -ForegroundColor Yellow
    Write-Host "Run: .\install_hugo.ps1" -ForegroundColor Yellow
    pause
    exit
}

# Change to project directory
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "[2] Starting Hugo development server..." -ForegroundColor Cyan
Write-Host "Site will be available at: http://localhost:1316/" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start Hugo server
& $hugoPath server --buildDrafts --port 1316

Write-Host ""
Write-Host "[3] Server stopped" -ForegroundColor Cyan
Write-Host "You can close this window" -ForegroundColor Yellow
pause