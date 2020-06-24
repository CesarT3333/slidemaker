import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { GoogleDriveService } from '@services/google-drive.service';
import { ThemeRepository } from '@repository/theme.repository';
import { ThemeService } from '@services/theme.service';
import { ThemeController } from './theme.controller';
import { Theme } from '@model/theme';

@Module({
  imports: [
    ConfigModule, TypeOrmModule.forFeature([Theme, ThemeRepository])
  ],
  controllers: [ThemeController],
  providers: [
    ThemeService,
    GoogleDriveService
  ],
  exports: [ThemeService]
})
export class ThemeModule { }
