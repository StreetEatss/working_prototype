# StreetEats Web App

Mobile-first web experience for Penn/University City students to discover food trucks, share live status updates, and review menu items. The app is based on the StreetEats proposal and reflection artifacts and ships with a Postgres-backed API plus a Vite/React frontend tuned for phone browsers.

## Tech Stack
- **Frontend:** React + Vite + TypeScript, React Query, React Leaflet
- **Backend:** Node.js + Express + TypeScript, Prisma ORM
- **Database:** PostgreSQL (Docker compose for local dev)

## Quick Start
1. **Install prerequisites**
   - Node 20+
   - npm 8+
   - Docker (for Postgres)

2. **Boot Postgres**
   ```bash
   cd /Users/eitang/Downloads/streetdem/streeteats
   docker compose up -d
   ```

3. **Configure backend env + install deps**
   ```bash
   cd /Users/eitang/Downloads/streetdem/streeteats/server
   cp .env.example .env   # edit if needed
   npm install
   npm run prisma:migrate -- --name init
   npm run seed
   npm run dev
   ```
   - API defaults to `http://localhost:4000`

4. **Install + run frontend**
   ```bash
   cd /Users/eitang/Downloads/streetdem/streeteats/client
   npm install
   npm run dev
   ```
   - Vite dev server is `http://localhost:5173`

## API Surface
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Liveness check |
| GET | `/api/trucks` | List trucks with latest status + menu aggregates |
| GET | `/api/trucks/:truckId` | Detail view with last 10 status updates and reviews |
| POST | `/api/trucks/:truckId/status` | Crowd submits a live status update |
| POST | `/api/trucks/:truckId/reviews` | Crowd submits a menu-item review |
| POST | `/api/auth/register` | Owner sign-up (returns JWT) |
| POST | `/api/auth/login` | Owner login |
| POST | `/api/trucks` | Owner creates a truck (JWT required) |

## Data Model Highlights
- `FoodTruck` records with optional owner access control via `OwnerTruckAccess`
- `StatusUpdate` captures crowd + owner submissions (`source`, `reliability`, lat/lng)
- `MenuItem` / `MenuReview` pair provides per-dish insights and photo hooks

Local migrations live in `server/prisma/migrations` and can be applied with `npm run prisma:deploy` (for CI) or `npm run prisma:migrate` (dev).

## Frontend Notes
- Optimized for small screens with a floating map + bottom sheet interaction
- React Query caches truck data; forms optimistically refresh after submissions
- Leaflet map markers snap to campus defaults when truck lat/lng missing
- `.env` supplies `VITE_API_URL` to point at different environments

## Future Work
- Owner dashboard for schedule editing + QC review queue
- Reputation-weighted aggregation module exposed via the API
- Push notifications / SMS hook when favorite truck status flips

