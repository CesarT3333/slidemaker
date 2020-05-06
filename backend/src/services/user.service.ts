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
          name: profile.name.givenName,
          familyName: profile.name.familyName,
        });

    }

  }

  async getIdByGoogleId(googleId: string): Promise<number> {

    const idUser: number = await this.userRepository
      .getIdByGoogleId(googleId)
      .then(user => user?.id);

    if (!idUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return idUser;
  }

  async getByGoogleId(googleId: string): Promise<User> {
    return await this.userRepository.getByGoogleId(googleId);
  }

  private async getCountByGoogleId(googleId: string): Promise<number> {
    return await this.userRepository.getCountByGoogleId(googleId);
  }

}
