# Express 5.2.1 — WSC2026 minimal app

```bash
docker compose up --build
```

Open **http://localhost** (server-rendered page).
JSON API: `GET /api/tasks`, `POST /api/tasks` (`{ "title": "..." }`).

Tasks are stored with **Prisma 7.3.0** in **MySQL**, which `docker compose`
starts alongside the app. The entrypoint copies `.env.prod` over `.env`, runs
`prisma db push` to sync the schema, then starts the server; the app seeds two
rows on first boot.

The app binds its port even when the database is unreachable, so a
misconfigured `DATABASE_URL` shows an explanatory page rather than a container
that never starts.

Pinned: Node 24.1.0 / npm 11.5.0, Express 5.2.1, Prisma 7.3.0.
