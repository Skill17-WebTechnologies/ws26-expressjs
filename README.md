# Express 5.2.1 — WSC2026

A minimal **Express 5.2.1** back-end app (WorldSkills 2026 Web Technologies, TP17): a server-rendered
home page plus a small JSON API, with tasks persisted through **Prisma 7.3.0** (MySQL).

## Run it

```bash
docker compose up --build
```

Then open **http://localhost** (JSON API under `/api`). Stop with `docker compose down`.

## Develop

You need **Node 24.1.0** and **npm 11.5.0** installed locally (the same versions the Docker image pins).

```bash
cp .env.example .env   # then edit DATABASE_URL if your database differs
npm install
npx prisma db push     # creates the tables and generates the client
npm start              # or: node --watch server.js  (auto-restart on save)
```

`docker compose up` starts a MySQL service for you; running outside Docker needs
a MySQL server of your own, with `DATABASE_URL` pointed at it.

Edit **server.js**. With `node --watch` the server restarts automatically.

## Database

Tasks live in **MySQL**. The schema is `prisma/schema.prisma`; the connection string
comes from `DATABASE_URL`, wired up in `prisma.config.ts`.

There are two configuration files, and which one applies depends on where the app runs:

| File | Used by | In git? |
| --- | --- | --- |
| `.env` | your local machine | no — ignored, and excluded from the image |
| `.env.prod` | the deployed app | yes — the competition platform writes your database credentials here |

`docker-entrypoint.sh` copies `.env.prod` over `.env` when the container starts, so
both `prisma db push` and the app read the same values. Node does not load `.env` on
its own, so `server.js` calls `require('dotenv').config()` and `prisma.config.ts`
imports `dotenv/config` — remove either and the app falls back to a placeholder
connection string and cannot reach your database.

Change the schema, then re-sync with:

```bash
npx prisma db push
```

## Stack

- Node 24.1.0 / npm 11.5.0
- Express 5.2.1
- Prisma 7.3.0 (`@prisma/adapter-mariadb`)
- MySQL 8.4 (via `docker compose`)
