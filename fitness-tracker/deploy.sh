#!/bin/bash

# Fitness Tracker Deployment Script for AWS Lightsail
# Usage: ./deploy.sh [your-lightsail-ip]

# Configuration
LIGHTSAIL_IP=${1:-"your-lightsail-ip"}
LIGHTSAIL_USER="ubuntu"
APP_NAME="fitness-tracker"
REMOTE_DIR="/home/ubuntu/fitness-tracker"

echo "🚀 Starting deployment to Lightsail ($LIGHTSAIL_IP)..."

# Build the application
echo "📦 Building application..."
npm run build

# Create deployment archive
echo "📁 Creating deployment archive..."
tar -czf ${APP_NAME}.tar.gz \
  build/ \
  package.json \
  package-lock.json \
  ecosystem.config.js \
  --exclude=node_modules

# Upload to Lightsail
echo "⬆️  Uploading to Lightsail..."
scp ${APP_NAME}.tar.gz ${LIGHTSAIL_USER}@${LIGHTSAIL_IP}:~

# Deploy on server
echo "🔧 Deploying on server..."
ssh ${LIGHTSAIL_USER}@${LIGHTSAIL_IP} << 'EOF'
  # Stop existing app
  pm2 stop fitness-tracker || true
  
  # Create directory and extract
  mkdir -p ~/fitness-tracker
  cd ~/fitness-tracker
  
  # Extract new version
  tar -xzf ~/fitness-tracker.tar.gz
  
  # Install dependencies
  npm ci --production
  
  # Copy database if it doesn't exist
  if [ ! -f fitness.db ]; then
    echo "📊 Creating new database..."
    touch fitness.db
  fi
  
  # Start/restart with PM2
  pm2 start ecosystem.config.js || pm2 restart fitness-tracker
  
  # Save PM2 process list
  pm2 save
  
  # Cleanup
  rm ~/fitness-tracker.tar.gz
  
  echo "✅ Deployment complete!"
  pm2 status
EOF

# Cleanup local files
rm ${APP_NAME}.tar.gz

echo "🎉 Deployment finished! Your app should be running on http://${LIGHTSAIL_IP}:3000"
echo "💡 Don't forget to configure your domain to point to this server!"