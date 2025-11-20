# Deployment Guide

এই গাইড আপনাকে CI/CD সেটআপ করতে সাহায্য করবে।

## Quick Start

### 1. Environment Variables Setup
প্রথমে `env.example` file দেখুন এবং `.env` file create করুন:

```bash
# Windows PowerShell
Copy-Item env.example .env

# Linux/Mac
cp env.example .env
```

তারপর `.env` file-এ আপনার actual values add করুন।

### 2. GitHub Secrets সেটআপ

আপনার GitHub repository-তে নিচের secrets গুলো add করতে হবে:

### Repository Secrets যোগ করার ধাপ:

1. GitHub repository-তে যান
2. **Settings** → **Secrets and variables** → **Actions** এ যান
3. **New repository secret** ক্লিক করুন
4. নিচের secrets গুলো add করুন:

### Required Secrets:

```
FTP_HOST=103.29.180.47
FTP_USERNAME=thezoomit
FTP_PASSWORD=FA]uoi1842XlZ-erw
```

**Note:** Domain propagate হওয়ার পর `FTP_HOST` পরিবর্তন করতে পারেন:
```
FTP_HOST=thezoomit.com
```

## Deployment Workflow

### Production Deployment
- **Trigger:** `main` বা `master` branch-এ push করলে automatically deploy হবে
- **Manual:** GitHub Actions tab থেকে manually run করতে পারবেন

### Development Deployment
- **Trigger:** `develop` বা `dev` branch-এ push করলে deploy হবে

## Server Configuration

### Webuzo Control Panel
- URL: https://meghna.hostseba.com:2003/
- Username: thezoomit
- Password: FA]uoi1842XlZ-erw

### FTP Access
- **Temporary Hostname:** 103.29.180.47
- **Domain Hostname:** thezoomit.com (after propagation)
- **Username:** thezoomit
- **Password:** FA]uoi1842XlZ-erw

## Server Setup Steps

### 1. Node.js Application Setup in Webuzo

1. Webuzo Control Panel-এ login করুন
2. **Applications** → **Node.js** এ যান
3. নতুন Node.js application create করুন:
   - **Application Name:** zoomit-backend
   - **Domain:** thezoomit.com
   - **Port:** (auto-assigned বা custom)
   - **Startup File:** `dist/server.js`
   - **Node Version:** 18.x বা latest

### 2. Environment Variables Setup

Webuzo Control Panel-এ environment variables set করুন:

```env
NODE_ENV=production
PORT=3000
DB_URL=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_secret
# ... অন্যান্য environment variables
```

### 3. PM2 Configuration (Optional)

যদি PM2 use করতে চান, Webuzo-তে PM2 setup করুন:

```bash
pm2 start dist/server.js --name zoomit-backend
pm2 save
pm2 startup
```

## Manual Deployment (Alternative)

যদি CI/CD use করতে না চান, manual deployment:

### Using Scripts

**Windows (PowerShell):**
```powershell
.\scripts\deploy.ps1
```

**Linux/Mac (Bash):**
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Manual Steps

```bash
# Build the project
yarn build

# Upload files via FTP
# Use FileZilla বা অন্য FTP client
# Upload: dist/, package.json, yarn.lock, .env, uploads/
```

### FTP Upload Details
- **Host:** 103.29.180.47 (or thezoomit.com after propagation)
- **Username:** thezoomit
- **Password:** FA]uoi1842XlZ-erw
- **Remote Directory:** /public_html/

## Troubleshooting

### Deployment Issues

1. **FTP Connection Failed:**
   - Check FTP credentials
   - Verify server IP/domain
   - Check firewall settings

2. **Application Not Starting:**
   - Check Node.js version in Webuzo
   - Verify startup file path (`dist/server.js`)
   - Check environment variables
   - Review server logs

3. **Database Connection Issues:**
   - Verify MongoDB connection string
   - Check database server accessibility
   - Verify network/firewall rules

## Post-Deployment Checklist

- [ ] Verify application is running
- [ ] Check API endpoints
- [ ] Verify database connection
- [ ] Test authentication endpoints
- [ ] Check file upload functionality
- [ ] Monitor server logs
- [ ] Set up SSL certificate (if needed)

## Support

যদি কোনো সমস্যা হয়, server logs check করুন Webuzo Control Panel থেকে।

