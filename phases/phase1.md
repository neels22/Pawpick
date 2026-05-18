# Phase 1: Project Initialization & Database Setup

## Objective
Set up the core Next.js application, install necessary dependencies, configure the SQLite database via Prisma, and seed the initial data.

## Tasks
1. Create a Next.js project using App Router, TypeScript, and Tailwind CSS.
2. Install runtime dependencies (`@prisma/client`, `framer-motion`, `lucide-react`).
3. Install Prisma dev dependency (`prisma`) and initialize with SQLite.
4. Define the `Item` and `Vote` models in `prisma/schema.prisma` according to the PRD (Section 15.1).
5. Run the initial database migration (`npx prisma migrate dev --name init`).
6. Create the seed script (`prisma/seed.ts`) to programmatically generate 100 pet SVGs in `public/items/` and seed the database with exactly 100 pets.

## Testing Completion
- Run `npm install` with no errors.
- Run `npm run db:seed`.
- **Verification:** Ensure `public/items/` contains 100 SVG files, and the SQLite database contains 100 records in the `Item` table.
