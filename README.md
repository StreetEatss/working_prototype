# StreetEats Web App

Mobile-first web experience for Penn/University City students to discover food trucks, share live status updates, and review menu items. The app ships with a SQLite-backed API plus a Vite/React frontend optimized for mobile browsers.

## Tech Stack
- **Frontend:** React + Vite + TypeScript, React Query, React Leaflet, React Router
- **Backend:** Node.js + Express + TypeScript, Prisma ORM
- **Database:** SQLite (no Docker required!)

## Prerequisites
- **Node.js** 20 or higher
- **npm** 8 or higher

## Quick Start

### 1. Clone and Navigate
```bash
git clone <your-repo-url>
cd streeteats
```

### 2. Set Up Backend

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Set up environment variables:
Create a `.env` file in the `server` directory with:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
PORT=4000
NODE_ENV=development
```

Run database migrations:
```bash
npm run prisma:migrate -- --name init
```

Seed the database with sample data:
```bash
npm run seed
```

Start the backend development server:
```bash
npm run dev
```
The API will be available at `http://localhost:4000`

### 3. Set Up Frontend

Open a new terminal window and navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

## Default Owner Account

For testing the owner portal, use these credentials:
- **Email:** `owner@streeteats.test`
- **Password:** `owner1234`

This account has access to manage hours for Lynn's and Taco's Don Memo food trucks.

## Project Structure

```
streeteats/
├── client/          # React frontend application
│   ├── src/
│   │   ├── pages/   # Page components (Home, OwnerPortal)
│   │   └── lib/     # API client and utilities
├── server/          # Express backend API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API route definitions
│   │   ├── middleware/   # Auth and other middleware
│   │   └── lib/          # Prisma client and utilities
│   ├── prisma/       # Database schema and migrations
│   └── dev.db        # SQLite database file (created after migration)
└── .github/
    └── workflows/    # GitHub Actions deployment config
```

## API Endpoints

### Public Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check endpoint |
| GET | `/api/trucks` | List all trucks with latest status and menu items |
| GET | `/api/trucks/:truckId` | Get detailed truck info with status history and reviews |
| POST | `/api/trucks/:truckId/status` | Submit a crowd-sourced status update |
| POST | `/api/trucks/:truckId/reviews` | Submit a menu item review |

### Authentication Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register a new owner account (returns JWT) |
| POST | `/api/auth/login` | Owner login (returns JWT) |

### Owner-Only Endpoints (Requires JWT)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/owners/me` | Get owner profile with linked trucks |
| POST | `/api/trucks` | Create a new food truck |
| PATCH | `/api/trucks/:truckId/hours` | Update truck operating hours |

## Features

### For Diners
- Interactive map showing all food truck locations
- Real-time status updates (Open/Closed/Moved)
- Menu items with prices and ratings
- Submit status updates and reviews
- Google Maps integration for directions

### For Owners
- Dedicated login portal at `/owners`
- Manage operating hours for your trucks
- View all trucks you have access to
- Update schedules with a simple time picker interface

## Database Management

### Running Migrations
```bash
cd server
npm run prisma:migrate
```

### Resetting Database
To clear and reseed the database:
```bash
cd server
npm run seed
```

### Prisma Studio (Database GUI)
View and edit database records:
```bash
cd server
npx prisma studio
```

## Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
PORT=4000
NODE_ENV=development
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:4000
```

**Note:** For production deployment, set `VITE_API_URL` to your backend API URL.

## Deployment to GitHub Pages

The project includes a GitHub Actions workflow that automatically deploys the frontend to GitHub Pages when you push to the `main` branch.

### Setup Steps

1. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`

2. **Set up repository secrets (optional):**
   - Go to Settings → Secrets and variables → Actions
   - Add `VITE_API_URL` if your backend is hosted elsewhere
   - Default: `http://localhost:4000` (for local development)

3. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

The workflow will automatically:
- Build the frontend
- Deploy to GitHub Pages
- Make your app available at `https://<username>.github.io/working_prototype/`

### Backend Deployment

**Important:** GitHub Pages only hosts static files. The backend API needs to be deployed separately. Options include:

- **Railway** (recommended): https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com
- **Fly.io**: https://fly.io

After deploying the backend, update the `VITE_API_URL` secret in GitHub Actions to point to your deployed backend URL.

## Troubleshooting

### Database Issues
- The SQLite database file (`dev.db`) is created automatically after running migrations
- If you get "database locked" errors, make sure no other process is using the database
- To reset: delete `server/prisma/dev.db` and run `npm run prisma:migrate` again

### Port Already in Use
- Backend (4000): Change `PORT` in `server/.env` or stop the process using port 4000
- Frontend (5173): Vite will automatically try the next available port

### Frontend Can't Reach Backend
- Verify `VITE_API_URL` in `client/.env` points to the correct backend URL
- Check that the backend server is running
- Ensure CORS is properly configured (default allows localhost)
- For production, ensure your backend CORS settings allow your GitHub Pages domain

### GitHub Pages Deployment Issues
- Check the Actions tab in your GitHub repository for workflow errors
- Ensure GitHub Pages is enabled in repository settings
- Verify the base path in `vite.config.ts` matches your repository name
- Check that `VITE_API_URL` is set correctly in the workflow or as a secret

## Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run production build
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Migration from PostgreSQL

If you're migrating from the old PostgreSQL setup:

1. Export your data (if needed):
   ```bash
   # Use Prisma Studio or a custom script to export data
   ```

2. Update your `.env` file:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. Run migrations:
   ```bash
   cd server
   npm run prisma:migrate -- --name init
   ```

4. Remove Docker dependencies:
   ```bash
   # No longer needed!
   ```

## Future Enhancements
- Owner dashboard for schedule editing and review management
- Reputation-weighted status aggregation
- Push notifications when favorite truck status changes
- Photo uploads for menu items and status updates
- Advanced filtering and search capabilities
