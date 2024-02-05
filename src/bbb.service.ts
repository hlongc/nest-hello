import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CccService } from './ccc.service';

@Injectable()
export class BbbService {
  constructor(
    @Inject(forwardRef(() => CccService))
    private readonly cccService: CccService,
  ) {}

  bbb() {
    return 'bbb';
  }

  bbbHello() {
    return 'bbbHello' + this.cccService.cccHello();
  }
}
