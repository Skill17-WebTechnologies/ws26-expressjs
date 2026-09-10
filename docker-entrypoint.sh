#!/usr/bin/env bash
set -e
cd /app

# .env was written at build time from .env.prod (see Dockerfile), so there is no
# configuration step here.

# Sync the schema. Tolerated on failure so a database that is slow or briefly
# unreachable does not stop the container from starting — the app binds its
# port either way and reports the problem on the page.
#
# This is a separate process from the one below, so node's --env-file does not
# reach it; prisma.config.ts loads .env itself.
npx prisma db push || true

# --env-file-if-exists rather than --env-file: the latter exits with code 9 when
# the file is absent, which would leave nothing listening and surface as
# "container failed to start and listen on the port" — the very error this
# template was fixed to avoid.
exec node --env-file-if-exists=.env server.js
