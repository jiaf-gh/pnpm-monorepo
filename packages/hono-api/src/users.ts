import {
  createRoute,
  OpenAPIHono,
  z,
} from '@hono/zod-openapi'
import {
  MESSAGE_USER_NOT_CREATED,
  MESSAGE_USER_NOT_FOUND,
  SWAGGER_TAG,
} from './constants'
import database from './database'
import {
  responseNotFound,
  responseValidationError,
} from './responses'
import { responseSchemaBadRequest, responseSchemaNotFound } from './schemas'

const app = new OpenAPIHono()

const responseSchemaTargetUser = {
  content: {
    'application/json': {
      schema: z.object({
        id: z
          .number()
          .openapi({ example: 123 }),
        name: z
          .string()
          .nullable()
          .openapi({ example: 'John Doe' }),
        email: z
          .string()
          .openapi({ example: 'jondoe@email.com' }),
      }),
    },
  },
  description: 'Success',
}

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    request: {
      params: z.object({
        id: z
          .string()
          .min(1)
          .openapi({ example: '123' }),
      }),
    },
    responses: {
      200: responseSchemaTargetUser,
      400: responseSchemaBadRequest,
      404: responseSchemaNotFound,
    },
    tags: [SWAGGER_TAG.USERS],
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const user = await database.user.findUnique({ where: { id: Number.parseInt(id) } })
    if (!user) {
      const response = responseNotFound(MESSAGE_USER_NOT_FOUND)
      return c.json(response, response.code)
    }
    return c.json(user, 200)
  },
  (result, c) => {
    if (!result.success) {
      const validationError = responseValidationError(result.error.errors)
      return c.json(validationError, validationError.code)
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
      200: responseSchemaTargetUser,
      400: responseSchemaBadRequest,
      404: responseSchemaNotFound,
    },
    tags: [SWAGGER_TAG.USERS],
  }),
  async (c) => {
    const { name, email } = c.req.valid('json')
    const created = await database.user.create({
      data: {
        name,
        email,
        profile: { create: { bio: 'I like turtles' } },
      },
    })
    if (!created) {
      const notFound = responseNotFound(MESSAGE_USER_NOT_CREATED)
      return c.json(notFound, notFound.code)
    }
    return c.json(created, 200)
  },
  (result, c) => {
    if (!result.success) {
      const validationError = responseValidationError(result.error.errors)
      return c.json(validationError, validationError.code)
    }
  },
)

export default app
