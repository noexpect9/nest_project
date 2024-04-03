import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { user as UserModel } from '@prisma/client';
import { BaseController, successResponse } from '../base.controller';
import { ResponseFormat } from 'src/utils/responseFormat';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Auth } from '../decorator/auth.decorator';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/:id')
  // @UseGuards(AuthGuard('jwt'))
  @Auth()
  // jwt.strategy.ts 中 validate结果会保存到req请求数据中
  findOne(@Req() req: Request) {
    return req.user;
  }

  @Post('/insert')
  @ApiResponse({ status: 201, description: 'Created' })
  async signupUser(
    @Body() userData: { password: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Post('/list')
  @ApiResponse({ status: 200, description: 'success.' })
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
