# Express 5.2.1 — WSC2026

A minimal **Express 5.2.1** back-end app (WorldSkills 2026 Web Technologies, TP17): a server-rendered
home page plus a small JSON API.

## Run it

```bash
docker compose up --build
```

Then open **http://localhost:3000** (JSON API under `/api`). Stop with `docker compose down`.

## Develop

You need **Node 24.1.0** and **npm 11.5.0** installed locally (the same versions the Docker image pins).

```bash
npm install
npm start          # or: node --watch server.js  (auto-restart on save)
```

Edit **server.js**. With `node --watch` the server restarts automatically.

## Stack

- Node 24.1.0 / npm 11.5.0
- Express 5.2.1
