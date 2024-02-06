import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class TestFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const rowRes = exception.getResponse() as {
      message: string;
      statusCode: number;
    };

    res.status(statusCode).json({
      code: statusCode,
      message: rowRes?.message ?? exception.message,
      success: false,
      ronnie: 'yes',
    });
  }
}
