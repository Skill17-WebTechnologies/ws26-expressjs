#!/usr/bin/env bash
set -e
cd /app

# The platform writes the deployed configuration into .env.prod. Copy it over
# .env so both `prisma db push` and dotenv in server.js read the same values —
# Prisma auto-loads .env, plain Node does not, which is why server.js requires
# dotenv explicitly.
if [ -f .env.prod ]; then
  cp .env.prod .env
fi

# Sync the schema. Tolerated on failure so a database that is slow or briefly
# unreachable does not stop the container from starting — the app binds its
# port either way and reports the problem on the page.
npx prisma db push || true

exec node server.js
