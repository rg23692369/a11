# a11 Fullstack (backend + frontend)

This archive contains two folders:
- a11-backend — Vercel serverless backend (Node + Mongoose + JWT)
- a11-frontend — Vite + React frontend (calls backend API)

## Deploying
1. Push `a11-backend` to a repository and import to Vercel. Set env vars: MONGODB_URI, JWT_SECRET.
2. Push `a11-frontend` to a separate repository and import to Vercel. Set env var: VITE_API_URL to your backend URL.
