import { Injectable } from '@nestjs/common';

import { UserSignatureRepository } from '../db/repository/user-signature.repository';
import { UserSignature } from '../db/models/user-signature';
import { UserService } from './user.service';
import User from '../db/models/user';

@Injectable()
export class UserSignatureService {

  constructor(
    private userSignatureRepository: UserSignatureRepository,
    private userService: UserService
  ) { }

  async buscarTodos(): Promise<Array<UserSignature>> {
    return await this.userSignatureRepository.buscarTodas();
  }

  async buscaAssinaturaUsuario(user: User): Promise<UserSignature> {
    return this.userSignatureRepository.buscaAssinaturaUsuario(user);
  }

  async criaAssinatura(assinatura: UserSignature): Promise<any> {

    const idUsuario: number = await this.userService
      .getIdByGoogleId(assinatura.usuario.googleId);

    assinatura.usuario.id = idUsuario;

    return this.userSignatureRepository.criaAssinatura(assinatura);
  }

}
