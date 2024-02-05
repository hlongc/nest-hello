import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BbbService } from './bbb.service';

@Injectable()
export class CccService {
  constructor(
    @Inject(forwardRef(() => BbbService))
    private readonly bbbService: BbbService,
  ) {}

  cccHello() {
    return 'cccHello' + this.bbbService.bbb();
  }
}
