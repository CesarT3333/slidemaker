import { Repository, EntityRepository } from 'typeorm';
import Plan from '../db/models/plan';

@EntityRepository(Plan)
export class PlanRepository
    extends Repository<Plan> {

}