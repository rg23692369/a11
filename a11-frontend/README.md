# a11-frontend

Vite + React minimal frontend for the a11 fullstack project.

## Setup
1. npm install
2. Copy .env.example to .env and set VITE_API_URL to your backend base URL (e.g. https://your-backend.vercel.app)
3. npm run dev (local) or npm run build and deploy the `dist/` on Vercel as a separate project.

## Notes
- The frontend reads VITE_API_URL at build time.
- When deploying to Vercel, set the environment variable in Project Settings: VITE_API_URL
