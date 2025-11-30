# 🚀 EstateFlow Deployment Guide for Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed on your computer

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - EstateFlow Platform"
```

### 1.2 Create a GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named "estateflow-platform"
3. Don't initialize with README (we already have one)

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/estateflow-platform.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your "estateflow-platform" repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** client/build
   - **Install Command:** `npm install`

4. **Environment Variables** (Optional)
   Add these if needed:
   ```
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Your site will be live at: `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **estateflow-platform**
   - Directory? **./
   - Override settings? **N**

5. **Deploy to Production**
```bash
vercel --prod
```

## Step 3: Post-Deployment Configuration

### 3.1 Custom Domain (Optional)
1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3.2 Environment Variables
If you need to add environment variables:
1. Go to "Settings" → "Environment Variables"
2. Add variables like:
   - `DATABASE_URL` (if using a database)
   - `JWT_SECRET` (for authentication)
   - `API_KEY` (for third-party services)

## Step 4: Verify Deployment

### Test Your Deployment
1. Visit your Vercel URL
2. Test the following features:
   - ✅ Login/Register
   - ✅ Dashboard loads
   - ✅ Virtual Tour works
   - ✅ Contractor Marketplace
   - ✅ Material Store
   - ✅ Loan Calculator
   - ✅ Project Tracker

### Check API Endpoints
Test these URLs:
- `https://your-app.vercel.app/api/health`
- `https://your-app.vercel.app/api/recommendations`

## Step 5: Continuous Deployment

### Automatic Deployments
Every time you push to GitHub:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Provide a preview URL

## Troubleshooting

### Build Fails
**Issue:** Build command fails
**Solution:** 
```bash
# Test build locally first
cd client
npm run build
```

### API Routes Not Working
**Issue:** `/api/*` routes return 404
**Solution:** Check `vercel.json` configuration

### Environment Variables Not Working
**Issue:** App can't access environment variables
**Solution:** 
1. Add them in Vercel Dashboard
2. Redeploy the project

### Large Bundle Size
**Issue:** Build is too large
**Solution:**
```bash
# Analyze bundle
cd client
npm run build
# Check build/static folder size
```

## Performance Optimization

### 1. Enable Caching
Vercel automatically caches static assets

### 2. Image Optimization
Use Vercel's Image Optimization:
```javascript
import Image from 'next/image'
// Use for images
```

### 3. Analytics
Enable Vercel Analytics:
1. Go to "Analytics" tab
2. Enable Web Analytics
3. View real-time metrics

## Monitoring

### Check Deployment Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click on any deployment
5. View "Build Logs" and "Function Logs"

### Set Up Alerts
1. Go to "Settings" → "Notifications"
2. Configure email alerts for:
   - Failed deployments
   - Performance issues
   - Error rates

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Check project info
vercel inspect

# Pull environment variables
vercel env pull
```

## Support & Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/vercel/discussions

## Demo Credentials

After deployment, users can login with:
- **User:** rajesh@example.com / password
- **Admin:** admin@propenhance.com / password

---

## 🎉 Congratulations!

Your EstateFlow platform is now live on Vercel!

**Your Live URL:** `https://your-project-name.vercel.app`

Share it with the world! 🌍
