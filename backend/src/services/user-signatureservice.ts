import { Injectable } from '@nestjs/common';

import { UserSignatureRepository } from '@repository/user-signature.repository';
import { UserSignature } from '@model/user-signature';
import { UserService } from './user.service';
import User from '@model/user';

@Injectable()
export class UserSignatureService {

  constructor(
    private userSignatureRepository: UserSignatureRepository,
    private userService: UserService
  ) { }

  async getForLoggedInUser(user: User): Promise<UserSignature> {
    return this.userSignatureRepository.getForLoggedInUser(user);
  }

  async create(signature: UserSignature): Promise<any> {

    const idUsuario: number = await this.userService
      .getIdByGoogleId(signature.usuario.googleId);

    signature.usuario.id = idUsuario;

    return this.userSignatureRepository.save(signature);
  }

}
