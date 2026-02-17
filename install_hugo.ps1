# ============================================
# Hugo Extended Installer
# ============================================

Write-Host "Installing Hugo Extended v0.128.0..." -ForegroundColor Cyan

# Create Hugo directory
$hugoDir = "C:\Hugo"
$binDir = "$hugoDir\bin"

if (-not (Test-Path $hugoDir)) {
    New-Item -ItemType Directory -Path $hugoDir -Force | Out-Null
    Write-Host "Created Hugo directory: $hugoDir" -ForegroundColor Green
}

if (-not (Test-Path $binDir)) {
    New-Item -ItemType Directory -Path $binDir -Force | Out-Null
    Write-Host "Created bin directory: $binDir" -ForegroundColor Green
}

# Download Hugo Extended
$hugoUrl = "https://github.com/gohugoio/hugo/releases/download/v0.128.0/hugo_extended_0.128.0_windows-amd64.zip"
$zipPath = "$env:TEMP\hugo_extended.zip"

Write-Host "Downloading Hugo Extended..." -ForegroundColor Cyan
Invoke-WebRequest -Uri $hugoUrl -OutFile $zipPath

# Extract Hugo
Write-Host "Extracting Hugo..." -ForegroundColor Cyan
Expand-Archive -Path $zipPath -DestinationPath $binDir -Force

# Clean up
Remove-Item $zipPath -Force

# Add to PATH (current session)
$env:Path += ";$binDir"

# Verify installation
if (Test-Path "$binDir\hugo.exe") {
    Write-Host "✅ Hugo Extended installed successfully!" -ForegroundColor Green
    Write-Host "Location: $binDir\hugo.exe" -ForegroundColor Yellow
    
    # Test Hugo
    $version = & "$binDir\hugo.exe" version
    Write-Host "Version: $version" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "To make Hugo available in all PowerShell sessions:" -ForegroundColor Yellow
    Write-Host "1. Open System Properties" -ForegroundColor White
    Write-Host "2. Go to Advanced → Environment Variables" -ForegroundColor White
    Write-Host "3. Add ;C:\Hugo\bin to PATH" -ForegroundColor White
} else {
    Write-Host "❌ Hugo installation failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "You can now run: .\quick-start.ps1" -ForegroundColor Green
pause