import { Repository, EntityRepository } from 'typeorm';
import Plan from '../models/plan';

@EntityRepository(Plan)
export class PlanRepository
    extends Repository<Plan> {

}
