import type { User } from '@pnpm-monorepo/models'
import database from '../database'

export type UserCreationParams = Pick<User, 'name' | 'email'>

export class UsersService {
  public async get(id: number): Promise<User> {
    const user = await database.user.findUnique({ where: { id } })
    if (!user) {
      throw new Error('Could not find user.')
    }
    return user
  }

  public async create(userCreationParams: UserCreationParams): Promise<User> {
    const created = await database.user.create({
      data: {
        ...userCreationParams,
        profile: { create: { bio: 'I like turtles' } },
      },
    })
    if (!created) {
      throw new Error('Could not create user.')
    }
    return created
  }
}