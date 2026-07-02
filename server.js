const express = require('express')

const app = express()
const PORT = process.env.PORT || 80

// In-memory demo data
const tasks = [
  { id: 1, title: 'Read the brief', done: true },
  { id: 2, title: 'Build the app', done: false },
]

app.use(express.json())

// JSON API
app.get('/api/tasks', (req, res) => {
  res.json({ framework: 'Express', version: '5.2.1', tasks })
})

app.post('/api/tasks', (req, res) => {
  const title = (req.body && req.body.title) || 'Untitled'
  const task = { id: tasks.length + 1, title, done: false }
  tasks.push(task)
  res.status(201).json(task)
})

// Server-rendered home page
app.get('/', (req, res) => {
  const rows = tasks
    .map(t => `<li>${t.done ? '✅' : '⬜️'} ${t.title}</li>`)
    .join('')
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
    <p>WSC2026 Web Technologies — minimal back-end app.</p>
    <ul>${rows}</ul>
    <p>JSON API: <code>GET /api/tasks</code></p>
  </main>
</body>
</html>`)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express 5.2.1 app listening on http://0.0.0.0:${PORT}`)
})
