# EstateFlow - Vercel Deployment Guide

## Quick Deployment Steps

### 1. **Project Settings in Vercel Dashboard**

When importing your project to Vercel, use these settings:

**Framework Preset:** Other

**Root Directory:** `./` (leave as root)

**Build Command:**
```bash
npm run vercel-build
```

**Output Directory:**
```
client/build
```

**Install Command:**
```bash
npm install
```

### 2. **Environment Variables**

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NODE_ENV=production
PORT=5000
```

### 3. **Deploy**

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Project Structure

```
PS22/
├── client/              # React frontend
│   ├── public/
│   │   └── index.html  # Required for build
│   ├── src/
│   └── package.json
├── server/              # Node.js backend
│   ├── server.js
│   └── package.json
├── package.json         # Root package.json with vercel-build script
└── vercel.json         # Vercel configuration
```

## Troubleshooting

### Error: "Could not find index.html"

**Solution:** Ensure `client/public/index.html` exists and the build command is correct.

### Error: "Build failed"

**Solution:** 
1. Check that all dependencies are in package.json
2. Run `npm run vercel-build` locally to test
3. Check build logs in Vercel dashboard

### API Routes Not Working

**Solution:** Ensure your API calls use relative paths:
```javascript
// Good
axios.get('/api/properties')

// Bad (won't work in production)
axios.get('http://localhost:5000/api/properties')
```

## Alternative: Deploy Frontend and Backend Separately

### Frontend (Vercel)
1. Deploy only the `client` folder
2. Set build command: `npm run build`
3. Set output directory: `build`

### Backend (Render/Railway/Heroku)
1. Deploy the `server` folder separately
2. Update client API calls to use backend URL
3. Add CORS configuration in server

## Local Testing Before Deploy

```bash
# Install all dependencies
npm run install-all

# Build client
cd client && npm run build

# Test production build
cd ../server && NODE_ENV=production node server.js
```

Visit `http://localhost:5000` to test the production build locally.

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Authentication works
- [ ] File uploads work (if applicable)
- [ ] All routes work (no 404s)
- [ ] Environment variables are set
- [ ] HTTPS is enabled
- [ ] Custom domain configured (optional)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Test build locally first
3. Verify all environment variables
4. Check browser console for errors
