import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';
import { CatService } from './cat/cat.service';

@Module({
  imports: [PersonModule, OtherModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'cat_service',
      useClass: CatService,
    },
    {
      provide: 'userinfo',
      useValue: {
        name: 'ronnie',
        age: 28,
      },
    },
    {
      provide: 'info',
      useFactory() {
        return {
          name: 'hlongc',
          age: 28,
        };
      },
    },
    {
      provide: 'mix',
      inject: ['userinfo', 'cat_service'],
      useFactory(
        userinfo: { name: string; age: number },
        catService: CatService,
      ) {
        console.log(userinfo, catService);
        return {
          name: userinfo.name,
          info: catService.getName(),
        };
      },
    },
  ],
})
export class AppModule {}
