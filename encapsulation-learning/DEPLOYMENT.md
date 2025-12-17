# 🚀 Deployment Guide: Hybrid Setup (GitHub Pages + Vercel)

This guide will help you deploy your AP CSA Learning Platform with:
- **Frontend** → GitHub Pages (https://mengqiyang77.github.io/ap-csa-learning/)
- **Backend + Database** → Vercel

---

## 📋 Prerequisites

- GitHub account (you already have the repo!)
- Vercel account (free tier is enough)
- MySQL database (we'll use PlanetScale free tier)

---

## Part 1: Setup Database (PlanetScale)

### Step 1: Create PlanetScale Account
1. Go to https://planetscale.com/
2. Sign up with GitHub (free tier)
3. Click "Create database"
4. Name: `encapsulation-learning`
5. Region: Choose closest to your users
6. Click "Create database"

### Step 2: Get Database Connection String
1. In PlanetScale dashboard, click "Connect"
2. Select "Node.js" from dropdown
3. Copy the connection string (looks like):
   ```
   mysql://username:password@aws.connect.psdb.cloud/encapsulation-learning?ssl={"rejectUnauthorized":true}
   ```
4. **Save this! You'll need it for Vercel**

---

## Part 2: Deploy Backend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New" → "Project"

### Step 2: Import Your Repository
1. Select `MengqiYang77/ap-csa-learning`
2. Click "Import"

### Step 3: Configure Build Settings
- **Framework Preset**: Other
- **Root Directory**: `./` (leave as is)
- **Build Command**: `pnpm build:backend`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

### Step 4: Add Environment Variables
Click "Environment Variables" and add these:

```
NODE_ENV=production
DATABASE_URL=<your-planetscale-connection-string>
JWT_SECRET=<generate-a-random-32-character-string>
OAUTH_SERVER_URL=https://oauth.manus.im
OWNER_OPEN_ID=<your-manus-open-id>
```

**How to generate JWT_SECRET:**
```bash
# Run this in terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**How to get OWNER_OPEN_ID:**
- This is your Manus user ID. For now, you can use any string like "admin123"
- Later you can update it after checking your user ID in the database

### Step 5: Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes
3. Copy your Vercel URL (e.g., `https://ap-csa-learning.vercel.app`)

### Step 6: Initialize Database
1. After deployment, go to your Vercel dashboard
2. Click on your project → "Settings" → "Functions"
3. Run database migration:
   - Option A: Use Vercel CLI (if installed):
     ```bash
     vercel env pull
     pnpm db:push
     ```
   - Option B: Connect to PlanetScale and run SQL manually (see `drizzle/` folder for SQL files)

---

## Part 3: Deploy Frontend to GitHub Pages

### Step 1: Update Frontend API URL
1. In your local Manus editor, open `client/.env.production`
2. Replace the URL with your Vercel backend URL:
   ```
   VITE_API_URL=https://ap-csa-learning.vercel.app
   ```
3. Save the file

### Step 2: Enable GitHub Pages
1. Go to https://github.com/MengqiYang77/ap-csa-learning/settings/pages
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Click "Save"

### Step 3: Push Your Code
From Manus, create a new checkpoint (this will trigger the deployment):
1. Click "Save Checkpoint"
2. GitHub Actions will automatically:
   - Build the frontend
   - Deploy to GitHub Pages
3. Wait 3-5 minutes

### Step 4: Verify Deployment
Visit: https://mengqiyang77.github.io/ap-csa-learning/

---

## Part 4: Configure CORS (Important!)

Your backend needs to allow requests from GitHub Pages.

### In Vercel Dashboard:
1. Go to your project → "Settings" → "Environment Variables"
2. Add:
   ```
   ALLOWED_ORIGINS=https://mengqiyang77.github.io
   ```
3. Redeploy (click "Deployments" → "..." → "Redeploy")

---

## 🔄 Future Updates

### To Update Your Website:
1. Make changes in Manus
2. Save a checkpoint
3. **Automatic deployment happens!**
   - GitHub Actions deploys frontend
   - Vercel deploys backend

No manual steps needed! 🎉

---

## 🐛 Troubleshooting

### Frontend shows "Cannot connect to server"
- Check `client/.env.production` has correct Vercel URL
- Check CORS is configured in Vercel
- Check Vercel backend is running (visit the URL directly)

### Database connection errors
- Verify DATABASE_URL in Vercel environment variables
- Check PlanetScale database is active
- Run migrations: `pnpm db:push`

### GitHub Actions fails
- Check `.github/workflows/deploy-frontend.yml` exists
- Check GitHub Pages is enabled
- Check build logs in GitHub Actions tab

### Vercel deployment fails
- Check all environment variables are set
- Check `vercel.json` exists
- Check build logs in Vercel dashboard

---

## 📞 Need Help?

1. Check Vercel logs: Dashboard → Your Project → "Logs"
2. Check GitHub Actions: Repository → "Actions" tab
3. Check browser console: F12 → "Console" tab

---

## 🎉 Success Checklist

- [ ] PlanetScale database created
- [ ] Vercel backend deployed and running
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Frontend deployed to GitHub Pages
- [ ] CORS configured
- [ ] Website accessible at https://mengqiyang77.github.io/ap-csa-learning/
- [ ] Can login and submit code

---

## 📝 Important URLs

- **Frontend**: https://mengqiyang77.github.io/ap-csa-learning/
- **Backend**: https://your-backend.vercel.app (replace with actual URL)
- **Database**: PlanetScale dashboard
- **GitHub Repo**: https://github.com/MengqiYang77/ap-csa-learning
- **Vercel Dashboard**: https://vercel.com/dashboard

---

**Last Updated**: December 2024
