// 依赖管理 入口
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, AuthModule, ArticleModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
}
