#!/bin/bash

# Fitness Tracker Update Script
# Run this on your Lightsail server to update the app

echo "🔄 Starting fitness tracker update..."

# Backup current database
echo "📦 Backing up database..."
cp ~/fitness-tracker/fitness.db ~/fitness-tracker-backup-$(date +%Y%m%d-%H%M%S).db

# Navigate to repo directory
cd ~/fitness-tracker-repo

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies and build
echo "📦 Installing dependencies..."
npm ci --production

echo "🏗️ Building application..."
npm run build

# Stop current app
echo "⏹️ Stopping current app..."
pm2 stop fitness-tracker

# Backup current app directory
echo "💾 Backing up current app..."
mv ~/fitness-tracker ~/fitness-tracker-backup-$(date +%Y%m%d-%H%M%S)

# Copy new build to app directory
echo "📁 Deploying new version..."
mkdir -p ~/fitness-tracker
cp -r build ~/fitness-tracker/
cp package.json ~/fitness-tracker/
cp ecosystem.config.cjs ~/fitness-tracker/

# Restore database
echo "🗄️ Restoring database..."
cp ~/fitness-tracker-backup-*/fitness.db ~/fitness-tracker/ 2>/dev/null || touch ~/fitness-tracker/fitness.db

# Start app
echo "🚀 Starting updated app..."
cd ~/fitness-tracker
pm2 start ecosystem.config.cjs || pm2 restart fitness-tracker
pm2 save

echo "✅ Update complete!"
echo "🌐 Your app is running at: https://fitness.yourdomain.com"

# Show status
pm2 status