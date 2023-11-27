import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/userBase.module';
import { CorsMiddleware } from './cors.middleware';
@Module({
  imports: [UserModule], // 导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入
  controllers: [AppController], // 控制器
  providers: [AppService], // 服务提供者，处理具体的业务逻辑
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // 设置需要应用中间件的路由路径，此处为所有路由
  }
}
