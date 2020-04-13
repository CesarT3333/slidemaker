import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DataSourceTextPresentationDataType } from 'src/db/models/enum/data-source-text-presentation.enum';
import { DataSourceService } from 'src/services/data-source.service';
import { resources } from 'src/util/resources';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.DATA_SOURCES)
export class DataSourceController {

  constructor(
    private dataSourceService: DataSourceService
  ) { }

  @Get()
  getAll(): DataSourceTextPresentationDataType {
    console.log(this.dataSourceService.getAll());
    return this.dataSourceService.getAll();
  }

}
