import { serve } from '@hono/node-server'
import { models } from '@pnpm-monorepo/models'
import { utilities } from '@pnpm-monorepo/utilities'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text(` ${models('Hello Hono')} + ${utilities('Hello Hono')}`)
})

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
})
