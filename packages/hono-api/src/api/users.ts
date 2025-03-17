import {
  createRoute,
  OpenAPIHono,
  z,
} from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import {
  MESSAGE_USER_DELETE_ERROR,
  MESSAGE_USER_DELETE_SUCCESS,
  MESSAGE_USER_GET_ERROR,
  MESSAGE_USER_GET_SUCCESS,
  MESSAGE_USER_POST_ERROR,
  MESSAGE_USER_POST_SUCCESS,
  MESSAGE_USER_UPDATE_ERROR,
  MESSAGE_USER_UPDATE_SUCCESS,
  SWAGGER_TAG,
} from '../constants'
import database from '../database'
import {
  responseBase,
  responseNotFound,
  responseSchema200,
  responseSchema400,
  responseSchema404,
  responseValidation,
} from '../responses'

const app = new OpenAPIHono()

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
      200: responseSchema200,
      400: responseSchema400,
    },
    tags: [SWAGGER_TAG.USERS],
  }),
  async (c) => {
    try {
      const { name, email } = c.req.valid('json')
      const created = await database.user.create({
        data: {
          name,
          email,
          profile: { create: { bio: 'I like turtles' } },
        },
      })
      const response = responseBase.success({
        message: MESSAGE_USER_POST_SUCCESS,
        data: created,
      })
      return c.json(response, response.code)
    }
    catch (error) {
      throw new HTTPException(500, { message: MESSAGE_USER_POST_ERROR, cause: error })
    }
  },
  (result, c) => {
    if (!result.success) {
      const validationError = responseValidation(result.error.errors)
      return c.json(validationError, validationError.code)
    }
  },
)

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
      200: responseSchema200,
      400: responseSchema400,
      404: responseSchema404,
    },
    tags: [SWAGGER_TAG.USERS],
  }),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const user = await database.user.findUnique({ where: { id: Number.parseInt(id) } })
      if (!user) {
        const response = responseNotFound(MESSAGE_USER_GET_ERROR)
        return c.json(response, response.code)
      }
      const response = responseBase.success({
        message: MESSAGE_USER_GET_SUCCESS,
        data: user,
      })
      return c.json(response, response.code)
    }
    catch (error) {
      throw new HTTPException(500, { message: MESSAGE_USER_GET_ERROR, cause: error })
    }
  },
  (result, c) => {
    if (!result.success) {
      const validationError = responseValidation(result.error.errors)
      return c.json(validationError, validationError.code)
    }
  },
)

app.openapi(
  createRoute({
    method: 'put',
    path: '/{id}',
    request: {
      params: z.object({
        id: z
          .string()
          .min(1)
          .openapi({ example: '123' }),
      }),
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
      200: responseSchema200,
      400: responseSchema400,
    },
    tags: [SWAGGER_TAG.USERS],
  }),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const { name, email } = c.req.valid('json')
      const updated = await database.user.update({
        where: { id: Number.parseInt(id) },
        data: {
          name,
          email,
        },
      })
      const response = responseBase.success({
        message: MESSAGE_USER_UPDATE_SUCCESS,
        data: updated,
      })
      return c.json(response, response.code)
    }
    catch (error) {
      throw new HTTPException(500, { message: MESSAGE_USER_UPDATE_ERROR, cause: error })
    }
  },
  (result, c) => {
    if (!result.success) {
      const validationError = responseValidation(result.error.errors)
      return c.json(validationError, validationError.code)
    }
  },
)

app.openapi(
  createRoute({
    method: 'delete',
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
      200: responseSchema200,
      400: responseSchema400,
    },
    tags: [SWAGGER_TAG.USERS],
  }),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const deletedUser = await database.user.delete({ where: { id: Number.parseInt(id) } })
      const response = responseBase.success({
        message: MESSAGE_USER_DELETE_SUCCESS,
        data: deletedUser,
      })
      return c.json(response, response.code)
    }
    catch (error) {
      throw new HTTPException(500, { message: MESSAGE_USER_DELETE_ERROR, cause: error })
    }
  },
  (result, c) => {
    if (!result.success) {
      const validationError = responseValidation(result.error.errors)
      return c.json(validationError, validationError.code)
    }
  },
)

export default app
