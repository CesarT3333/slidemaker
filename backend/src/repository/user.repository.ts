import { Repository, EntityRepository } from 'typeorm';

import User from '../db/models/user';

@EntityRepository(User)
export class UserRepository
  extends Repository<User> {

  recuperaUsuarioPorGoogleId =
    async (googleId: string): Promise<User> => {
      return await this.findOne({ googleId: googleId });
    }

  criaUsuario = async (user: User) => {
    return await this.save(user);
  };

  buscaUsuarioPorIdGoogle = async (googleId: string): Promise<number> => {
    return this.createQueryBuilder('user')
      .where({ googleId: googleId })
      .getCount();
  }

  recuperaIdUsuarioPorGoogleId = async (googleId: string): Promise<User> => {
    return await this.findOne({
      select: ['id'],
      where: { googleId: googleId },
    });
  }

}
