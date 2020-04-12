import { Injectable, NotFoundException } from '@nestjs/common';

import { UserGooglePayload } from '../interfaces/user-google-pay-load';
import { UserRepository } from '../repository/user.repository';
import User from '../db/models/user';

@Injectable()
export class UserService {

  constructor(
    private userRepository: UserRepository
  ) { }

  async criaUsuarioPorPayloadGoogle(profile: UserGooglePayload): Promise<any> {

    if (await this.usuarioNaoPossuiCadastro(profile.id)) {

      const usuario: User = {
        googleId: profile.id,
        email: profile.emails[0].value,
        nome: profile.name.givenName,
        sobreNome: profile.name.familyName,
        createdAt: new Date()
      }

      return this.userRepository.criaUsuario(usuario);

    }

  }

  async recuperaIdUsuarioPorGoogleId(googleId: string): Promise<number> {

    const idUsuario: number = await this.userRepository
      .recuperaIdUsuarioPorGoogleId(googleId)
      .then(usuario => usuario?.id);

    if (!idUsuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return idUsuario;
  }

  async recuperaUsuarioPorGoogleId(googleId: string): Promise<User> {
    return await this.userRepository
      .recuperaUsuarioPorGoogleId(googleId);
  }

  private async usuarioNaoPossuiCadastro(idGoogle: string): Promise<boolean> {
    const quantidadeUsuariosComEsseId = await this.userRepository
      .buscaUsuarioPorIdGoogle(idGoogle);
    console.log(quantidadeUsuariosComEsseId);
    return !quantidadeUsuariosComEsseId;
  }

}
