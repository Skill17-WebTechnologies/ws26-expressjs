const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')

// SQLite only — a self-contained file, no external database server. The entrypoint runs
// `prisma db push` to create it before the server starts.
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./prisma/dev.db' })
const prisma = new PrismaClient({ adapter })

const app = express()
const PORT = process.env.PORT || 80

app.use(express.json())

async function getTasks() {
  try {
    return await prisma.task.findMany({ orderBy: { id: 'asc' } })
  } catch (e) {
    return null // database unavailable
  }
}

async function seed() {
  try {
    if ((await prisma.task.count()) === 0) {
      await prisma.task.createMany({
        data: [
          { title: 'Read the brief', done: true },
          { title: 'Build the app', done: false },
        ],
      })
    }
  } catch (e) {
    console.error('seed skipped (database not ready):', e.message)
  }
}

// JSON API
app.get('/api/tasks', async (req, res) => {
  const tasks = await getTasks()
  if (!tasks) return res.status(503).json({ framework: 'Express', version: '5.2.1', error: 'database unavailable' })
  res.json({ framework: 'Express', version: '5.2.1', orm: 'Prisma 7.3.0', tasks })
})

app.post('/api/tasks', async (req, res) => {
  const title = (req.body && req.body.title) || 'Untitled'
  try {
    const task = await prisma.task.create({ data: { title } })
    res.status(201).json(task)
  } catch (e) {
    res.status(503).json({ error: 'database unavailable' })
  }
})

// Server-rendered home page
app.get('/', async (req, res) => {
  const tasks = await getTasks()
  const body = tasks
    ? `<ul>${tasks.map(t => `<li>${t.done ? '✅' : '⬜️'} ${t.title}</li>`).join('')}</ul>`
    : `<p>⚠️ Database not available. Start with <code>docker compose up --build</code>.</p>`
  res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>WSC2026 · Express 5.2.1</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; display: grid; place-items: center; min-height: 100vh; background: #0b1020; color: #e7ecff; }
    .card { background: #151c33; padding: 2.5rem 3rem; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,.4); max-width: 32rem; }
    h1 { margin: 0 0 .25rem; }
    .v { color: #7c9cff; font-weight: 600; }
    ul { line-height: 1.9; padding-left: 1.2rem; }
    code { background: #0b1020; padding: .15rem .4rem; border-radius: 6px; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Express <span class="v">5.2.1</span></h1>
    <p>WSC2026 Web Technologies — minimal back-end app, tasks stored with Prisma 7.3.0 (SQLite).</p>
    ${body}
    <p>JSON API: <code>GET /api/tasks</code></p>
  </main>
</body>
</html>`)
})

// Bind the port immediately so the container stays up even if the DB is unreachable.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express 5.2.1 app listening on http://0.0.0.0:${PORT}`)
})

seed()
