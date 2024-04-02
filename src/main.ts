import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // 创建nest实例
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Api example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Api/V1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
