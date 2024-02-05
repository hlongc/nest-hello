import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TimeoutInterceptor } from './timeout.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('world')
  async getWorld(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return 'world';
  }

  @Get('hhh')
  getHhh(): string {
    return 'hhh';
  }

  @Get('timeout')
  @UseInterceptors(TimeoutInterceptor)
  async getTimeout(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return 'timeout';
  }
}
