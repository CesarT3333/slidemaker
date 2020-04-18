import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GoogleDriveService } from '../../services/google-drive.service';
import { ThemeService } from '../../services/theme.service';
import { ThemeController } from './theme.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ThemeController],
  providers: [
    ThemeService,
    GoogleDriveService
  ]
})
export class ThemeModule { }
