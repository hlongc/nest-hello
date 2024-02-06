import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new BadRequestException();
  }

  @Post('user')
  create(@Body(new ValidationPipe()) user: UserDto) {
    return user;
  }
}
