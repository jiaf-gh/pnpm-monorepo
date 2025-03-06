import { serve } from '@hono/node-server'
import { utilities } from '@pnpm-monorepo/utilities'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import usersRoute from './users'

const app = new Hono().basePath('/api')

app.use(prettyJSON())

app.use(logger())

app.use('/*', cors())

app.notFound(c => c.json({ message: 'Route not found.', sucess: false }, 404))

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Internal server error.', 500)
})

app.get('/', c => c.text('Basic Hono API.'))

app.route('/users', usersRoute)

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
})
