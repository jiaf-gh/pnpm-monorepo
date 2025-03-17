export const TIMEOUT_MS = 3000 as const

export enum SWAGGER_TAG {
  USERS = 'Users',
}

export const MESSAGE_TIMED_OUT = 'Operation timed out. Try again later.' as const
export const MESSAGE_ROUTE_NOT_FOUND = 'Route not found.' as const
export const MESSAGE_INTERNAL_SERVER_ERROR = 'Internal server error.' as const
export const MESSAGE_VALIDATION_ERROR = 'Validation error.' as const
export const MESSAGE_CONTENT_NOT_FOUND = 'Content not found.' as const

export const MESSAGE_USER_POST_SUCCESS = 'User created.' as const
export const MESSAGE_USER_POST_ERROR = 'Could not creat user.' as const
export const MESSAGE_USER_GET_SUCCESS = 'User found.' as const
export const MESSAGE_USER_GET_ERROR = 'Could not find user.' as const
export const MESSAGE_USER_UPDATE_SUCCESS = 'User updated.' as const
export const MESSAGE_USER_UPDATE_ERROR = 'Could not update user.' as const
export const MESSAGE_USER_DELETE_SUCCESS = 'User deleted.' as const
export const MESSAGE_USER_DELETE_ERROR = 'Could not delete user.' as const
