# Migration from PostgreSQL to SQLite

## Important Notes

When switching from PostgreSQL to SQLite, you need to:

1. **Delete existing migrations** (they're PostgreSQL-specific):
   ```bash
   rm -rf prisma/migrations
   ```

2. **Create a new initial migration**:
   ```bash
   npm run prisma:migrate -- --name init
   ```

3. **The database file** (`dev.db`) will be created automatically in the `prisma` directory.

4. **Update your `.env` file**:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

5. **Reseed the database**:
   ```bash
   npm run seed
   ```

## Differences

- SQLite uses `file:` URLs instead of `postgresql://`
- No need for Docker or a separate database server
- Database file is stored locally in `prisma/dev.db`
- Some PostgreSQL-specific features may not be available

