# StreetEats Web App

StreetEats is a mobile-first web app for Penn/University City students to find campus food trucks, share live intel, and let truck owners manage their menus and schedules. The app is built for quick map-first discovery and lightweight moderation so owners can keep information trustworthy.

## Live site
StreetEats is accessable at [https://working-prototype.vercel.app/](url)



## Tech stack
- **Frontend:** React 19 + Vite + TypeScript, React Router (HashRouter), TanStack React Query for data fetching, React Leaflet for maps, and axios for HTTP requests.
- **Data layer:** Supabase REST/PostgREST tables with tokens stored in `localStorage` for both diner and owner sessions.
- **Backend (server/):** Express + TypeScript API backed by Prisma and SQLite. The `prisma/seed.ts` script loads sample trucks, menu items, statuses, and the default owner account.
- **Styling:** Custom CSS via `App.css` and `index.css`.


## User Accounts

**Regular Users:** There are no default user accounts. Users must create their own account by:
Either Clicking "Sign Up" and filling out the prompts, or 

1. Clicking the "Login" button in the top right
2. Clicking "Create Account" in the login modal
3. Filling out the necessary prompts.

Users can view all information without logging in, but must be logged in to post status updates or reviews.

## Owner Accounts

Each food truck has its own owner account. More owner accounts can be made via StreetEats staff at any time, but cannot be made by users. Use these credentials to log in:

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
- Owners can also flag users who are improperly using the platform. After 3 strikes, a user is banned from our platform.


## Features

### For diners
- Map view with Leaflet markers for each truck’s default location with Google Maps integration
- Real-time status posts (open/closed/moved) with optional notes and geolocation pulled from the truck defaults.
- Menu browsing with prices, featured dishes, and crowd-sourced star ratings & reviews.
- Authenticated status updates and menu reviews with per-user strike tracking for repeat issues.
- Easy account creation
- Ability to post reviews and update realtime status when logged in.

### For Owners
- Dedicated login portal at bottom of screen (intentionally hidden)
- Manage operating hours for your trucks
- View all trucks you have access to
- Update schedules with a simple time picker interface
- Ability to flag unruly users (3 strike system).





