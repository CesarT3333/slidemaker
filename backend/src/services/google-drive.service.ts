import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';

import { folderThemesId } from '../util/google.constants';
import { Theme } from '../db/models/theme';

@Injectable()
export class GoogleDriveService {

  constructor(
    private configService: ConfigService
  ) { }

  getAllThemes(): Promise<any> {
    this.getAllPresentations();
    return google.drive('v3').files.list({
      auth: this.configService.get('GOOGLE_API_KEY'),
      fields: 'files(*)',
      q: `'${folderThemesId}' in parents`
    }).then(responseGoogle => responseGoogle.data.files.map(f => f.id));
  }

  async getAllPresentations(): Promise<any> {
    return await google.drive('v3').files.list({
      auth: this.configService.get('GOOGLE_API_KEY'),
      fields: 'files(*)',
      q: `'18h4BYqMZaZtINBE4CLk_DCcWuAwb__j0' in parents`
    }).then((responseGoogle): Array<Theme> => {
      return responseGoogle.data.files.map(f => (
        {
          name: f.name,
          googleIdPresentation: f.id,
          googleIdImg: '',
        }
      ));
    });

  }
}
