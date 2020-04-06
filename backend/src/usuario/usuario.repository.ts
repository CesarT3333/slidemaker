import { Repository, EntityRepository } from 'typeorm';
import Usuario from '../db/models/usuario';

@EntityRepository(Usuario)
export class UsuarioRepository
    extends Repository<Usuario> {

    criaUsuario = async (usuario: Usuario) => {
        return await this.save(usuario);
    };

    buscaUsuarioPorIdGoogle = async (idGoogle: string) => {
        return await this.query(`
            SELECT COUNT(*) FROM usuario
                WHERE google_id = '${idGoogle}'
        `);
    }

}
