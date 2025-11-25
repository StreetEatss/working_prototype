# StreetEats Web App

Mobile-first web experience for Penn/University City students to discover food trucks, share live status updates, and review menu items. The app ships with a Postgres-backed API plus a Vite/React frontend optimized for mobile browsers.

## Tech Stack
- **Frontend:** React + Vite + TypeScript, React Query, React Leaflet, React Router
- **Backend:** Node.js + Express + TypeScript, Prisma ORM
- **Database:** PostgreSQL (Docker compose for local dev)

## Prerequisites
- **Node.js** 20 or higher
- **npm** 8 or higher
- **Docker Desktop** (for running PostgreSQL locally)

## Quick Start

### 1. Clone and Navigate
```bash
cd streeteats
```

### 2. Start PostgreSQL Database
```bash
docker compose up -d
```
This starts a PostgreSQL container on port `5434`. Verify it's running with:
```bash
docker compose ps
```

### 3. Set Up Backend

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` if needed (defaults should work for local development).

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

### 4. Set Up Frontend

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
│   └── prisma/       # Database schema and migrations
└── docker-compose.yml  # PostgreSQL container configuration
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
```
DATABASE_URL="postgresql://streeteats:streeteats@localhost:5434/streeteats"
JWT_SECRET="your-secret-key-here"
PORT=4000
```

### Frontend (`client/.env`)
```
VITE_API_URL=http://localhost:4000
```

## Troubleshooting

### Database Connection Issues
- Ensure Docker Desktop is running
- Check that the PostgreSQL container is up: `docker compose ps`
- Verify the `DATABASE_URL` in `server/.env` matches docker-compose settings

### Port Already in Use
- Backend (4000): Change `PORT` in `server/.env` or stop the process using port 4000
- Frontend (5173): Vite will automatically try the next available port
- Database (5434): Change the port mapping in `docker-compose.yml`

### Frontend Can't Reach Backend
- Verify `VITE_API_URL` in `client/.env` points to the correct backend URL
- Check that the backend server is running
- Ensure CORS is properly configured (default allows localhost)

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

## Future Enhancements
- Owner dashboard for schedule editing and review management
- Reputation-weighted status aggregation
- Push notifications when favorite truck status changes
- Photo uploads for menu items and status updates
- Advanced filtering and search capabilities
