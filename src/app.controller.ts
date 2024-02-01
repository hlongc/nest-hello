import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CatService } from './cat/cat.service';
import { OtherService } from './other/other.service';

@Controller()
export class AppController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  // constructor(private readonly appService: AppService) {}

  // 属性注入和构造器注入是一样的效果
  @Inject(AppService)
  private readonly appService: AppService;

  @Inject('cat_service')
  private readonly catService: CatService;

  @Inject('userinfo')
  private readonly user: { name: string; age: number };

  @Inject('info')
  private readonly info: { name: string; age: number };

  @Inject('mix')
  private readonly mix: { name: string; info: string };

  @Inject(OtherService)
  private readonly otherService: OtherService;

  @Get()
  getHello(): string {
    console.log(this.info);
    return (
      this.appService.getHello() +
      this.catService.getName() +
      ' ' +
      JSON.stringify(this.user) +
      this.otherService.say()
    );
  }

  onModuleInit() {
    console.log('app controller onMoudleInit');
  }

  onApplicationBootstrap() {
    console.log('app controller onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('app contoller onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('app controller beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('app controller onApplicationShutdown', signal);
  }
}
