import { Injectable } from '@nestjs/common';

import { DataSourceTextPresentationEnum, DataSourceTextPresentationDataType } from 'src/db/models/enum/data-source-text-presentation.enum';

@Injectable()
export class DataSourceService {

  getAll(): DataSourceTextPresentationDataType {
    return DataSourceTextPresentationEnum.getAllForClient();
  }

}
