# HRMS Fullstack (React + Node + PostgreSQL)

## Tech
- Frontend: React (Vite)
- Backend: Node.js (Express) + Prisma
- DB: PostgreSQL (Docker)

## Run
### 1) Start DB
docker compose up -d

### 2) Backend
cd server
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev

### 3) Frontend
cd ../client
cp .env.example .env
npm install
npm run dev

Frontend: http://localhost:5173  
Backend health: http://localhost:5001/health


