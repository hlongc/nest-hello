import {
  SetMetadata,
  Get,
  applyDecorators,
  UseGuards,
  createParamDecorator,
  ExecutionContext,
  Controller,
} from '@nestjs/common';
import { UserGuard } from './user.guard';
import { Request } from 'express';

export const Custom = (...args: string[]) => SetMetadata('custom', args);

export const Test = (path: string) => Controller(path);

// 将多个装饰器组合成一个
export const Combine = (path: string, role: any) => {
  return applyDecorators(Get(path), Custom(role), UseGuards(UserGuard));
};

export const MyQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.query[data];
  },
);

export const MyHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return data ? request.headers[data] : request.headers;
  },
);
