# Simple Fitness Tracker Deployment Script for Windows
# Usage: .\deploy-simple.ps1 YOUR_LIGHTSAIL_IP

param(
    [Parameter(Mandatory=$true)]
    [string]$LightsailIP
)

$LightsailUser = "ubuntu"
$AppName = "fitness-tracker"

Write-Host "Building application..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Creating deployment package..." -ForegroundColor Blue

# Create temp directory
$tempDir = "deploy-temp"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files
Copy-Item "build" $tempDir -Recurse
Copy-Item "package.json" $tempDir
Copy-Item "package-lock.json" $tempDir
Copy-Item "ecosystem.config.js" $tempDir

Write-Host "Uploading files..." -ForegroundColor Blue

# Upload each file/folder individually (more reliable than tar)
scp -r "$tempDir/*" "${LightsailUser}@${LightsailIP}:~/fitness-tracker-new/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Upload failed! Make sure you can SSH to your server." -ForegroundColor Red
    Write-Host "Test with: ssh ubuntu@$LightsailIP" -ForegroundColor Yellow
    exit 1
}

Write-Host "Deploying on server..." -ForegroundColor Blue

# Run deployment commands on server
ssh "${LightsailUser}@${LightsailIP}" "
pm2 stop fitness-tracker 2>/dev/null || true
rm -rf ~/fitness-tracker-old
mv ~/fitness-tracker ~/fitness-tracker-old 2>/dev/null || true
mv ~/fitness-tracker-new ~/fitness-tracker
cd ~/fitness-tracker
npm ci --production
if [ ! -f fitness.db ]; then touch fitness.db; fi
pm2 start ecosystem.config.js 2>/dev/null || pm2 restart fitness-tracker
pm2 save
pm2 status
"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host "Your app is running at: http://$LightsailIP`:3000" -ForegroundColor Cyan
    Write-Host "Admin panel: http://$LightsailIP`:3000/admin/add" -ForegroundColor Yellow
} else {
    Write-Host "Deployment failed!" -ForegroundColor Red
}

# Cleanup
Remove-Item $tempDir -Recurse -Force