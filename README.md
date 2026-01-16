# WAS Media Hub

The internal campaign intelligence and monitoring platform for We Are Social.

## Overview
WAS Media Hub aggregates data from various social platforms, paid media channels, and internal tools to provide a unified view of brand performance.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (Local) / MySQL (Production) via Prisma ORM
- **Styling**: Tailwind CSS, Shadcn UI, Lucide Icons
- **Auth**: NextAuth.js
- **Charts/Maps**: Recharts, React Simple Maps

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd was-media-hub
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` is required due to `react-simple-maps` React 19 compatibility)*

3. Set up environment:
   Copy `.env.example` to `.env` (ensure you have the required keys).
   ```bash
   cp .env.example .env
   ```

4. Initialize Database:
   ```bash
   npx prisma db push
   ```

5. Run Development Server:
   ```bash
   npm run dev
   ```

## Project Structure
- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities, database clients, and helper functions.
- `scripts`: Maintenance and migration scripts.
- `prisma`: Database schema and migrations.

## Build for Production
```bash
npm run build
npm start
```

## License
Private / Proprietary
