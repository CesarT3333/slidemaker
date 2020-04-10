import { Repository, EntityRepository } from 'typeorm';

import Plano from '../db/models/plano';

@EntityRepository(Plano)
export class PlanoRepository
    extends Repository<Plano> {

}