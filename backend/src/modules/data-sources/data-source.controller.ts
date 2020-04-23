import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { resources } from '../../util/resources';
import { DataSourceService } from '@services/data-source.service';
import { EnumClientData } from '@model/enum-client-data';

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
