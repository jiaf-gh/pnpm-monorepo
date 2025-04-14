export enum APICodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_ERROR = 500,
}

export enum APIMessages {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  USER_GET_ERROR = 'USER_GET_ERROR',
  USER_GET_SUCCESS = 'USER_GET_SUCCESS',
  USER_CREATE_ERROR = 'USER_CREATE_ERROR',
  USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS',
}

export class APIError extends Error {
  code?: APICodes
  details?: unknown

  constructor(
    message: APIMessages,
    options?: { code?: APICodes, details?: unknown },
  ) {
    super(message)
    Object.setPrototypeOf(this, APIError.prototype)
    this.code = options?.code
    this.details = options?.details
  }
}

export class APIResponse<Data = never> {
  code: APICodes
  success: boolean
  timestamp: Date
  message?: APIMessages
  details?: unknown
  data?: Data

  private constructor(options: {
    code: APICodes
    success: boolean
    message?: APIMessages
    details?: unknown
    data?: Data
  }) {
    this.code = options.code
    this.success = options.success
    this.timestamp = new Date()
    this.message = options.message
    this.details = options.details
    this.data = options.data
  }

  static success<Data = never>(options?: {
    code?: APICodes
    message?: APIMessages
    data?: Data
  },
  ): APIResponse<Data> {
    return new APIResponse<Data>({
      code: options?.code ?? APICodes.OK,
      success: true,
      message: options?.message,
      data: options?.data,
    })
  }

  static error(options?: {
    code?: APICodes
    message?: APIMessages
    details?: unknown
  },
  ): APIResponse<never> {
    return new APIResponse<never>({
      code: options?.code ?? APICodes.INTERNAL_ERROR,
      success: false,
      message: options?.message || APIMessages.INTERNAL_SERVER_ERROR,
      details: options?.details,
    })
  }
}
