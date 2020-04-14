import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DataSourceService } from 'src/services/data-source.service';
import { EnumClientData } from 'src/db/models/enum-client-data';
import { resources } from 'src/util/resources';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.DATA_SOURCES)
export class DataSourceController {

  constructor(
    private dataSourceService: DataSourceService
  ) { }

  @Get()
  getAll(): Array<EnumClientData> {
    return this.dataSourceService.getAll();
  }

}
