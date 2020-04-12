import { EntityRepository, Repository } from 'typeorm';

import { UserSignature } from '../models/user-signature';
import Usuario from '../models/user';

@EntityRepository(UserSignature)
export class UserSignatureRepository
  extends Repository<UserSignature> {

  getForLoggedInUser = async (usuario: Usuario) => {
    return this.createQueryBuilder('assinaturas')
      .leftJoinAndSelect('assinaturas.usuario', 'usuario')
      .leftJoinAndSelect('assinaturas.plano', 'plano')
      .where('usuario.googleId = :googleId',
        { googleId: usuario.googleId })
      .getOne();
  }

}
