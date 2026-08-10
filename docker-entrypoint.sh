#!/usr/bin/env bash
set -e
cd /app

# SQLite only — no external database server. Create/sync the schema in the local file, then serve.
npx prisma db push || true
exec node server.js
