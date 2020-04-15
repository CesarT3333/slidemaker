import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DataSourceService } from '../../services/data-source.service';
import { EnumClientData } from '../../db/models/enum-client-data';
import { resources } from '../../util/resources';

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
