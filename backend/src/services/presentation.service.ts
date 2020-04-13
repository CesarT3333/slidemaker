import { Injectable } from '@nestjs/common';

import { PresentationRepository } from 'src/db/repository/presentation.repository';
import { Presentation } from 'src/db/models/presentation';

@Injectable()
export class PresentationService {

  constructor(
    private presentationRepository: PresentationRepository
  ) { }

  create(presentation: Presentation) {
    this.presentationRepository.save(presentation);
  }

}
