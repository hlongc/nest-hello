import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { MyLogger } from './my-logger';

export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER_TOKEN';

@Global()
@Module({})
export default class WinstonModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new MyLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
