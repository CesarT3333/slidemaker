import { EntityRepository, Repository } from 'typeorm';

import { AssinaturaUsuario } from '../db/models/assinatura-usuario';
import Usuario from '../db/models/user';

@EntityRepository(AssinaturaUsuario)
export class AssinaturaUserRepository
  extends Repository<AssinaturaUsuario> {

  buscaAssinaturaUsuario = async (usuario: Usuario) => {
    return this.createQueryBuilder('assinaturas')
      .leftJoinAndSelect('assinaturas.usuario', 'usuario')
      .leftJoinAndSelect('assinaturas.plano', 'plano')
      .where('usuario.googleId = :googleId',
        { googleId: usuario.googleId })
      .getOne();
  }

  buscarTodas = async () => {
    return await this.createQueryBuilder('assinaturas')
      .leftJoinAndSelect('assinaturas.usuario', 'usuario')
      .leftJoinAndSelect('assinaturas.plano', 'plano')
      .getMany();
  }

  criaAssinatura = async (assinatura: AssinaturaUsuario) => {
    return await this.save(assinatura);

  }

}
