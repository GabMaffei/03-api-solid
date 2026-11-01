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

## Source guide

| Source | What to inspect |
| --- | --- |
| [Authentication boundary](src/http/middlewares/verify-jwt.ts) | JWT verification before protected routes. |
| [Check-in use case](src/use-cases/check-in.ts) | Distance and same-day check-in rules. |
| [Validation use case](src/use-cases/validate-check-in.ts) | Time window for validating a check-in. |
| [Repository contract](src/repositories/check-ins-repository.ts) | Persistence abstraction used by the application layer. |
| [Test repository](src/repositories/in-memory/in-memory-check-ins-repository.ts) | In-memory implementation used by use-case tests. |
| [Business-rule tests](src/use-cases/check-in.spec.ts) | Examples covering the check-in use case. |

## Architecture reading order

Follow a request from the HTTP boundary into a use case and then its repository interface. Compare the in-memory repository used in tests with the Prisma implementation to see how persistence is separated from business rules.

The unit tests and end-to-end tests exercise different boundaries: use-case tests can use in-memory repositories, while HTTP/end-to-end workflows need the configured database environment. The presence of test files does not indicate a test run or passing result for this documentation change.
