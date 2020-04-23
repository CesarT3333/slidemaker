import { Injectable } from '@nestjs/common';

import { DataSourceTextPresentationEnum } from '@model/enum/data-source-text-presentation.enum';
import { EnumClientData } from '@model/enum-client-data';

@Injectable()
export class DataSourceService {

  getAll(): Array<EnumClientData> {
    return DataSourceTextPresentationEnum.getAllForClient();
  }

}
