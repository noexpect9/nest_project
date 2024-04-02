import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService, private prisma: PrismaService) {
    super({
      // 解析用户请求头中的token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 加密秘钥
      secretOrKey: process.env.APP_TOKEN_SECRET,
    })
  }

  // 验证
  async validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}