import { Injectable, NotFoundException } from '@nestjs/common';

import { UserGooglePayload } from '../interfaces/user-google-pay-load';
import { UsuarioRepository } from '../repository/usuario.repository';
import Usuario from '../db/models/usuario';

@Injectable()
export class UsuarioService {

  constructor(
    private usuarioRepository: UsuarioRepository
  ) { }

  async criaUsuarioPorPayloadGoogle(profile: UserGooglePayload): Promise<any> {

    if (await this.usuarioNaoPossuiCadastro(profile.id)) {

      const usuario: Usuario = {
        googleId: profile.id,
        email: profile.emails[0].value,
        nome: profile.name.givenName,
        sobreNome: profile.name.familyName,
        createdAt: new Date()
      }

      return this.usuarioRepository.criaUsuario(usuario);

    }

  }

  async recuperaIdUsuarioPorGoogleId(googleId: string): Promise<number> {

    const idUsuario: number = await this.usuarioRepository
      .recuperaIdUsuarioPorGoogleId(googleId)
      .then(usuario => usuario?.id);

    if (!idUsuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return idUsuario;
  }

  async recuperaUsuarioPorGoogleId(googleId: string): Promise<Usuario> {
    return await this.usuarioRepository
      .recuperaUsuarioPorGoogleId(googleId);
  }

  private async usuarioNaoPossuiCadastro(idGoogle: string): Promise<boolean> {
    const quantidadeUsuariosComEsseId = await this.usuarioRepository
      .buscaUsuarioPorIdGoogle(idGoogle);
    console.log(quantidadeUsuariosComEsseId);
    return !quantidadeUsuariosComEsseId;
  }

}
