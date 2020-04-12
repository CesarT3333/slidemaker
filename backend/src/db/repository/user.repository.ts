import { Repository, EntityRepository } from 'typeorm';

import User from '../models/user';

@EntityRepository(User)
export class UserRepository
  extends Repository<User> {

  getByGoogleId =
    async (googleId: string): Promise<User> => {
      return await this.findOne({ googleId: googleId });
    }

  getCountByGoogleId = async (googleId: string): Promise<number> => {
    return this.createQueryBuilder('user')
      .where({ googleId: googleId })
      .getCount();
  }

  getIdByGoogleId = async (googleId: string): Promise<User> => {
    return await this.findOne({
      select: ['id'],
      where: { googleId: googleId },
    });
  }

}
