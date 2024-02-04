import { Get, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserGuard } from './user.guard';
import { Combine, Custom, MyHeaders, MyQuery, Test } from './custom.decorator';

@Test('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Custom('admin')
  @UseGuards(UserGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Combine('hello', 'admin1')
  getHello2(
    @MyQuery('name') name: string,
    @MyQuery('age', ParseIntPipe) age: number,
    @MyHeaders('host') host: string,
  ): string {
    console.log('name', name);
    console.log('host', host);
    console.log('age', age);
    return this.appService.getHello();
  }
}
