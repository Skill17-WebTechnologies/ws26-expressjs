# Express 5.2.1 — WSC2026 minimal app

```bash
docker compose up --build
```

Open **http://localhost** (server-rendered page).
JSON API: `GET /api/tasks`, `POST /api/tasks` (`{ "title": "..." }`).

Tasks are stored with **Prisma 7.3.0** in a self-contained **SQLite** file
(`prisma/dev.db`) — no database server. The entrypoint runs `prisma db push`
before starting the server, and the app seeds two rows on first boot.

Pinned: Node 24.1.0 / npm 11.5.0, Express 5.2.1, Prisma 7.3.0.
