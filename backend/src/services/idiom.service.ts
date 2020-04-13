import { Injectable } from '@nestjs/common';

import { IdiomEnum } from 'src/db/models/enum/idiom.enum';

@Injectable()
export class IdiomService {

  getAll() {
    return IdiomEnum.getAllForCLientTest();
  }

}
