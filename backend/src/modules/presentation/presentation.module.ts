import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PresentationProgressGateway } from '@services/presentation-progress.gateway';
import { PresentationImagesService } from '@services/presentation-images.service';
import { SentenceBoundaryService } from '@services/sentence-boundary.service';
import { PresentationRepository } from '@repository/presentation.repository';
import { PresentationService } from '@services/presentation.service';
import { GoogleDriveService } from '@services/google-drive.service';
import { PresentationController } from './presentation.controller';
import { AlgorithmiaService } from '@services/algorithmia.service';
import { KeywordsService } from '@services/keywords.service';
import { TextService } from '@services/text.service';
import { CoverModule } from '../cover/cover.module';
import { Presentation } from '@model/presentation';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    CoverModule,
    ConfigModule,
    TypeOrmModule.forFeature([Presentation, PresentationRepository])
  ],
  controllers: [PresentationController],
  providers: [
    PresentationService,
    PresentationProgressGateway,

    GoogleDriveService,

    PresentationImagesService,
    SentenceBoundaryService,
    AlgorithmiaService,
    KeywordsService,
    TextService
  ]
})
export class PresentationModule { }
