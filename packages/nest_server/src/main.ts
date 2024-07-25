import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './path/to/your/interceptor';
import { HttpExceptionFilter } from './path/to/your/filter';

async function bootstrap() {
  // 创建 app
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // 全局使用管道，用于 Controller 层参数校验
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true, // 开发环境
      disableErrorMessages: false,
      forbidUnknownValues: false,
    }),
  );
  // 全局注册的响应过滤器
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('vue-admin 接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/swagger', app, document);

  console.log(
    `Swagger UI is available at http://localhost:${3000}/api/swagger`,
  );
  await app.listen(3000);
}
bootstrap();
