import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CatService } from './cat/cat.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // 属性注入和构造器注入是一样的效果
  @Inject(AppService)
  private readonly appService: AppService;

  @Inject('cat_service')
  private readonly catService: CatService;

  @Inject('userinfo')
  private readonly user: { name: string; age: number };

  @Inject('info')
  private readonly info: { name: string; age: number };

  @Inject('mix')
  private readonly mix: { name: string; info: string };

  @Get()
  getHello(): string {
    console.log(this.info);
    return (
      this.appService.getHello() +
      this.catService.getName() +
      ' ' +
      JSON.stringify(this.user)
    );
  }
}
