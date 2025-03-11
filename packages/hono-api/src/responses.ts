import type { ZodIssue } from 'zod'
import { MESSAGE_NOT_FOUND, MESSAGE_VALIDATION_ERROR } from './constants'

export function responseValidationError(validation?: ZodIssue[]) {
  return {
    sucess: false,
    code: 400 as const,
    message: MESSAGE_VALIDATION_ERROR,
    validation: validation ?? [],
  }
}

export function responseNotFound(message?: string) {
  return {
    sucess: false,
    code: 404 as const,
    message: message ?? MESSAGE_NOT_FOUND,
  }
}
