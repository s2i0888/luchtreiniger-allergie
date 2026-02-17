# Manual CSS Minification for Static Deployment
Write-Host "📦 Minifying CSS files for static deployment..." -ForegroundColor Cyan

# Check if cssnano is available
$cssnano = Get-Command cssnano -ErrorAction SilentlyContinue

if (-not $cssnano) {
    Write-Host "⚠️  cssnano not found. Installing via npm..." -ForegroundColor Yellow
    npm install -g cssnano
}

# Minify each CSS file
$cssFiles = @(
    "static/css/premium.css",
    "static/css/products.css", 
    "static/css/calculator-gamified.css",
    "static/css/style.css"
)

foreach ($file in $cssFiles) {
    if (Test-Path $file) {
        $minFile = $file -replace '\.css$', '.min.css'
        Write-Host "Minifying: $file -> $minFile" -ForegroundColor Gray
        
        # Simple minification (remove comments, whitespace)
        $content = Get-Content $file -Raw
        $minified = $content -replace '/\*.*?\*/', '' -replace '\s+', ' ' -replace '^\s+|\s+$', ''
        
        # Save minified version
        Set-Content -Path $minFile -Value $minified -Encoding UTF8
        
        # Also copy to public folder
        $publicFile = "public/css/" + (Split-Path $minFile -Leaf)
        Copy-Item $minFile $publicFile -Force
        
        Write-Host "✅ Created: $publicFile" -ForegroundColor Green
    }
}

Write-Host "🎉 CSS minification complete!" -ForegroundColor Green
Write-Host "Update baseof.html to use .min.css files if desired." -ForegroundColor Yellow