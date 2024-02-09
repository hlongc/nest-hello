import { Module } from '@nestjs/common';
import { format, transports } from 'winston';
import * as chalk from 'chalk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import WinstonModule from './winston/winston.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      format: format.combine(format.colorize(), format.simple()),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);
              return `${appStr} ${time} ${level} ${contextStr} ${message}`;
            }),
          ),
        }),
        new transports.DailyRotateFile({
          level: 'info',
          dirname: 'logs',
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
