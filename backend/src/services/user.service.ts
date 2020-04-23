import { Injectable, NotFoundException } from '@nestjs/common';

import { UserGooglePayload } from '../interfaces/user-google-pay-load';
import { UserRepository } from '@repository/user.repository';
import User from '@model/user';

@Injectable()
export class UserService {

  constructor(
    private userRepository: UserRepository
  ) { }

  async createByGooglePayload(profile: UserGooglePayload): Promise<any> {

    const unregisteredUser =
      !(await this.getCountByGoogleId(profile.id));

    if (unregisteredUser) {

      return await this.userRepository.save(
        <User>{
          googleId: profile.id,
          email: profile.emails[0].value,
          nome: profile.name.givenName,
          sobreNome: profile.name.familyName,
          createdAt: new Date()
        });

    }

  }

  async getIdByGoogleId(googleId: string): Promise<number> {

    const idUsuario: number = await this.userRepository
      .getIdByGoogleId(googleId)
      .then(usuario => usuario?.id);

    if (!idUsuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return idUsuario;
  }

  async getByGoogleId(googleId: string): Promise<User> {
    return await this.userRepository.getByGoogleId(googleId);
  }

  private async getCountByGoogleId(googleId: string): Promise<number> {
    return await this.userRepository.getCountByGoogleId(googleId);
  }

}
