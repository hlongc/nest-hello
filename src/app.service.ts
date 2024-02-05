import { Injectable } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CccService } from './ccc.service';

@Injectable()
export class AppService {
  constructor(
    private readonly bbbService: BbbService,
    private readonly cccService: CccService,
  ) {}

  getHello(): string {
    return (
      'Hello World!' + this.bbbService.bbbHello() + this.cccService.cccHello()
    );
  }
}
