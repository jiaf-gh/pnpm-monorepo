import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(express.json())

app.use(express.static(resolve(dirname(fileURLToPath(import.meta.url)), 'public')))

app.use(morgan('tiny'))

app.get('/ping', async (_req, res) => {
  res.send({ message: 'pong' })
})

const hostname = process.env.HOST || '0.0.0.0'
const port = Number.parseInt(`${process.env.PORT}`) || 4200

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at: http://${hostname}:${port}`)
})
