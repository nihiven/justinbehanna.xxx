# Fitness Tracker Update & Deploy Script for Windows
# Usage: .\update-deploy.ps1 -LightsailIP "YOUR_IP"

param(
    [Parameter(Mandatory=$true)]
    [string]$LightsailIP,
    [string]$LightsailUser = "ubuntu",
    [string]$SSHKey = "east.pem"
)

Write-Host "🔄 Starting fitness tracker update and deployment..." -ForegroundColor Green

# Build locally
Write-Host "🏗️ Building application..." -ForegroundColor Blue

# Clean build directory first to avoid file locks
Write-Host "🧹 Cleaning build directory..." -ForegroundColor Yellow
Remove-Item build -Recurse -Force -ErrorAction SilentlyContinue
Start-Sleep 1

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Create deployment package
Write-Host "📦 Creating deployment package..." -ForegroundColor Blue
$tempDir = "deploy-update"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

Copy-Item "build" $tempDir -Recurse
Copy-Item "package.json" $tempDir
Copy-Item "ecosystem.config.cjs" $tempDir

# Upload to server
Write-Host "📤 Uploading to server..." -ForegroundColor Blue
scp -i $SSHKey -r "$tempDir/*" "${LightsailUser}@${LightsailIP}:~/fitness-tracker-update/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    exit 1
}

# Deploy on server
Write-Host "🚀 Deploying on server..." -ForegroundColor Blue
ssh -i $SSHKey "${LightsailUser}@${LightsailIP}" "
# Backup database
cp ~/fitness-tracker/fitness.db ~/fitness-tracker-backup-`$(date +%Y%m%d-%H%M%S).db 2>/dev/null || true

# Stop app
pm2 stop fitness-tracker

# Backup current app
mv ~/fitness-tracker ~/fitness-tracker-backup-`$(date +%Y%m%d-%H%M%S) 2>/dev/null || true

# Deploy new version
mv ~/fitness-tracker-update ~/fitness-tracker
cd ~/fitness-tracker

# Install dependencies
npm install --omit=dev

# Restore database
cp ~/fitness-tracker-backup-*/fitness.db . 2>/dev/null || touch fitness.db

# Start app
pm2 start ecosystem.config.cjs || pm2 restart fitness-tracker
pm2 save

echo '✅ Update deployed successfully!'
pm2 status
"

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Deployment successful!" -ForegroundColor Green
    Write-Host "🌐 Your app is running at: https://fitness.yourdomain.com" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
}

# Cleanup
Remove-Item $tempDir -Recurse -Force