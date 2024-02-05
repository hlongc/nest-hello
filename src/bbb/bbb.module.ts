import { Module, DynamicModule } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

@Module({})
export class BbbModule {
  static register(options: Record<string, any>): DynamicModule {
    // 可以根据传入的options返回动态的模块
    return {
      module: BbbModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        BbbService,
      ],
      controllers: [BbbController],
      exports: [],
    };
  }
}
