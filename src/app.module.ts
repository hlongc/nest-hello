import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';

@Module({
  imports: [BbbModule.register({ a: 1, b: 2 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
