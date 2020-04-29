import { Repository, EntityRepository } from 'typeorm';

import { Cover } from '@model/cover';

@EntityRepository(Cover)
export class CoverRepository
  extends Repository<Cover> {

}
