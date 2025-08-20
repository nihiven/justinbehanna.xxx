# Windows Deployment Guide

## 🖥️ Windows Deployment Options

### Option 1: PowerShell Script (Recommended)

If you have SSH access set up:

```powershell
# Run in PowerShell
.\deploy.ps1 -LightsailIP "YOUR_LIGHTSAIL_IP"
```

### Option 2: Manual Deployment (Always Works)

Perfect if you don't have SSH configured or prefer step-by-step control.

#### Step 1: Build the App
```cmd
npm run build
```

#### Step 2: Create Deployment Package
1. Create a new folder called `deploy-package`
2. Copy these items into it:
   - `build/` folder (entire folder)
   - `package.json`
   - `package-lock.json`
   - `ecosystem.config.js`

#### Step 3: Upload to Lightsail
**Using SCP (if you have Git Bash or WSL):**
```bash
# In Git Bash or WSL
scp -r deploy-package ubuntu@YOUR_LIGHTSAIL_IP:~/fitness-tracker-new
```

**Using SFTP Client (WinSCP, FileZilla, etc.):**
1. Connect to your Lightsail instance
2. Upload the `deploy-package` folder contents to `/home/ubuntu/fitness-tracker-new/`

#### Step 4: Deploy on Server
Connect to your Lightsail instance using:
- **PuTTY** (Windows SSH client)
- **Windows Terminal** with SSH
- **VS Code Remote SSH extension**

Run these commands on your server:
```bash
# Stop existing app
pm2 stop fitness-tracker || true

# Backup current version (optional)
mv ~/fitness-tracker ~/fitness-tracker-backup-$(date +%Y%m%d) || true

# Move new version into place
mv ~/fitness-tracker-new ~/fitness-tracker
cd ~/fitness-tracker

# Install dependencies
npm ci --production

# Create database if it doesn't exist
if [ ! -f fitness.db ]; then
  echo "Creating new database..."
  touch fitness.db
fi

# Start app with PM2
pm2 start ecosystem.config.js || pm2 restart fitness-tracker
pm2 save

# Check status
pm2 status
```

## 🛠️ Windows Tools Setup

### SSH Client Options:
1. **OpenSSH (Windows 10+):** Built-in, enable in Windows Features
2. **Git Bash:** Comes with Git for Windows
3. **WSL:** Windows Subsystem for Linux
4. **PuTTY:** Classic Windows SSH client

### File Transfer Options:
1. **WinSCP:** Free SFTP client with GUI
2. **FileZilla:** Free FTP/SFTP client
3. **VS Code:** With Remote SSH extension
4. **SCP command:** If you have Git Bash/WSL

## 🔧 SSH Setup (One-time)

If you don't have SSH set up yet:

### Generate SSH Key (Git Bash/PowerShell):
```bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

### Add Key to Lightsail:
1. Copy your public key: `cat ~/.ssh/id_rsa.pub`
2. In AWS Lightsail console → Networking → SSH Keys
3. Add your public key

### Test Connection:
```bash
ssh ubuntu@YOUR_LIGHTSAIL_IP
```

## 🚀 Quick Deploy Commands

**PowerShell (if SSH works):**
```powershell
.\deploy.ps1 -LightsailIP "YOUR_IP"
```

**Manual Build & Package:**
```cmd
npm run build
# Then use SFTP client to upload files
```

**Server Commands:**
```bash
pm2 restart fitness-tracker
pm2 logs fitness-tracker
pm2 status
```

## 🌐 Domain Setup

1. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
2. **Add A Record:**
   - Name: `fitness` (or `@` for root domain)
   - Value: `YOUR_LIGHTSAIL_IP`
   - TTL: `300` (5 minutes)
3. **Wait for DNS propagation** (5-30 minutes)
4. **Test:** Visit `http://fitness.yourdomain.com:3000`

## 🔐 Admin Access

**Secret Admin URL:** `http://yourdomain.com:3000/admin/add`
- Bookmark this URL!
- Only you will know this exists

## 🆘 Troubleshooting

**PowerShell script fails?**
- Use manual deployment method
- Check SSH connection: `ssh ubuntu@YOUR_IP`

**Can't connect to server?**
- Check Lightsail firewall (allow port 22 for SSH, 3000 for web)
- Verify your SSH key is added to Lightsail

**App not working?**
```bash
# Check app status
pm2 status

# View logs
pm2 logs fitness-tracker

# Restart app
pm2 restart fitness-tracker
```

**Database issues?**
```bash
# Check database file
ls -la ~/fitness-tracker/fitness.db

# Check app permissions
pm2 restart fitness-tracker
```

## 🎯 Production Tips

- **Backup database:** `cp ~/fitness-tracker/fitness.db ~/backup-$(date +%Y%m%d).db`
- **Monitor app:** `pm2 monit`
- **View real-time logs:** `pm2 logs fitness-tracker --lines 50`
- **SSL setup:** See main DEPLOYMENT.md for Nginx + Certbot instructions