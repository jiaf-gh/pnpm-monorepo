import type { User } from '@pnpm-monorepo/models'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { leaveOnlyNumbers } from '@pnpm-monorepo/utilities'
import database from './database'

const app = new OpenAPIHono()

const errorResponse = z.object({
  sucess: z
    .boolean()
    .openapi({
      example: false,
    }),
  code: z
    .number()
    .openapi({
      example: 400,
    }),
  message: z
    .string()
    .openapi({
      example: 'Error Message',
    }),
})

const userResponse = z.object({
  id: z
    .number()
    .openapi({
      example: 123,
    }),
  name: z
    .string()
    .nullable()
    .openapi({
      example: 'John Doe',
    }),
  email: z
    .string()
    .openapi({
      example: 'jondoe@email.com',
    }),
})

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    request: {
      params: z.object({
        id: z
          .string()
          .min(1)
          .openapi({
            example: '123',
          }),
      }),
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: userResponse,
          },
        },
        description: 'Success',
      },
      400: {
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
        description: 'Bad Request',
      },
      404: {
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
        description: 'Not Found',
      },
    },
    tags: ['Users'],
  }),
  async (c) => {
    const { id } = c.req.valid('param')

    const user = await database.user.findUnique({
      where:{
        id: Number.parseInt(id)
      }
    })

    if(!user) {
      return c.json(
        {
          sucess: false,
          code: 400,
          message: 'User not found.',
        },
        404,
      )
    }

    return c.json(user, 200)
  },
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          sucess: false,
          code: 400,
          message: 'Validation Error',
        },
        400,
      )
    }
  },
)

app.openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              name: z
                .string()
                .nullable(),
              email: z
                .string(),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: userResponse,
          },
        },
        description: 'Success',
      },
      400: {
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
        description: 'Bad Request',
      },
      404: {
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
        description: 'Not Found',
      },
    },
    tags: ['Users'],
  }),
  async (c) => {
    const { name, email } = c.req.valid('json')

    const created = await database.user.create({
      data: {
        name,
        email,
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })

    if(!created) {
      return c.json(
        {
          sucess: false,
          code: 400,
          message: 'User not found.',
        },
        404,
      )
    }

    return c.json(created, 200)
  },
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          sucess: false,
          code: 400,
          message: 'Validation Error',
        },
        400,
      )
    }
  },
)

export default app
