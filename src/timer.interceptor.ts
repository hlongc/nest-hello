import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const classMetaData = this.reflector.get('roles', context.getClass());
    const handlerMetaData = this.reflector.get('roles', context.getHandler());
    console.log('interceptor classMetaData:', classMetaData);
    console.log('interceptor handlerMetaData:', handlerMetaData);

    return next.handle();
  }
}
