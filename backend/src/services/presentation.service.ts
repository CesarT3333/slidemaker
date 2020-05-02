import { Injectable } from '@nestjs/common';

import { PresentationRepository } from '@repository/presentation.repository';
import { Presentation } from '@model/presentation';
import { UserService } from './user.service';

@Injectable()
export class PresentationService {

  constructor(
    private presentationRepository: PresentationRepository,
    private userService: UserService
  ) { }

  async create(presentation: Presentation): Promise<Presentation> {
    presentation.user = await this.userService
      .getByGoogleId(presentation.user.googleId);
    return await this.presentationRepository.save(presentation);
  }

  async getAllUserPresentation(googleId: string): Promise<Array<Presentation>> {
    return await this.presentationRepository.getAllUserPresentation(googleId);
  }

}
