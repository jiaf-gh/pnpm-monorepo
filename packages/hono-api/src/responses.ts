import type { ZodIssue } from 'zod'
import { z } from '@hono/zod-openapi'
import {
  MESSAGE_CONTENT_NOT_FOUND,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_VALIDATION_ERROR,
} from './constants'

type ResponseBase<Code = number, Data = never> = {
  code: Code
  timestamp: Date
} & (
  | {
    success: true
    message?: string
    data?: Data
  }
  | {
    success: false
    message: string
    validation?: ZodIssue[]
  })

export const responseBase = {
  success: <Code extends number = 200, Data = never>(options?: {
    code?: Code
    message?: string
    data?: Data
  }) => {
    const response: ResponseBase<Code, Data> = {
      code: options?.code ?? 200 as Code,
      timestamp: new Date(),
      success: true,
    }
    if (options?.message) {
      response.message = options?.message
    }
    if (options?.data) {
      response.data = options?.data
    }
    return response
  },
  error: <Code extends number = 500>(options?: {
    code?: Code
    message?: string
    validation?: ZodIssue[]
  }) => {
    const response: ResponseBase<Code> = {
      code: options?.code ?? 500 as Code,
      timestamp: new Date(),
      success: false,
      message: options?.message || MESSAGE_INTERNAL_SERVER_ERROR,
    }
    if (options?.validation) {
      response.validation = options?.validation
    }
    return response
  },
}

export function responseValidation(validation?: ZodIssue[]) {
  return responseBase.error({
    code: 400,
    message: MESSAGE_VALIDATION_ERROR,
    validation,
  })
}

export function responseNotFound(message?: string) {
  return responseBase.error({
    code: 404,
    message: message ?? MESSAGE_CONTENT_NOT_FOUND,
  })
}

const schemaBase = z.object({
  code: z
    .number()
    .openapi({ example: 200 }),
  timestamp: z
    .date()
    .openapi({ example: new Date().toISOString() }),
  success: z
    .boolean()
    .openapi({ example: true }),
})

export const responseSchema200 = {
  content: {
    'application/json': {
      schema: schemaBase.merge(z.object({
        message: z
          .string()
          .optional(),
        data: z.any(),
      })),
    },
  },
  description: 'Successful Request',
}

export const responseSchema400 = {
  content: { 'application/json': { schema: schemaBase.merge(z.object({ message: z.string() })) } },
  description: 'Bad Request',
}

export const responseSchema404 = {
  content: {
    'application/json': {
      schema: schemaBase.merge(z.object({
        message: z.string(),
        validation: z
          .array(z.any())
          .optional()
          .openapi({ example: [] }),
      })),
    },
  },
  description: 'Not Found',
}