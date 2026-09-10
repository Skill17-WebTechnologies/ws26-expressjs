FROM node:24.1.0-bookworm
ARG NPM_REGISTRY=https://registry.npmjs.org/
RUN npm config set registry "$NPM_REGISTRY"

# npm pinned to the WSC2026 spec
RUN npm install -g npm@11.5.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# .env.prod is the deployed configuration; .env is the local one. The platform
# rewrites .env.prod when your repository is created, so bake it into .env here
# — the running container then needs no setup step, and `docker run` on this
# image behaves the same as the deployed service.
RUN if [ -f .env.prod ]; then cp .env.prod .env; fi

# Generate the Prisma client into node_modules at build time
RUN npx prisma generate

COPY docker-entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

EXPOSE 80
ENTRYPOINT ["entrypoint"]
