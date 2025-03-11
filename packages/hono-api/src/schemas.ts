import { z } from '@hono/zod-openapi'

export const responseSchemaBadRequest = {
  content: {
    'application/json': {
      schema: z.object({
        sucess: z
          .boolean()
          .openapi({ example: false }),
        code: z
          .number()
          .openapi({ example: 400 }),
        message: z
          .string()
          .openapi({ example: 'Bad Request' }),
        validation: z
          .array(z.object({
            code: z.string(),
            expected: z.string(),
            received: z.string(),
            path: z.array(z.union([z.string(), z.number()])),
            message: z.string(),
          }))
          .openapi({ example: [] }),
      }),
    },
  },
  description: 'Bad Request',
}

export const responseSchemaNotFound = {
  content: {
    'application/json': {
      schema: z.object({
        sucess: z
          .boolean()
          .openapi({ example: false }),
        code: z
          .number()
          .openapi({ example: 404 }),
        message: z
          .string()
          .openapi({ example: 'Not Found' }),
      }),
    },
  },
  description: 'Not Found',
}
