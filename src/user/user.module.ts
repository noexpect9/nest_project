import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller'

@Global()
@Module({
  providers: [PrismaService, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {
  constructor(private readonly userService: UserService) {
    this.userService.user({ id: 1 });
  }
}