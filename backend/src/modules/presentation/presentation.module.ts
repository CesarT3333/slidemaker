import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PresentationRepository } from '../../db/repository/presentation.repository';
import { PresentationService } from '../../services/presentation.service';
import { PresentationController } from './presentation.controller';
import { Presentation } from '../../db/models/presentation';

@Module({
  imports: [
    TypeOrmModule.forFeature([Presentation, PresentationRepository])
  ],
  controllers: [PresentationController],
  providers: [PresentationService]
})
export class PresentationModule { }
