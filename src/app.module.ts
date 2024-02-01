import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { CatService } from './cat/cat.service';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'cat_service',
      useClass: CatService,
    },
    {
      provide: 'userinfo',
      useValue: {
        name: 'ronnie',
        age: 28,
      },
    },
    {
      provide: 'info',
      useFactory() {
        return {
          name: 'hlongc',
          age: 28,
        };
      },
    },
    {
      provide: 'mix',
      inject: ['userinfo', 'cat_service'],
      useFactory(
        userinfo: { name: string; age: number },
        catService: CatService,
      ) {
        console.log(userinfo, catService);
        return {
          name: userinfo.name,
          info: catService.getName(),
        };
      },
    },
  ],
})
export class AppModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    console.log('app module onMoudleInit');
  }

  onApplicationBootstrap() {
    console.log('app module onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('app module onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('app module beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('app module onApplicationShutdown', signal);
    // this.moduleRef为当前模块的引用，get方法传入对应provider的token，获取到实例
    const catService = this.moduleRef.get<CatService>('cat_service');
    console.log('----', catService.getName());
  }
}
