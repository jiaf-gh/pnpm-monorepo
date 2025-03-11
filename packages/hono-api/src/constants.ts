export const TIMEOUT_MS = 15000 as const

export enum SWAGGER_TAG {
  USERS = 'Users',
}

export const MESSAGE_VALIDATION_ERROR = 'Validation error.' as const
export const MESSAGE_NOT_FOUND = 'Content not found.' as const
export const MESSAGE_USER_NOT_FOUND = 'User not found.' as const
export const MESSAGE_USER_NOT_CREATED = 'User was not created.' as const