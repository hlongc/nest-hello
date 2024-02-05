import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  @Inject(AppService)
  private readonly appService: AppService;

  private readonly logger = new Logger(TimerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 通过app.useGlobalInterceptors(new TimerInterceptor());全局使用时，会报错，因为默认全局使用时，不会注入service
    this.appService.getHello();
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Request ${request.url} took: ${Date.now() - startTime}ms`,
        );
      }),
    );
  }
}
