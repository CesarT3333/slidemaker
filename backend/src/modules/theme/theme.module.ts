import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { GoogleDriveService } from '../../services/google-drive.service';
import { ThemeRepository } from '../../db/repository/theme.repository';
import { ThemeService } from '../../services/theme.service';
import { ThemeController } from './theme.controller';
import { Theme } from '../../db/models/theme';

@Module({
  imports: [
    ConfigModule, TypeOrmModule.forFeature([Theme, ThemeRepository])
  ],
  controllers: [ThemeController],
  providers: [
    ThemeService,
    GoogleDriveService
  ]
})
export class ThemeModule { }
