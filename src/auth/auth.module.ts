import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';

@Module({
  exports: [AuthService],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
