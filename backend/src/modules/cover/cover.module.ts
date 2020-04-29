import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CoverRepository } from '@repository/cover.repository';
import { CoverService } from '@services/cover.service';
import { Cover } from '@model/cover';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cover, CoverRepository]),
  ],
  providers: [CoverService]
})
export class CoverModule { }
