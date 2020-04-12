import { Injectable } from '@nestjs/common';

import { AssinaturaUserRepository } from '../repository/assinatura-usuario.repository';
import { AssinaturaUsuario } from '../db/models/assinatura-usuario';
import { UserService } from './user.service';
import User from '../db/models/user';

@Injectable()
export class AssinaturaUsuarioService {

  constructor(
    private assinaturaUserRepository: AssinaturaUserRepository,
    private userService: UserService
  ) { }

  async buscarTodos(): Promise<Array<AssinaturaUsuario>> {
    return await this.assinaturaUserRepository.buscarTodas();
  }

  async buscaAssinaturaUsuario(user: User): Promise<AssinaturaUsuario> {
    return this.assinaturaUserRepository.buscaAssinaturaUsuario(user);
  }

  async criaAssinatura(assinatura: AssinaturaUsuario): Promise<any> {

    const idUsuario: number = await this.userService
      .recuperaIdUsuarioPorGoogleId(assinatura.usuario.googleId);

    assinatura.usuario.id = idUsuario;

    return this.assinaturaUserRepository.criaAssinatura(assinatura);
  }

}
