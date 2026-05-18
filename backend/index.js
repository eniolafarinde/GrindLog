import cors from 'cors'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'grindlog-api' })
})

app.listen(PORT, () => {
  console.log(`GrindLog API listening on http://localhost:${PORT}`)
})
