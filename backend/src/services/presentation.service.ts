import { Injectable } from '@nestjs/common';

import { DataSourceTextPresentationEnum } from '@model/enum/data-source-text-presentation.enum';
import { EventProgressPresentationEnum } from '@model/enum/event-progress-presentation.enum';
import { PresentationProgressGateway } from './presentation-progress.gateway';
import { PresentationRepository } from '@repository/presentation.repository';
import { PresentationImagesService } from './presentation-images.service';
import { SentenceBoundaryService } from './sentence-boundary.service';
import { BillingPlanEnum } from '@model/enum/billing-plan.enum';
import { SubscriptionService } from './subscription.service';
import { GoogleDriveService } from './google-drive.service';
import { AlgorithmiaService } from './algorithmia.service';
import { KeywordsService } from './keywords.service';
import { Subscription } from '@model/subscription';
import { Presentation } from '@model/presentation';
import { UserService } from './user.service';
import { TextService } from './text.service';

@Injectable()
export class PresentationService {

  constructor(
    private presentationRepository: PresentationRepository,
    private userService: UserService,

    private subscriptionService: SubscriptionService,
    private googleDriveService: GoogleDriveService,

    private presentationProgressGateway: PresentationProgressGateway,
    private presentationImagesService: PresentationImagesService,
    private sentenceBoundaryService: SentenceBoundaryService,
    private algorithmiaService: AlgorithmiaService,
    private keywordsService: KeywordsService,
    private textService: TextService,
  ) { }

  async create(presentation: Presentation): Promise<any> {

    await this.retrieveUserId(presentation);
    await this.textIdentification(presentation);
    this.sanitilizeContentOfText(presentation);
    this.getTextSentences(presentation);
    await this.fetchKeywordsOfAllSentences(presentation);
    await this.fetcImageOfAllSentences(presentation);

    // await this.googleDriveService.createPresentation(presentation);

    await this.updateUserSubscription(presentation);

    return await this.presentationRepository.save(presentation);
  }

  private async updateUserSubscription(presentation: Presentation): Promise<any> {
    const userSubscription: Subscription =
      await this.subscriptionService.getForLoggedInUser(presentation.user);

    if (userSubscription.plan.billingType === BillingPlanEnum.PRESENTATION) {
      userSubscription.amountPresentation -= 1;
      this.subscriptionService.create(userSubscription);
    }
  }

  async getAllUserPresentation(googleId: string): Promise<Array<Presentation>> {
    return await this.presentationRepository.getAllUserPresentation(googleId);
  }

  async getById(id: number): Promise<Presentation> {
    return await this.presentationRepository.getById(id);
  }

  private async retrieveUserId(presentation: Presentation): Promise<void> {
    const idUser: number = await this.userService
      .getIdByGoogleId(presentation.user.googleId);
    presentation.user.id = idUser;
  }

  private async textIdentification(presentation: Presentation): Promise<void> {

    if (presentation.dataSource === DataSourceTextPresentationEnum.WIKIPEDIA) {

      this.presentationProgressGateway.emitProgressToClient(
        presentation.user,
        EventProgressPresentationEnum.FETCH_CONTENT_WIKIPEDIA
      );

      await this.algorithmiaService.fetchContentFromWikipedia(presentation);
    } else {

      this.presentationProgressGateway.emitProgressToClient(
        presentation.user,
        EventProgressPresentationEnum.READ_TEXT_USER
      );

      presentation.textToSanitize = presentation.text;
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
