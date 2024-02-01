import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

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

  @Get('pipe')
  @UseFilters(TestFilter)
  num(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
}
