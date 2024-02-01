import {
  Inject,
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { OtherService } from './other/other.service';

@Injectable()
export class AppService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  @Inject(OtherService)
  private otherService: OtherService;

  getHello(): string {
    return 'Hello World!' + this.otherService.say();
  }

  onModuleInit() {
    console.log('app service onMoudleInit');
  }

  onApplicationBootstrap() {
    console.log('app service onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('app service onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('app service beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('app service onApplicationShutdown', signal);
  }
}
