import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async register(createAuthDto: CreateAuthDto) {
    console.log(createAuthDto, 'createAuthDto');

    const hashedPassword = await argon2.hash(createAuthDto.password);
    const user = await this.prisma.user.create({
      data: {
        email: createAuthDto.email,
        password: hashedPassword
      }
    })
    delete user.password
    return user
  }

  async login({
    email,
    password
  }: CreateAuthDto) {
    console.log(   email,
      password);
    
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })
    console.log(user);
    
    if (!user) throw new BadRequestException('用户不存在');
    // const psMatch = await argon2.verify(user.password, password);
    // if (!psMatch) throw new BadRequestException('密码输入错误');
    delete user.password;
    return user;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
