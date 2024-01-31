import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  getName() {
    return `I'm cat`;
  }
}
