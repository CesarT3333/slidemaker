import { Module } from '@nestjs/common';

import { ConfigurationService } from '@services/configuration.service';
import { ConfigurationController } from './configuration.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ConfigurationController],
  providers: [ConfigurationService]
})
export class ConfigurationModule { }
