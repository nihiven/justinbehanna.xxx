# Fitness Tracker Deployment Script for AWS Lightsail (Windows PowerShell)
# Usage: .\deploy.ps1 -LightsailIP "your-lightsail-ip"

param(
    [Parameter(Mandatory=$true)]
    [string]$LightsailIP,
    
    [string]$LightsailUser = "ubuntu",
    [string]$AppName = "fitness-tracker"
)

Write-Host "🚀 Starting deployment to Lightsail ($LightsailIP)..." -ForegroundColor Green

# Check if SSH is available
if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Host "❌ SSH not found. Please install OpenSSH or use WSL/Git Bash" -ForegroundColor Red
    Write-Host "💡 Alternative: Use the manual deployment steps in DEPLOYMENT.md" -ForegroundColor Yellow
    exit 1
}

# Build the application
Write-Host "📦 Building application..." -ForegroundColor Blue
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Create deployment files list
$filesToDeploy = @(
    "build",
    "package.json",
    "package-lock.json", 
    "ecosystem.config.js"
)

# Create temporary deployment directory
$tempDir = "temp-deploy"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files to temp directory
foreach ($file in $filesToDeploy) {
    if (Test-Path $file) {
        Write-Host "📁 Copying $file..." -ForegroundColor Cyan
        if (Test-Path $file -PathType Container) {
            Copy-Item $file $tempDir -Recurse
        } else {
            Copy-Item $file $tempDir
        }
    }
}

# Create tar archive (requires tar on Windows 10+)
Write-Host "📦 Creating deployment archive..." -ForegroundColor Blue
$archiveName = "$AppName.tar.gz"
if (Get-Command tar -ErrorAction SilentlyContinue) {
    Set-Location $tempDir
    tar -czf "../$archiveName" *
    Set-Location ..
} else {
    Write-Host "❌ tar command not found. Using manual file copy method..." -ForegroundColor Yellow
    # Fall back to individual file uploads
}

# Upload to Lightsail
Write-Host "⬆️  Uploading to Lightsail..." -ForegroundColor Blue
if (Test-Path $archiveName) {
    scp $archiveName "$($LightsailUser)@$($LightsailIP):~"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Upload failed! Check your SSH connection and credentials." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Archive creation failed. Please use manual deployment." -ForegroundColor Red
    exit 1
}

# Deploy on server
Write-Host "🔧 Deploying on server..." -ForegroundColor Blue
$deployScript = @"
pm2 stop fitness-tracker || true
mkdir -p ~/fitness-tracker
cd ~/fitness-tracker
tar -xzf ~/$archiveName
npm ci --production
if [ ! -f fitness.db ]; then
  echo 'Creating new database...'
  touch fitness.db
fi
pm2 start ecosystem.config.js || pm2 restart fitness-tracker
pm2 save
rm ~/$archiveName
echo 'Deployment complete!'
pm2 status
"@

ssh "$($LightsailUser)@$($LightsailIP)" "$deployScript"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

# Cleanup local files
Remove-Item $tempDir -Recurse -Force
if (Test-Path $archiveName) {
    Remove-Item $archiveName
}

Write-Host "🎉 Deployment finished! Your app should be running on http://$($LightsailIP):3000" -ForegroundColor Green
Write-Host "💡 Don't forget to configure your domain to point to this server!" -ForegroundColor Yellow
Write-Host "🔗 Admin URL: http://$($LightsailIP):3000/admin/add" -ForegroundColor Cyan