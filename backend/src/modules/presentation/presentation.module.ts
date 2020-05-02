import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PresentationRepository } from '@repository/presentation.repository';
import { PresentationService } from '@services/presentation.service';
import { PresentationController } from './presentation.controller';
import { CoverModule } from '../cover/cover.module';
import { UserModule } from '../user/user.module';
import { Presentation } from '@model/presentation';

@Module({
  imports: [
    UserModule,
    CoverModule,
    TypeOrmModule.forFeature([Presentation, PresentationRepository])
  ],
  controllers: [PresentationController],
  providers: [PresentationService]
})
export class PresentationModule { }
