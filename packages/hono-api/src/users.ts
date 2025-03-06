import type { IUserCreateRequest } from '@pnpm-monorepo/models'
import { User } from '@pnpm-monorepo/models'
import { Hono } from 'hono'

const app = new Hono()

app.get('/:id', (c) => {
  const id = c.req.param('id')
  const user = new User(id, 'Jon Doe', 'jondoe@email.com')
  return c.json(user)
})

app.post('/', async (c) => {
  const { name, email } = await c.req.json<IUserCreateRequest>()
  const user = new User('123', name, email)
  return c.json(user)
})

export default app
