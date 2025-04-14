import type { User } from '@pnpm-monorepo/models'
import {
  APICodes,
  APIError,
  APIMessages,
  APIResponse,
} from '@pnpm-monorepo/models'
import database from '../database'

export type UserCreationParams = Pick<User, 'name' | 'email'>

export class UsersService {
  public async get(id: number): Promise<APIResponse<User>> {
    const user = await database.user.findUnique({ where: { id } })
    if (!user) {
      throw new APIError(APIMessages.USER_GET_ERROR, { code: APICodes.NOT_FOUND })
    }
    return APIResponse.success({ message: APIMessages.USER_GET_SUCCESS, data: user })
  }

  public async create(userCreationParams: UserCreationParams): Promise<APIResponse<User>> {
    const created = await database.user.create({
      data: {
        ...userCreationParams,
        profile: { create: { bio: 'I like turtles' } },
      },
    })
    return APIResponse.success({
      code: APICodes.CREATED,
      message: APIMessages.USER_CREATE_SUCCESS,
      data: created,
    })
  }
}
