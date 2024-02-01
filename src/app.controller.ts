import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  @UseInterceptors(TimeInterceptor)
  hello() {
    console.log('hello...');
    return 'hello';
  }

  @Get('world')
  @UseGuards(LoginGuard)
  world() {
    return 'world';
  }
}
