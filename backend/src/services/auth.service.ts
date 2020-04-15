import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { sign } from 'jsonwebtoken';

import { UserGooglePayload } from '../interfaces/user-google-pay-load';
import { UserService } from './user.service';

export enum Provider { GOOGLE = 'google' }

@Injectable()
export class AuthService {

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) { }

  async validateOAuthLogin(profile: UserGooglePayload, provider: Provider): Promise<string> {
    try {

      const profileId: string = profile.id;
      const secretJwt: string = this.configService.get('SECRET_JWT');
      this.userService.createByGooglePayload(profile);

      return sign(
        { profileId, provider },
        secretJwt,
        { expiresIn: 3600 }
      );

    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  processGoogleCallBack(request): string {
    const googleProfile = request.user;

    const payloadMessage: { jwt: string, profile: UserGooglePayload } = {
      jwt: googleProfile.jwt,
      profile: {
        displayName: googleProfile.profile.displayName,
        emails: googleProfile.profile.emails,
        name: googleProfile.profile.name,
        photos: googleProfile.profile.photos,
      }
    }

    if (googleProfile.jwt) {
      return this.htmlPostMessage(payloadMessage);
    } else {
      throw new BadRequestException();
    }

  }

  private htmlPostMessage(
    payloadMessage,
  ): string {

    const urlFrontend = this.configService.get<string>('URL_FRONTEND');

    return `
      <html><body>
        <script>
            window.opener.postMessage(
              ${JSON.stringify(payloadMessage)},
              '${urlFrontend}'
            );
        </script>
      </body></html>
    `;
  }

}
