import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: '用户名必须是邮箱' })
  email: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}