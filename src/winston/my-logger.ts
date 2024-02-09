import { LoggerService } from '@nestjs/common';
import { createLogger, Logger, LoggerOptions } from 'winston';
import 'winston-daily-rotate-file';
import * as dayjs from 'dayjs';

export class MyLogger implements LoggerService {
  private logger: Logger;

  constructor(options: LoggerOptions) {
    this.logger = createLogger(options);
  }

  getDate() {
    return dayjs().format('YYYY/MM/DD HH:mm:ss');
  }

  log(message: string, context: string) {
    this.logger.log('info', message, { context, time: this.getDate() });
  }

  error(message: string, context: string) {
    this.logger.log('error', message, { context, time: this.getDate() });
  }

  warn(message: string, context: string) {
    this.logger.log('warn', message, { context, time: this.getDate() });
  }
}
