import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PresentationRepository } from '../../db/repository/presentation.repository';
import { PresentationService } from '../../services/presentation.service';
import { PresentationController } from './presentation.controller';
import { Presentation } from '../../db/models/presentation';
import { UserModule } from '../usuario/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Presentation, PresentationRepository])
  ],
  controllers: [PresentationController],
  providers: [PresentationService]
})
export class PresentationModule { }
