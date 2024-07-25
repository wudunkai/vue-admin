import { isAbsolute, join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';

import configuration from './config/index';

import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';

import { RedisModule } from './common/libs/redis/redis.module';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 服务静态化, 生产环境最好使用 nginx 做资源映射， 可以根据环境配置做区分
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const fileUploadLocationConfig =
          config.get<string>('app.file.location') || '../upload';
        const rootPath = isAbsolute(fileUploadLocationConfig)
          ? `${fileUploadLocationConfig}`
          : join(process.cwd(), `${fileUploadLocationConfig}`);
        return [
          {
            rootPath,
            exclude: [`${config.get('app.prefix')}`],
            serveRoot: config.get('app.file.serveRoot'),
            serveStaticOptions: {
              cacheControl: true,
            },
          },
        ] as ServeStaticModuleOptions[];
      },
    }),
    // // libs redis
    // RedisModule.forRootAsync(
    //   {
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: (config: ConfigService) => {
    //       return {
    //         closeClient: true,
    //         readyLog: true,
    //         errorLog: true,
    //         config: config.get<RedisClientOptions>('redis'),
    //       };
    //     },
    //   },
    //   true,
    // ),
    // 系统基础模块
    UserModule,
    AuthModule,
  ],
  // app module 守卫，两个守卫分别依赖 UserService、PermService, 而 UserService、PermService 没有设置全局模块，
  // 所以这俩 守卫 不能再 main.ts 设置全局守卫
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
