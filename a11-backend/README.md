# a11-backend

Vercel serverless backend for a11 fullstack project.

## Endpoints
- POST /api/signup
- POST /api/login
- GET  /api/me
- GET  /api/hello

## Env
- MONGODB_URI
- JWT_SECRET

## Local dev
1. npm install
2. Set MONGODB_URI and JWT_SECRET in your environment or .env (do not commit).
3. npx vercel dev
