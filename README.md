# StreetEats Web App

Mobile-first web experience for Penn/University City students to discover food trucks, share live status updates, and review menu items. The app runs entirely in the browser using SQLite (via sql.js) with no backend server required!

## Tech Stack
- **Frontend:** React + Vite + TypeScript, React Query, React Leaflet, React Router
- **Database:** SQLite in the browser (sql.js) - stored in browser localStorage
- **Deployment:** GitHub Pages (fully static, no server needed)

## Prerequisites
- **Node.js** 20 or higher
- **npm** 8 or higher

## Quick Start

### 1. Clone and Navigate
```bash
git clone <your-repo-url>
cd streeteats
```

### 2. Set Up Frontend

Navigate to the client directory:
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

**That's it!** No backend server, no database setup, no Docker - everything runs in your browser.

## How It Works

The app uses **sql.js** (SQLite compiled to WebAssembly) to run a full SQLite database entirely in the browser. The database is:
- Initialized automatically on first load with seed data
- Stored in browser localStorage for persistence
- Completely client-side - no server needed

## Owner Accounts

Each food truck has its own owner account. Use these credentials to log in:

- **Tacos Don Memo:** `tacosdonmemo@streeteats.test` / `tacos1234`
- **Tyson Bees:** `tysonbees@streeteats.test` / `tyson1234`
- **Hemo's:** `hemos@streeteats.test` / `hemos1234`
- **Lyn's:** `lyns@streeteats.test` / `lyns1234`
- **Sopoong:** `sopoong@streeteats.test` / `sopoong1234`
- **Kami:** `kami@streeteats.test` / `kami1234`
- **Caribbean Feast:** `caribbeanfeast@streeteats.test` / `caribbean1234`

Each owner can only edit their own truck's:
- Description
- Menu items (add, edit, delete)
- Operating hours

## Project Structure

```
streeteats/
├── client/          # React frontend application
│   ├── src/
│   │   ├── pages/   # Page components (Home, OwnerPortal)
│   │   └── lib/     # Database client (db.ts) and API wrapper (api.ts)
└── .github/
    └── workflows/   # GitHub Actions deployment config
```

## Features

### For Diners
- Interactive map showing all food truck locations
- Real-time status updates (Open/Closed/Moved)
- Menu items with prices and ratings
- Submit status updates and reviews
- Google Maps integration for directions

### For Owners
- Dedicated login portal at `/#/owners`
- Manage operating hours for your trucks
- View all trucks you have access to
- Update schedules with a simple time picker interface

## Data Persistence

All data is stored in the browser's localStorage. This means:
- ✅ No backend server required
- ✅ Works offline after first load
- ✅ Fast and responsive
- ⚠️ Data is per-browser (not shared between users)
- ⚠️ Clearing browser data will reset the database

The database is automatically seeded with sample food trucks on first load.

## Deployment to GitHub Pages

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup Steps

1. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

The workflow will automatically:
- Build the frontend
- Deploy to GitHub Pages
- Make your app available at `https://<username>.github.io/working_prototype/`

**No backend deployment needed!** The app runs entirely in the browser.

## Development Scripts

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Database Issues
- The database is created automatically on first page load
- If you want to reset the database, clear your browser's localStorage
- The database is stored under the key `streeteats_db` in localStorage

### Build Issues
- Make sure you're using Node.js 20+
- Clear `node_modules` and reinstall if you encounter dependency issues:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### GitHub Pages Deployment Issues
- Check the Actions tab in your GitHub repository for workflow errors
- Ensure GitHub Pages is enabled in repository settings
- Verify the base path in `vite.config.ts` matches your repository name
- The app uses HashRouter (`/#/` URLs) for GitHub Pages compatibility

## Architecture Notes

### Why Client-Side Only?

This architecture was chosen for:
- **Simplicity:** No backend infrastructure to maintain
- **Cost:** Free hosting on GitHub Pages
- **Performance:** No network latency for database queries
- **Privacy:** All data stays in the user's browser

### Limitations

- Data is not shared between users (each browser has its own database)
- No server-side validation or authentication
- Limited to browser storage capacity (~5-10MB typically)
- Not suitable for production apps requiring shared data

For a production app with shared data, you would need a backend server with a shared database.

## Future Enhancements
- Export/import database functionality
- Sync data across devices using cloud storage
- Photo uploads (stored as base64 in database)
- Advanced filtering and search capabilities
- Offline-first PWA features
