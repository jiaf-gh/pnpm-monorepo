import type {
  ErrorRequestHandler,
  Request as ExRequest,
  Response as ExResponse,
  NextFunction,
} from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  APICodes,
  APIError,
  APIMessages,
  APIResponse,
} from '@pnpm-monorepo/models'
import cors from 'cors'
import express, { urlencoded } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { ValidateError } from 'tsoa'
import { RegisterRoutes } from '../generated/routes'

export const app = express()

app.use(cors())
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

app.use(notFoundHandler)
app.use(errorHandler as ErrorRequestHandler)

function notFoundHandler(_req: ExRequest, res: ExResponse) {
  const status = APICodes.BAD_REQUEST
  res.status(status).send(APIResponse.error({
    code: status,
    message: APIMessages.ROUTE_NOT_FOUND,
  }))
}

function errorHandler(
  err: unknown,
  _req: ExRequest,
  res: ExResponse,
  next: NextFunction,
) {
  console.error(err)
  if (err instanceof ValidateError) {
    const status = APICodes.UNPROCESSABLE_ENTITY
    const message = APIMessages.VALIDATION_FAILED
    return res.status(status).json(
      APIResponse.error({
        code: status,
        message,
        details: err?.fields,
      }),
    )
  }
  if (err instanceof APIError) {
    const status = err.code || APICodes.INTERNAL_ERROR
    return res
      .status(status)
      .json(APIResponse.error({
        code: status,
        message: err.message as APIMessages,
        details: err.details,
      }))
  }
  if (err instanceof Error) {
    return res
      .status(APICodes.INTERNAL_ERROR)
      .json(APIResponse.error({ details: err }))
  }
  next()
}