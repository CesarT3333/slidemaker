import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CoverImageService } from '@services/cover-image.service';
import { CoverRepository } from '@repository/cover.repository';
import { CoverService } from '@services/cover.service';
import { CoverController } from './cover.controller';
import { ThemeModule } from '../theme/theme.module';
import { Cover } from '@model/cover';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cover, CoverRepository]),
    ThemeModule
  ],
  controllers: [CoverController],
  providers: [
    CoverService,
    CoverImageService
  ],
  exports: [
    CoverService
  ]
})
export class CoverModule { }
