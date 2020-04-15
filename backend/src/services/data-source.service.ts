import { Injectable } from '@nestjs/common';

import { DataSourceTextPresentationEnum } from '../db/models/enum/data-source-text-presentation.enum';
import { EnumClientData } from '../db/models/enum-client-data';

@Injectable()
export class DataSourceService {

  getAll(): Array<EnumClientData> {
    return DataSourceTextPresentationEnum.getAllForClient();
  }

}
