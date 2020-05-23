import { Injectable } from '@nestjs/common';

import { DataSourceTextPresentationEnum } from '@model/enum/data-source-text-presentation.enum';
import { EventProgressPresentationEnum } from '@model/enum/event-progress-presentation.enum';
import { PresentationProgressGateway } from './presentation-progress.gateway';
import { PresentationRepository } from '@repository/presentation.repository';
import { PresentationImagesService } from './presentation-images.service';
import { SentenceBoundaryService } from './sentence-boundary.service';
import { AlgorithmiaService } from './algorithmia.service';
import { KeywordsService } from './keywords.service';
import { Presentation } from '@model/presentation';
import { UserService } from './user.service';
import { TextService } from './text.service';

@Injectable()
export class PresentationService {

  constructor(
    private presentationRepository: PresentationRepository,
    private userService: UserService,

    private presentationProgressGateway: PresentationProgressGateway,
    private presentationImagesService: PresentationImagesService,
    private sentenceBoundaryService: SentenceBoundaryService,
    private algorithmiaService: AlgorithmiaService,
    private keywordsService: KeywordsService,
    private textService: TextService,
  ) { }

  async create(presentation: Presentation): Promise<any> {
    presentation.user = {
      ...await this.userService
        .getByGoogleId(presentation.user.googleId),
      authorizationToken: presentation.user.authorizationToken
    };

    await this.textIdentification(presentation);
    this.sanitilizeContentOfText(presentation);
    this.getTextSentences(presentation);
    await this.fetchKeywordsOfAllSentences(presentation);
    await this.fetcImageOfAllSentences(presentation);

    return await this.presentationRepository.save(presentation);
  }

  async getAllUserPresentation(googleId: string): Promise<Array<Presentation>> {
    return await this.presentationRepository.getAllUserPresentation(googleId);
  }

  async getById(id: number): Promise<Presentation> {
    return await this.presentationRepository.getById(id);
  }

  private async textIdentification(presentation: Presentation): Promise<void> {

    if (presentation.dataSource === DataSourceTextPresentationEnum.WIKIPEDIA) {

      this.presentationProgressGateway.emitProgressToClient(
        presentation.user,
        EventProgressPresentationEnum.FETCH_CONTENT_WIKIPEDIA
      );

      await this.algorithmiaService.fetchContentFromWikipedia(presentation);
    }
  }

  private sanitilizeContentOfText(presentation: Presentation): void {
    this.presentationProgressGateway.emitProgressToClient(
      presentation.user,
      EventProgressPresentationEnum.CLEAN_TEXT
    );

    this.textService.sanitilizeContent(presentation);
  }

  private getTextSentences(presentation: Presentation): void {
    this.presentationProgressGateway.emitProgressToClient(
      presentation.user,
      EventProgressPresentationEnum.SENTENCES_DETECTION
    );

    this.sentenceBoundaryService.getTextSentences(presentation);
  }

  private async fetchKeywordsOfAllSentences(presentation: Presentation): Promise<void> {
    this.presentationProgressGateway.emitProgressToClient(
      presentation.user,
      EventProgressPresentationEnum.IDENTIFYING_KEYWORDS
    );

    await this.keywordsService.fetchKeywordsOfAllSentences(presentation);
  }

  private async fetcImageOfAllSentences(presentation: Presentation): Promise<void> {
    this.presentationProgressGateway.emitProgressToClient(
      presentation.user,
      EventProgressPresentationEnum.SEARCHING_IMAGE
    );

    await this.presentationImagesService.fetcImageOfAllSentences(presentation);
  }
}
