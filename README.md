# Express 5.2.1 — WSC2026

A minimal **Express 5.2.1** back-end app (WorldSkills 2026 Web Technologies, TP17): a server-rendered
home page plus a small JSON API, with tasks persisted through **Prisma 7.3.0** (SQLite).

## Run it

```bash
docker compose up --build
```

Then open **http://localhost** (JSON API under `/api`). Stop with `docker compose down`.

## Develop

You need **Node 24.1.0** and **npm 11.5.0** installed locally (the same versions the Docker image pins).

```bash
npm install
npx prisma db push   # creates prisma/dev.db and generates the client
npm start            # or: node --watch server.js  (auto-restart on save)
```

Edit **server.js**. With `node --watch` the server restarts automatically.

## Database

Tasks live in a self-contained **SQLite** file — there is no database server in any
environment. The schema is `prisma/schema.prisma`; the connection string comes from
`DATABASE_URL` (default `file:./prisma/dev.db`), wired up in `prisma.config.ts`.

Change the schema, then re-sync with:

```bash
npx prisma db push
```

## Stack

- Node 24.1.0 / npm 11.5.0
- Express 5.2.1
- Prisma 7.3.0 (`@prisma/adapter-better-sqlite3`)
