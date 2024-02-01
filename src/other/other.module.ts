import { Global, Module } from '@nestjs/common';
import { OtherService } from './other.service';

// 申明为全局模块，一旦在某个模块中引入过一次，那么其他模块使用时不需要再次引入
@Global()
@Module({
  providers: [OtherService],
  exports: [OtherService],
})
export class OtherModule {}
