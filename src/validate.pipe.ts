import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { VALIDATE_OPTIONS } from './common';

@Injectable()
export class MyValidatePipe implements PipeTransform {
  @Optional()
  @Inject(VALIDATE_OPTIONS)
  private readonly options: Record<string, any>;

  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('options', this.options);
    if (!metatype) {
      return value;
    }
    const ins = plainToClass(metatype, value);
    const errors = await validate(ins);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }
}
