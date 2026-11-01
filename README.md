# Gym Check-in API

A guided Node.js and TypeScript API exercise for a gym discovery and check-in service. The implementation applies a layered structure with HTTP controllers, use cases, repository interfaces, and Prisma-backed persistence.

## Features

- Register users and authenticate with JWTs; refresh tokens are stored in an HTTP cookie.
- Read the authenticated user's profile.
- Create and search gyms, including nearby-gym queries.
- Create check-ins, view paginated history, and read check-in metrics.
- Enforce one check-in per user per day and a 100-meter distance limit.
- Validate check-ins within 20 minutes; gym creation requires the `ADMIN` role.
- Hash account passwords with bcrypt.

The API includes user, gym, and check-in routes. It uses PostgreSQL with Prisma migrations and includes unit and end-to-end test scripts.

## Technology

Node.js, TypeScript, Fastify, Prisma ORM, PostgreSQL, Zod, JWT, cookies, bcrypt, Vitest, Supertest, and npm.

## Run locally

Create `.env` from `.env.example`, then set a private `JWT_SECRET` and a PostgreSQL `DATABASE_URL`. Start PostgreSQL with the included Compose file and run the Prisma migration and development server:

```bash
npm install
cp .env.example .env
docker compose up -d
npx prisma migrate dev
npm run start:dev
```

The API listens on port `3333` by default. `PORT` can be set in `.env`. The repository also provides `npm run build`, `npm start`, `npm test`, and `npm run test:e2e` scripts.

## Environment variables

- `NODE_ENV` (`dev`, `test`, or `prod`; defaults to `dev`)
- `JWT_SECRET` (required; use a private value)
- `PORT` (defaults to `3333`)
- `DATABASE_URL` (PostgreSQL connection string)

The example environment file contains local development defaults. Replace the JWT secret before using the API outside a local exercise and never commit credentials.

## Project status

This is an educational project, not a deployed service. The repository includes unit and end-to-end tests; end-to-end execution requires a configured PostgreSQL instance.
