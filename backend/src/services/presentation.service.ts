import { Injectable } from '@nestjs/common';

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

    this.presentationProgressGateway.emitProgressToClient(presentation.user, 10);
    await this.algorithmiaService.fetchContentFromWikipedia(presentation);

    this.presentationProgressGateway.emitProgressToClient(presentation.user, 25);
    this.textService.sanitilizeContent(presentation);

    this.presentationProgressGateway.emitProgressToClient(presentation.user, 40);
    this.sentenceBoundaryService.getTextSentences(presentation);

    this.presentationProgressGateway.emitProgressToClient(presentation.user, 55);
    await this.keywordsService.fetchKeywordsOfAllSentences(presentation);

    this.presentationProgressGateway.emitProgressToClient(presentation.user, 70);
    await this.presentationImagesService.fetcImageOfAllSentences(presentation);

    console.log(presentation);

    return await this.presentationRepository.save(presentation);
  }

  async getAllUserPresentation(googleId: string): Promise<Array<Presentation>> {
    return await this.presentationRepository.getAllUserPresentation(googleId);
  }

  async getById(id: number): Promise<Presentation> {
    return await this.presentationRepository.getById(id);
  }

}
