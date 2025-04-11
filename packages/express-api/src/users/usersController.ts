import type { APIResponse, User } from '@pnpm-monorepo/models'
import type { UserCreationParams } from './usersService'
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  Tags,
} from 'tsoa'
import { UsersService } from './usersService'

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
      @Path() userId: number,
  ): Promise<APIResponse<User>> {
    return new UsersService().get(userId)
  }

  @Post()
  public async createUser(
      @Body() requestBody: UserCreationParams,
  ): Promise<APIResponse<User>> {
    return new UsersService().create(requestBody)
  }
}