import { EntityRepository, Repository } from 'typeorm';

import { UserSignature } from '@model/user-signature';
import User from '@model/user';

@EntityRepository(UserSignature)
export class UserSignatureRepository
  extends Repository<UserSignature> {

  getForLoggedInUser = async (user: User) => {
    return this.createQueryBuilder('assinaturas')
      .leftJoinAndSelect('assinaturas.usuario', 'usuario')
      .leftJoinAndSelect('assinaturas.plano', 'plano')
      .where('usuario.googleId = :googleId',
        { googleId: user.googleId })
      .getOne();
  }

}
