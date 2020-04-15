import { Injectable } from '@nestjs/common';

import { IdiomEnum } from '../db/models/enum/idiom.enum';

@Injectable()
export class IdiomService {

  getAll() {
    return IdiomEnum.getAllForCLientTest();
  }

}
