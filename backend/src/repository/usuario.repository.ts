import { Repository, EntityRepository } from 'typeorm';

import Usuario from '../db/models/usuario';

@EntityRepository(Usuario)
export class UsuarioRepository
  extends Repository<Usuario> {

  recuperaUsuarioPorGoogleId =
    async (googleId: string): Promise<Usuario> => {
      return await this.findOne({ googleId: googleId });
    }

  criaUsuario = async (usuario: Usuario) => {
    return await this.save(usuario);
  };

  buscaUsuarioPorIdGoogle = async (googleId: string): Promise<number> => {
    return this.createQueryBuilder('usuario')
      .where({ googleId: googleId })
      .getCount();
  }

  recuperaIdUsuarioPorGoogleId = async (googleId: string): Promise<Usuario> => {
    return await this.findOne({
      select: ['id'],
      where: { googleId: googleId },
    });
  }

}
