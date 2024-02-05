import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa.module';
import { BbbService } from './bbb.service';
import { CccService } from './ccc.service';

@Module({
  imports: [forwardRef(() => AaaModule)],
  controllers: [AppController],
  providers: [AppService, BbbService, CccService],
})
export class AppModule {}
