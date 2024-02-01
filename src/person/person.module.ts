import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { OtherModule } from 'src/other/other.module';

@Module({
  imports: [OtherModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
