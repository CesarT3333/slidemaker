import { Injectable } from '@nestjs/common';

import { HttpPaymentRequiredException } from 'src/util/exception/http-payment-required.exception';
import { DataSourceTextPresentationEnum } from '@model/enum/data-source-text-presentation.enum';
import { EventProgressPresentationEnum } from '@model/enum/event-progress-presentation.enum';
import { PresentationProgressGateway } from './presentation-progress.gateway';
import { SubscriptionStatusEnum } from '@model/enum/subscription-status.enum';
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
import User from '@model/user';

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

    this.retrieveUserId(presentation);
    await this.validateUserSubscription(presentation);
    await this.textIdentification(presentation);
    this.sanitilizeContentOfText(presentation);
    this.getTextSentences(presentation);
    // await this.fetchKeywordsOfAllSentences(presentation);
    await this.fetcImageOfAllSentences(presentation);

    await this.googleDriveService.createPresentation(presentation);

    await this.updateUserSubscription(presentation);

    return await this.presentationRepository.save(presentation);
  }

  async deletePresentation(user: User, idPresentation: number): Promise<any> {
    const presentation = await this.presentationRepository.findOne(idPresentation);
    presentation.user = user;

    return this.googleDriveService.deletePresentation(presentation)
      .catch(error => console.log(error))
      .finally(() => this.presentationRepository.delete(idPresentation));

  }

  private async updateUserSubscription(presentation: Presentation): Promise<any> {
    const userSubscription: Subscription =
      await this.subscriptionService.getForLoggedInUser(presentation.user);

    if (userSubscription.plan.billingType === BillingPlanEnum.PRESENTATION) {
      userSubscription.amountPresentation -= 1;

      if (userSubscription.amountPresentation === 0) {
        userSubscription.status = SubscriptionStatusEnum.REPPROVED;
      }

      this.subscriptionService.save(userSubscription);
    }
  }

  private async validateUserSubscription(presentation: Presentation) {
    const userSubscription: Subscription =
      await this.subscriptionService.getForLoggedInUser(presentation.user);

    if (userSubscription.status === SubscriptionStatusEnum.REPPROVED) {
      throw new HttpPaymentRequiredException();
    }

  }

  async getAllUserPresentation(googleId: string, googleAccessToken: string): Promise<Array<Presentation>> {
    const userPresentations: Array<Presentation> =
      await this.presentationRepository.getAllUserPresentation(googleId);

    for (let count = 0; userPresentations.length > count; count++) {

      try {
        await this.googleDriveService.getPresentationByIdGoogle(
          userPresentations[count].idGoogle,
          googleAccessToken
        );

        userPresentations[count].deletedOfGoogle = false;

      } catch {
        userPresentations[count].deletedOfGoogle = true;
      }
    }

    return userPresentations.filter(p => p.deletedOfGoogle === false);

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
