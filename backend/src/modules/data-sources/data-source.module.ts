import { Module } from '@nestjs/common';

import { DataSourceService } from '@services/data-source.service';
import { DataSourceController } from './data-source.controller';

@Module({
  controllers: [DataSourceController],
  providers: [DataSourceService]
})
export class DataSourceModule { }
