# Connecting to a Hosted Database

You can connect StreetEats to a cloud-hosted PostgreSQL database instead of (or in addition to) the local Docker database.

## Why Use a Hosted Database?

- ✅ Accessible from anywhere
- ✅ No need to run Docker locally
- ✅ Automatic backups
- ✅ Can share with team members
- ✅ Same database for dev and production
- ✅ Better for deployment

## Option 1: Supabase (Free Tier - Recommended)

Supabase offers a free PostgreSQL database with generous limits.

### Setup Steps:

1. **Create Supabase Account:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (free)
   - Create a new project
   - Choose a region close to you
   - Wait for project to finish setting up (~2 minutes)

2. **Get Connection String:**
   - In your Supabase project dashboard
   - Go to **Settings** → **Database**
   - Scroll to **Connection string**
   - Copy the **URI** connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

3. **Update Your Local Environment:**
   ```bash
   cd server
   # Edit .env file
   DATABASE_URL="postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres"
   ```

4. **Run Migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate deploy
   npm run seed
   ```

5. **Test Connection:**
   ```bash
   npm run dev
   # Check http://localhost:4000/api/health
   ```

**Free Tier Limits:**
- 500 MB database
- 2 GB bandwidth
- Perfect for development and small apps

---

## Option 2: Railway PostgreSQL

Railway offers PostgreSQL databases that you can use independently.

### Setup Steps:

1. **Create Railway Account:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create PostgreSQL Database:**
   - Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
   - Railway creates the database automatically

3. **Get Connection String:**
   - Click on the PostgreSQL service
   - Go to **"Variables"** tab
   - Copy the `DATABASE_URL` value

4. **Update Your Local Environment:**
   ```bash
   cd server
   # Edit .env file
   DATABASE_URL="<paste-railway-connection-string>"
   ```

5. **Run Migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate deploy
   npm run seed
   ```

**Cost:** $5 credit/month free, then pay-as-you-go

---

## Option 3: Render PostgreSQL

Render offers free PostgreSQL databases (with limitations).

### Setup Steps:

1. **Create Render Account:**
   - Go to [render.com](https://render.com)
   - Sign up

2. **Create PostgreSQL Database:**
   - Click **"+ New"** → **"PostgreSQL"**
   - Choose a name and region
   - Select **"Free"** plan (or paid)
   - Click **"Create Database"**

3. **Get Connection String:**
   - Once created, go to database dashboard
   - Find **"Internal Database URL"** or **"External Database URL"**
   - Copy the connection string

4. **Update Your Local Environment:**
   ```bash
   cd server
   # Edit .env file
   DATABASE_URL="<paste-render-connection-string>"
   ```

5. **Run Migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate deploy
   npm run seed
   ```

**Free Tier:** Available but spins down after inactivity (takes ~30 seconds to wake up)

---

## Option 4: Neon (Serverless PostgreSQL)

Neon offers serverless PostgreSQL with a free tier.

### Setup Steps:

1. **Create Neon Account:**
   - Go to [neon.tech](https://neon.tech)
   - Sign up

2. **Create Project:**
   - Create a new project
   - Choose a region

3. **Get Connection String:**
   - In project dashboard, find **"Connection string"**
   - Copy the connection string

4. **Update Your Local Environment:**
   ```bash
   cd server
   # Edit .env file
   DATABASE_URL="<paste-neon-connection-string>"
   ```

5. **Run Migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate deploy
   npm run seed
   ```

**Free Tier:** 0.5 GB storage, good for development

---

## Option 5: Keep Both (Local + Hosted)

You can use different databases for different environments:

### Development Setup:

**`server/.env.development`** (local):
```
DATABASE_URL="postgresql://streeteats:streeteats@localhost:5434/streeteats"
```

**`server/.env.production`** (hosted):
```
DATABASE_URL="postgresql://postgres:password@hosted-db.com:5432/dbname"
```

Then use:
```bash
# Local development
npm run dev

# Production (uses .env.production)
NODE_ENV=production npm start
```

---

## Updating Your Code

Once you have a hosted database connection string, update your `server/.env`:

```bash
cd server
# Edit .env file
nano .env  # or use your preferred editor
```

Replace the DATABASE_URL:
```env
# Old (local Docker):
# DATABASE_URL="postgresql://streeteats:streeteats@localhost:5434/streeteats"

# New (hosted):
DATABASE_URL="postgresql://postgres:password@your-hosted-db.com:5432/postgres"
```

---

## SSL Connection (If Required)

Some hosted databases require SSL. Add `?sslmode=require` to your connection string:

```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

Or in Prisma schema, you can configure SSL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Some platforms require this:
  // directUrl = env("DIRECT_URL")
}
```

---

## Testing the Connection

After updating DATABASE_URL:

1. **Generate Prisma Client:**
   ```bash
   cd server
   npm run prisma:generate
   ```

2. **Test Connection:**
   ```bash
   npx prisma db pull
   # Should connect successfully
   ```

3. **Run Migrations:**
   ```bash
   npm run prisma:migrate deploy
   ```

4. **Seed Database:**
   ```bash
   npm run seed
   ```

5. **Start Server:**
   ```bash
   npm run dev
   ```

6. **Test API:**
   ```bash
   curl http://localhost:4000/api/trucks
   # Should return truck data
   ```

---

## Migration from Local to Hosted

If you have data in your local database:

1. **Export local data:**
   ```bash
   # Using pg_dump
   docker exec streeteats-postgres pg_dump -U streeteats streeteats > backup.sql
   ```

2. **Import to hosted database:**
   ```bash
   # Using psql (install PostgreSQL client tools)
   psql <your-hosted-connection-string> < backup.sql
   ```

Or use Prisma Studio to manually copy data:
```bash
npx prisma studio
```

---

## Security Best Practices

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Use environment variables** in production platforms
3. **Rotate passwords** regularly
4. **Use connection pooling** for production
5. **Enable SSL** when available

---

## Troubleshooting

### Connection Refused
- Check if database URL is correct
- Verify database is running (for hosted services)
- Check firewall/network settings

### SSL Required
- Add `?sslmode=require` to connection string
- Some platforms require specific SSL settings

### Authentication Failed
- Double-check username and password
- Verify database name is correct
- Check if IP whitelist is enabled (some services require this)

### Migration Errors
- Ensure Prisma Client is generated: `npm run prisma:generate`
- Check database permissions
- Verify schema matches

---

## Quick Recommendation

**For Development:** Use **Supabase** (free, easy setup)
**For Production:** Use **Railway** or **Render** (managed, reliable)

Both can be used for both dev and production!

---

## Next Steps

1. Choose a hosted database provider
2. Create database and get connection string
3. Update `server/.env` with new DATABASE_URL
4. Run migrations and seed
5. Test your app
6. Deploy with same database URL (or create separate production DB)

