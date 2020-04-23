import { Injectable } from '@nestjs/common';

import { IdiomEnum } from '@model/enum/idiom.enum';

@Injectable()
export class IdiomService {

  getAll() {
    return IdiomEnum.getAllForCLientTest();
  }

}
