import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import usersRoute from './users'

const app = new OpenAPIHono()

app.use('/favicon.ico', serveStatic({ root: './src', path: './static/favicon.ico' }))

app.use(prettyJSON())

app.use(logger())

app.use('/*', cors())

app.notFound(c => c.json({ message: 'Route not found.', sucess: false }, 404))

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Internal server error.', 500)
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'A REST API using Hono.',
  },
})

app.get('/', c => c.text('A REST API using Hono.'))

app.get('/ui', swaggerUI({ url: '/doc' }))

app.route('/users', usersRoute)

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
})
