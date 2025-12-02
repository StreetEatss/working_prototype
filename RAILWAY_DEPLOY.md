# Railway Deployment Guide - Step by Step

This guide walks you through deploying StreetEats to Railway, which hosts your database, backend, and frontend all in one place.

## Prerequisites

1. **GitHub Account** - Your code needs to be on GitHub
2. **Railway Account** - Sign up at [railway.app](https://railway.app) (free to start)

## Step 1: Push Your Code to GitHub

If your code isn't on GitHub yet:

```bash
cd /Users/eitang/Downloads/streetdem/streeteats
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

## Step 2: Create Railway Account & Project

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign in with GitHub (authorize Railway to access your repos)
4. Select **"Deploy from GitHub repo"**
5. Choose your `working_prototype` repository (or whatever your repo is named)
6. Railway will create a new project

## Step 3: Deploy PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. **Important:** Click on the PostgreSQL service
5. Go to the **"Variables"** tab
6. Copy the **`DATABASE_URL`** value (you'll need this for the backend)

## Step 4: Deploy Backend API

1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"** (select the same repository)
3. Railway will detect it's a Node.js project
4. **Configure the service:**
   - **Name:** `backend` (or `api`)
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

5. **Add Environment Variables:**
   - Click on the backend service
   - Go to **"Variables"** tab
   - Click **"+ New Variable"**
   - Add these variables:

   ```
   DATABASE_URL = <paste the DATABASE_URL from PostgreSQL service>
   JWT_SECRET = <generate a random secret, e.g., use: openssl rand -base64 32>
   NODE_ENV = production
   PORT = 4000
   FRONTEND_URL = <we'll set this after deploying frontend>
   ```

   **To generate JWT_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

6. **Deploy:**
   - Railway will automatically start building and deploying
   - Wait for the build to complete (check the "Deployments" tab)
   - Once deployed, click on the service → **"Settings"** tab
   - Under **"Networking"**, click **"Generate Domain"**
   - Copy this URL (e.g., `https://your-backend.up.railway.app`) - you'll need it for the frontend

## Step 5: Run Database Migrations

1. In Railway, click on your **backend service**
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. Click **"View Logs"** (or use the terminal icon)
5. In the terminal, run:

   ```bash
   npx prisma migrate deploy
   ```

6. Then seed the database:

   ```bash
   npm run seed
   ```

   **Alternative:** Use Railway CLI:
   ```bash
   npm install -g @railway/cli
   railway login
   railway link
   railway run npx prisma migrate deploy
   railway run npm run seed
   ```

## Step 6: Deploy Frontend

1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"** (same repository)
3. **Configure the service:**
   - **Name:** `frontend` (or `web`)
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview` (or Railway can serve static files)

4. **Add Environment Variable:**
   - Go to **"Variables"** tab
   - Add:

   ```
   VITE_API_URL = <paste your backend Railway URL from Step 4>
   ```

5. **Deploy:**
   - Railway will build and deploy
   - Once deployed, go to **"Settings"** → **"Networking"**
   - Click **"Generate Domain"** to get your frontend URL

## Step 7: Update Backend CORS

1. Go back to your **backend service**
2. **"Variables"** tab
3. Update `FRONTEND_URL` to your frontend Railway URL:

   ```
   FRONTEND_URL = <your-frontend-railway-url>
   ```

4. Railway will automatically redeploy with the new variable

## Step 8: Verify Everything Works

1. **Test Backend:**
   - Visit: `https://your-backend.up.railway.app/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Test Frontend:**
   - Visit your frontend Railway URL
   - Should see the StreetEats homepage
   - Try clicking on trucks, submitting reviews, etc.

3. **Test Owner Login:**
   - Go to `/owners` on your frontend
   - Login with:
     - Email: `owner@streeteats.test`
     - Password: `owner1234`

## Troubleshooting

### Backend Build Fails

- Check build logs in Railway dashboard
- Ensure `package.json` has correct scripts
- Verify Node.js version (Railway auto-detects, but you can set it in `package.json`)

### Database Connection Errors

- Verify `DATABASE_URL` is correct in backend variables
- Check that PostgreSQL service is running
- Ensure migrations ran successfully

### Frontend Can't Reach Backend

- Verify `VITE_API_URL` is set correctly
- Check backend is deployed and running
- Ensure `FRONTEND_URL` is set in backend variables
- Check CORS configuration

### 404 Errors on Frontend Routes

- If using React Router, you may need to configure Railway to serve `index.html` for all routes
- Add a `vercel.json` or `railway.json` with rewrite rules, or use Railway's static hosting option

## Railway CLI (Optional)

For easier management, install Railway CLI:

```bash
npm install -g @railway/cli
railway login
```

Then you can:
- `railway link` - Link to your project
- `railway run <command>` - Run commands in Railway environment
- `railway logs` - View logs
- `railway variables` - Manage environment variables

## Custom Domains (Optional)

1. In Railway, go to service **"Settings"**
2. Under **"Networking"**, click **"Custom Domain"**
3. Add your domain
4. Follow Railway's DNS instructions

## Cost Estimate

- **Free Tier:** $5 credit/month (good for testing)
- **Hobby Plan:** ~$5-20/month (recommended for production)
- **Pro Plan:** $20+/month (for higher traffic)

## Quick Reference: Environment Variables

### Backend Variables:
```
DATABASE_URL=<from-postgres-service>
JWT_SECRET=<random-secret>
NODE_ENV=production
PORT=4000
FRONTEND_URL=<your-frontend-url>
```

### Frontend Variables:
```
VITE_API_URL=<your-backend-url>
```

## Next Steps

Once deployed:
- ✅ Test all features
- ✅ Set up custom domain (optional)
- ✅ Configure monitoring/alerts
- ✅ Set up automated backups for database
- ✅ Review Railway usage/billing

## Need Help?

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Check deployment logs in Railway dashboard

