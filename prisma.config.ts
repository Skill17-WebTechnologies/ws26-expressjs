// Prisma auto-loads .env only when there is no config file. With this file
// present the CLI does not, so `prisma db push` would fall back to the
// placeholder below and fail with `P1001 ... placeholder:3306`. Loading dotenv
// here keeps the CLI and the app reading the same configuration.
import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // MySQL over TCP. The real value comes from DATABASE_URL — set in .env
    // locally, and written into .env.prod by the competition platform when the
    // repository is created.
    //
    // The fallback exists so `prisma generate` can run during the Docker build,
    // before any credentials exist. It is never a usable server: if you see
    // `placeholder` in a runtime error, DATABASE_URL did not reach the process.
    url: process.env.DATABASE_URL || 'mysql://placeholder:placeholder@placeholder:3306/placeholder',
  },
})
