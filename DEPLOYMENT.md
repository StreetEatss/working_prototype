# Deployment Guide

This guide covers options for deploying StreetEats to production, including handling the database migration from local Docker to a cloud-hosted solution.

## Overview

You need to deploy three components:
1. **Frontend** (React/Vite app) - Static site hosting
2. **Backend** (Node.js/Express API) - Server hosting
3. **Database** (PostgreSQL) - Managed database service

## Option 1: Railway (Recommended - Easiest)

Railway can host all three components with minimal configuration.

### Steps:

1. **Sign up at [railway.app](https://railway.app)**

2. **Deploy Database:**
   - Create a new project
   - Click "New" → "Database" → "PostgreSQL"
   - Railway automatically provides connection string

3. **Deploy Backend:**
   - In the same project, click "New" → "GitHub Repo"
   - Select your repository
   - Set root directory to `server`
   - Add environment variables:
     ```
     DATABASE_URL=<railway-postgres-connection-string>
     JWT_SECRET=<generate-a-random-secret>
     PORT=4000
     ```
   - Railway will auto-detect Node.js and run `npm install` and `npm start`
   - Add build command: `npm run build`
   - Add start command: `npm start`

4. **Deploy Frontend:**
   - Create another service in the same project
   - Click "New" → "GitHub Repo" (same repo)
   - Set root directory to `client`
   - Add environment variable:
     ```
     VITE_API_URL=<your-backend-railway-url>
     ```
   - Add build command: `npm run build`
   - Add start command: `npm run preview` (or use Railway's static hosting)

5. **Run Migrations:**
   - Use Railway's CLI or connect to your database:
     ```bash
     cd server
     npx prisma migrate deploy
     npx prisma db seed
     ```

**Cost:** ~$5-20/month depending on usage

---

## Option 2: Render (Free Tier Available)

Similar to Railway but with a free tier.

### Steps:

1. **Sign up at [render.com](https://render.com)**

2. **Deploy Database:**
   - Create "PostgreSQL" service
   - Note the connection string

3. **Deploy Backend:**
   - Create "Web Service"
   - Connect GitHub repo
   - Root directory: `server`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Environment variables:
     ```
     DATABASE_URL=<render-postgres-connection-string>
     JWT_SECRET=<random-secret>
     NODE_ENV=production
     ```

4. **Deploy Frontend:**
   - Create "Static Site"
   - Connect GitHub repo
   - Root directory: `client`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Environment variable:
     ```
     VITE_API_URL=<your-backend-render-url>
     ```

5. **Run Migrations:**
   - Use Render's shell or connect locally:
     ```bash
     DATABASE_URL=<render-url> npx prisma migrate deploy
     DATABASE_URL=<render-url> npx prisma db seed
     ```

**Cost:** Free tier available, paid plans start at $7/month

---

## Option 3: Vercel (Frontend) + Railway/Render (Backend + DB)

Best performance for frontend, separate backend hosting.

### Steps:

1. **Deploy Backend + Database** (use Option 1 or 2 above)

2. **Deploy Frontend on Vercel:**
   - Sign up at [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Root directory: `client`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable:
     ```
     VITE_API_URL=<your-backend-url>
     ```
   - Deploy!

**Cost:** Free for frontend, backend costs vary

---

## Option 4: DigitalOcean App Platform

Full-stack hosting with managed database.

### Steps:

1. **Sign up at [digitalocean.com](https://digitalocean.com)**

2. **Create Managed Database:**
   - Create → Databases → PostgreSQL
   - Choose region and plan
   - Note connection details

3. **Deploy Backend:**
   - Create → App → GitHub
   - Select repo, set root: `server`
   - Build command: `npm run build`
   - Run command: `npm start`
   - Add environment variables (including DATABASE_URL)

4. **Deploy Frontend:**
   - Add another component to same app
   - Source: same repo, root: `client`
   - Build command: `npm run build`
   - Output directory: `dist`

**Cost:** ~$12-25/month

---

## Option 5: AWS/GCP/Azure (Advanced)

For production-scale deployments.

### Recommended Setup:
- **Frontend:** AWS S3 + CloudFront, GCP Cloud Storage + CDN, or Azure Static Web Apps
- **Backend:** AWS Elastic Beanstalk/ECS, GCP Cloud Run, or Azure App Service
- **Database:** AWS RDS, GCP Cloud SQL, or Azure Database for PostgreSQL

**Cost:** Pay-as-you-go, can be $20-100+/month

---

## Database Migration Steps

Regardless of which option you choose, you'll need to:

1. **Update DATABASE_URL:**
   ```bash
   # In server/.env (or platform environment variables)
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

2. **Run migrations:**
   ```bash
   cd server
   npm run prisma:generate
   npm run prisma:migrate deploy
   npm run seed
   ```

3. **Update Prisma schema if needed:**
   - Some platforms require SSL connections
   - Add `?sslmode=require` to DATABASE_URL if needed

---

## Environment Variables Checklist

### Backend:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Random secret for token signing
- `NODE_ENV=production`
- `PORT` - Usually auto-set by platform

### Frontend:
- `VITE_API_URL` - Your backend API URL (e.g., `https://api.yourapp.com`)

---

## CORS Configuration

Make sure your backend allows requests from your frontend domain:

```typescript
// server/src/index.ts
app.use(cors({ 
  origin: process.env.FRONTEND_URL || /localhost/,
  credentials: true 
}));
```

---

## SSL/HTTPS

Most platforms (Railway, Render, Vercel, etc.) provide SSL certificates automatically. Ensure:
- Your backend API URL uses `https://`
- Your frontend is served over HTTPS
- Database connections use SSL when required

---

## Monitoring & Logs

- **Railway/Render:** Built-in logs and metrics
- **Vercel:** Analytics and logs in dashboard
- **Custom:** Consider adding Sentry for error tracking

---

## Quick Start Recommendation

**For fastest deployment:** Use **Railway**
1. Deploy PostgreSQL database
2. Deploy backend (same project)
3. Deploy frontend (same project)
4. Run migrations via Railway shell
5. Done!

**For free tier:** Use **Render**
- Free PostgreSQL (with limitations)
- Free web services (spins down after inactivity)
- Good for testing/demos

---

## Post-Deployment Checklist

- [ ] Database migrations run successfully
- [ ] Database seeded with initial data
- [ ] Backend API responds at health endpoint
- [ ] Frontend can connect to backend
- [ ] Owner login works
- [ ] Google Maps links work
- [ ] CORS configured correctly
- [ ] Environment variables set correctly
- [ ] SSL/HTTPS enabled
- [ ] Custom domain configured (optional)

---

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL format
- Check if SSL is required (`?sslmode=require`)
- Ensure database is accessible from your backend IP

### Frontend Can't Reach Backend
- Verify VITE_API_URL is correct
- Check CORS settings
- Ensure backend is running

### Build Failures
- Check Node.js version (should match local)
- Verify all dependencies in package.json
- Check build logs for specific errors

---

## Need Help?

- Railway: [docs.railway.app](https://docs.railway.app)
- Render: [render.com/docs](https://render.com/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)

