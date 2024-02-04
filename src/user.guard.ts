import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classMetaData = this.reflector.get('roles', context.getClass());
    const handlerMetaData = this.reflector.get('roles', context.getHandler());
    console.log('guard classMetaData:', classMetaData);
    console.log('guard handlerMetaData:', handlerMetaData);

    return true;
  }
}
