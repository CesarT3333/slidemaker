import { Injectable } from '@nestjs/common';

import { PresentationRepository } from '../db/repository/presentation.repository';
import { Presentation } from '../db/models/presentation';
import { UserService } from './user.service';
import User from '../db/models/user';

@Injectable()
export class PresentationService {


  constructor(
    private presentationRepository: PresentationRepository,
    private usuarioService: UserService
  ) { }

  async create(presentation: Presentation): Promise<Presentation> {
    presentation.user = await this.usuarioService
      .getByGoogleId(presentation.user.googleId);
    console.log(presentation);
    return await this.presentationRepository.save(presentation);
  }

  async getAllUserPresentation(googleId: string): Promise<Array<Presentation>> {
    return await this.presentationRepository.getAllUserPresentation(googleId);
  }

}
