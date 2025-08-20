# Fitness Tracker Deployment Guide

## 🚀 AWS Lightsail Deployment

> **Windows Users:** See `DEPLOY-WINDOWS.md` for Windows-specific instructions and PowerShell script!

### Prerequisites

1. **AWS Lightsail Instance** - Ubuntu 20.04+ recommended
2. **SSH Access** - Your SSH key configured
3. **Domain** - Your domain ready to point to Lightsail

### One-Time Server Setup

SSH into your Lightsail instance and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Create logs directory
mkdir -p ~/logs

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions PM2 provides
```

### Deployment Steps

1. **Prepare for deployment:**
   ```bash
   # Make deploy script executable
   chmod +x deploy.sh
   ```

2. **Deploy to Lightsail:**
   ```bash
   # Replace YOUR_IP with your Lightsail instance IP
   ./deploy.sh YOUR_LIGHTSAIL_IP
   ```

3. **Configure domain:**
   - In your domain registrar (GoDaddy, Namecheap, etc.)
   - Create an A record pointing to your Lightsail IP
   - Example: `fitness.yourdomain.com` → `YOUR_LIGHTSAIL_IP`

### Domain & SSL Setup (Optional)

For a production setup with SSL:

```bash
# Install Nginx
sudo apt install nginx

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx

# Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/fitness-tracker
```

Add this Nginx config:
```nginx
server {
    server_name fitness.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then:
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/fitness-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL certificate
sudo certbot --nginx -d fitness.yourdomain.com
```

### Managing the App

```bash
# Check status
pm2 status

# View logs
pm2 logs fitness-tracker

# Restart app
pm2 restart fitness-tracker

# Stop app
pm2 stop fitness-tracker

# Monitor in real-time
pm2 monit
```

### File Locations

- **App:** `/home/ubuntu/fitness-tracker/`
- **Database:** `/home/ubuntu/fitness-tracker/fitness.db`
- **Logs:** `/home/ubuntu/logs/`
- **Config:** `/home/ubuntu/fitness-tracker/ecosystem.config.js`

### Admin Access

Remember your secret admin URL:
- **Add entries:** `https://yourdomain.com/admin/add`
- **View dashboard:** `https://yourdomain.com`

### Backup Your Database

```bash
# On your Lightsail instance
cp ~/fitness-tracker/fitness.db ~/fitness-backup-$(date +%Y%m%d).db

# Download backup to local machine
scp ubuntu@YOUR_IP:~/fitness-backup-*.db ./
```

### Troubleshooting

**App not starting?**
```bash
pm2 logs fitness-tracker
```

**Port 3000 blocked?**
- Check Lightsail firewall settings
- Allow TCP port 3000 (or use Nginx proxy)

**Database issues?**
- Check file permissions: `ls -la ~/fitness-tracker/fitness.db`
- Ensure SQLite database exists and is writable

### Quick Redeploy

For updates, just run:
```bash
./deploy.sh YOUR_LIGHTSAIL_IP
```

The script handles stopping, updating, and restarting automatically!