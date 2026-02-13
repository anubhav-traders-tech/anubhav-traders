# Anubhav Traders - B2B & B2C Platform

Full-stack trading and distribution platform handling public retail (B2C) and business wholesale (B2B) operations.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Infrastructure**: Docker, Docker Compose

## Prerequisites
- Docker & Docker Compose
- Node.js (v18+)

## Quick Start (Docker)
1. Run the entire stack:
   ```bash
   docker-compose up --build
   ```
2. Access the apps:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Manual Setup (Local Development)

### Database
Ensure PostgreSQL is running and create a database named `anubhav_traders`. Update `server/.env` with credentials.

### Server
```bash
cd server
npm install
npm run dev
```

### Client
```bash
cd client
npm install
npm run dev
```

## Features
- **Public Shop**: Browse products, view details (no login required).
- **Cart**: simple cart status.
- **B2B Portal**: `/b2b` - Requires 'b2b' role account. Shows bulk pricing and order history.
- **Admin**: `/admin` - Manage products. Requires 'admin' role.

## Default Accounts
(Register these manually or see seed data)
- **Admin**: Sign up and manually set role='admin' in DB.
- **B2B**: Sign up as Business. Needs `approved=true` in DB to login.
