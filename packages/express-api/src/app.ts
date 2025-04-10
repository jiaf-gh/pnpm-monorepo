import type { Request as ExRequest, Response as ExResponse } from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import express, { urlencoded } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from '../generated/routes'

export const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(express.static(resolve(dirname(fileURLToPath(import.meta.url)), 'public')))
app.use(morgan('tiny'))
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(
    swaggerUi.generateHTML(await import('../generated/swagger.json')),
  )
})

RegisterRoutes(app)