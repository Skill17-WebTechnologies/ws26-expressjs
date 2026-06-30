FROM node:24.1.0-bookworm

# npm pinned to the WSC2026 spec
RUN npm install -g npm@11.5.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
