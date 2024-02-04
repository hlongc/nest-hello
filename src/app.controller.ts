import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Session,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './app.dto';
import { UserGuard } from './user.guard';
import { TimerInterceptor } from './timer.interceptor';

@Controller()
@UseGuards(UserGuard)
@UseInterceptors(TimerInterceptor)
@SetMetadata('roles', 'controller')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('roles', 'handler')
  getHello(@Headers('Host') host: string): string {
    console.log('Host:', host);
    return this.appService.getHello();
  }

  @Post('register')
  register(@Body() body: UserDto): string {
    console.log('Body:', body);
    return '注册成功';
  }

  @Get('session')
  session(@Session() session) {
    if (!session.count) {
      session.count = 0;
    }
    session.count++;
    console.log('Session:', session);
    return session.count;
  }
}
