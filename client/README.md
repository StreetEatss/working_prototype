# React + TypeScript + Vite

This app now reads data from Supabase. Provide the following environment variables before building:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

For seeding initial food trucks and menus into Supabase, run `node ./scripts/seedSupabase.mjs` with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set. The script uses the sample trucks defined in `scripts/seedData.js`.

## Supabase prerequisites

The Supabase project needs to expose the same tables and realtime channels referenced in the client code. At minimum, make sure the following exist (snake vs. camel case does **not** work because the queries are case-sensitive):

- `FoodTruck` with columns `id`, `name`, `description`, `cuisineType`, `imageUrl`, `venmoHandle`, `defaultLocation`, `defaultLatitude`, `defaultLongitude`, `typicalSchedule`
- `StatusUpdate` with columns `id`, `truckId`, `status`, `note`, `reporterName`, `latitude`, `longitude`, `createdAt`, `source`, `userId`, `isFlagged`
- `MenuItem` with columns `id`, `truckId`, `name`, `description`, `priceCents`, `imageUrl`, `isFeatured`
- `MenuReview` with columns `id`, `menuItemId`, `rating`, `comment`, `reporterName`, `createdAt`, `userId`, `isFlagged`
- `Owner` with columns `id`, `email`, `name`
- `OwnerTruckAccess` with columns `ownerId`, `truckId`, `role`
- `User` with columns `id`, `username`, `email`, `phoneNumber`, `strikeCount`, `isBanned`

Enable **Row Level Security** and create policies that allow:

- authenticated users (`supabase.auth`) to select and insert into `StatusUpdate` and `MenuReview` for their own actions (these are created under the current session user id)
- authenticated users to read `FoodTruck`, `MenuItem`, `StatusUpdate`, and `MenuReview`
- owners to read and update rows connected via `OwnerTruckAccess` (for truck editing, menu edits, and flag moderation)

Turn on **realtime** for `FoodTruck`, `MenuItem`, `StatusUpdate`, and `MenuReview` so the UI subscriptions in `Home.tsx` and `OwnerPortal.tsx` receive events. If realtime is off, the app will still load data but live updates will not appear until a refresh.

Finally, the Supabase auth provider must be enabled for email/password so `loginOwner`, `loginUser`, and `registerUser` can create or sign in accounts.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
