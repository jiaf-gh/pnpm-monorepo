import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { sentry } from '@hono/sentry'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { timeout } from 'hono/timeout'
import usersRoute from './api/users'
import {
  MESSAGE_ROUTE_NOT_FOUND,
  MESSAGE_TIMED_OUT,
  TIMEOUT_MS,
} from './constants'
import { responseBase, responseNotFound } from './responses'

const app = new OpenAPIHono()

app.use('/favicon.ico', serveStatic({ root: './src', path: './static/favicon.ico' }))

app.use(prettyJSON())

app.use(logger())

app.use('/*', sentry({ dsn: process.env.SENTRY_DSN }))

app.use('/*', cors())

app.use('/*', timeout(TIMEOUT_MS, new HTTPException(504, { message: MESSAGE_TIMED_OUT })))

app.notFound((c) => {
  const response = responseNotFound(MESSAGE_ROUTE_NOT_FOUND)
  return c.json(response, response.code)
})

app.onError((err, c) => {
  console.error(`${err}`)
  c.get('sentry').captureException(err)
  if (err instanceof HTTPException) {
    const response = responseBase.error({ code: err.status, message: err.message })
    return c.json(response, response.code)
  }
  const response = responseBase.error()
  return c.json(response, response.code)
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'A REST API using Hono.',
  },
})

app.get('/ui', swaggerUI({ url: '/doc' }))

app.route('/users', usersRoute)

const hostname = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT
  ? !Number.isNaN(Number.parseInt(process.env.PORT))
      ? Number.parseInt(process.env.PORT)
      : 3001
  : 3001

serve({
  fetch: app.fetch,
  hostname,
  port,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://${info.address}:${info.port}`)
})
