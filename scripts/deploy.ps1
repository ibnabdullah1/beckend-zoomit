# PowerShell deployment script for Windows
# Usage: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ Error: .env file not found!" -ForegroundColor Red
    Write-Host "Please create a .env file with required environment variables."
    exit 1
}

# Build the project
Write-Host "📦 Building TypeScript project..." -ForegroundColor Yellow
yarn build

# Check if build was successful
if (-not (Test-Path "dist")) {
    Write-Host "❌ Error: Build failed! dist directory not found." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Create deployment package
Write-Host "📦 Creating deployment package..." -ForegroundColor Yellow

if (Test-Path "deploy-package") {
    Remove-Item -Recurse -Force "deploy-package"
}

New-Item -ItemType Directory -Path "deploy-package" | Out-Null
Copy-Item -Recurse "dist" "deploy-package\"
if (Test-Path "uploads") {
    Copy-Item -Recurse "uploads" "deploy-package\"
} else {
    Write-Host "Warning: uploads directory not found" -ForegroundColor Yellow
}
Copy-Item "package.json" "deploy-package\"
Copy-Item "yarn.lock" "deploy-package\"
Copy-Item ".env" "deploy-package\"

Write-Host "✅ Deployment package created!" -ForegroundColor Green
Write-Host "📤 Ready to upload to FTP server" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Use FTP client (FileZilla, WinSCP, etc.)"
Write-Host "2. Connect to: 103.29.180.47 (or thezoomit.com)"
Write-Host "3. Upload contents of deploy-package\ to /public_html/"
Write-Host ""
Write-Host "Or use GitHub Actions for automatic deployment!" -ForegroundColor Cyan

