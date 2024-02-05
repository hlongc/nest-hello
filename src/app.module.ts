import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimerInterceptor } from './timer.interceptor';
import { MapInterceptor } from './map.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // 全局使用拦截器
      provide: APP_INTERCEPTOR,
      useClass: TimerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MapInterceptor,
    },
  ],
})
export class AppModule {}
