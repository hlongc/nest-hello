import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';

@Module({
  imports: [PersonModule, OtherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
