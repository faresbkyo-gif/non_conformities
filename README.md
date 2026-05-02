# Fleet Management Web App

Full-stack fleet management system with clean architecture backend and React frontend.

## Features
- Vehicle CRUD (add/edit/delete)
- Track vehicle arrival dates
- Assign vehicles to clients
- Dashboard statistics
- JWT authentication
- REST API

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL

## Run Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Initialize DB:
```bash
psql "$DATABASE_URL" -f src/infrastructure/db/init.sql
```

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/vehicles`
- `POST /api/vehicles`
- `PUT /api/vehicles/:id`
- `DELETE /api/vehicles/:id`
- `GET /api/clients`
- `GET /api/dashboard/stats`
