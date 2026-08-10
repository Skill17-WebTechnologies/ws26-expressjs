import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // SQLite file — no external database server. Overridable via DATABASE_URL.
    url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
  },
})
