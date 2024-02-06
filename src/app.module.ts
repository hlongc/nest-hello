import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VALIDATE_OPTIONS } from './common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: VALIDATE_OPTIONS,
      useValue: {
        a: 1,
        b: 2,
      },
    },
  ],
})
export class AppModule {}
