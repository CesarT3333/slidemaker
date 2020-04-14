import { Injectable } from '@nestjs/common';

import { PresentationRepository } from '../db/repository/presentation.repository';
import { Presentation } from '../db/models/presentation';

@Injectable()
export class PresentationService {

  constructor(
    private presentationRepository: PresentationRepository
  ) { }

  async create(presentation: Presentation) {
    return await this.presentationRepository.save(presentation);
  }

}
