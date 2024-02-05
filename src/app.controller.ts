import {
  Controller,
  Get,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
  HttpStatus,
  ParseArrayPipe,
  Param,
  ParseEnumPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AppService } from './app.service';

enum LevelEnum {
  A = '1',
  B = '2',
  C = '3',
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('int')
  getInt(@Query('num', ParseIntPipe) num: number): number {
    return num;
  }

  @Get('float')
  getFloat(@Query('num', ParseFloatPipe) num: number): number {
    return num;
  }

  @Get('boolean')
  getBoolean(
    @Query(
      'input',
      new ParseBoolPipe({
        errorHttpStatusCode: HttpStatus.GONE,
      }),
    )
    input: boolean,
  ): boolean {
    return input;
  }

  @Get('array')
  getArray(
    @Query(
      'list',
      new ParseArrayPipe({
        items: Number, // 指定每一项的类型
        separator: ',', // 指定分隔符
        optional: true, // 是否可选
      }),
    )
    list: number[] = [],
  ): number {
    return list.reduce((memo, cur) => memo + cur, 0);
  }

  @Get('enum/:num')
  getEnum(
    @Param('num', new ParseEnumPipe(LevelEnum)) num: LevelEnum,
  ): LevelEnum {
    return num;
  }

  @Get('default')
  getDefault(
    @Query('name', new DefaultValuePipe(`I'm default value`)) name: string,
  ): string {
    return name;
  }
}
