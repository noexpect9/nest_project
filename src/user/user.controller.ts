import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { user as UserModel } from '@prisma/client';
import { BaseController, successResponse } from '../base.controller';
import { ResponseFormat } from 'src/utils/responseFormat';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Post('/insert')
  @ApiResponse({ status: 201, description: 'Created' })
  async signupUser(
    @Body() userData: { password: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Post('/list')
  @ApiResponse({ status: 200, description: 'success.'})
  @ResponseFormat(200, 'success')
  async listUser(): Promise<UserModel[]> {
    const user = await this.userService.users({});
    return user
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; email?: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}