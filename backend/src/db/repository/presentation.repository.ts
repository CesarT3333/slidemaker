import { Repository, EntityRepository } from 'typeorm';

import { Presentation } from '../models/presentation';

@EntityRepository(Presentation)
export class PresentationRepository
  extends Repository<Presentation> {

}
