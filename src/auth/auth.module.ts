import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          //设置加密使用的 secret
          secret: process.env.APP_TOKEN_SECRET,
          //过期时间
          signOptions: { expiresIn: '300d' },
        };
      },
    })
  ]
})
export class AuthModule { }
