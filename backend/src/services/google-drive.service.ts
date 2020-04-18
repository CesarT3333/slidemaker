import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';

import { folderThemesId } from '../util/google.constants';

@Injectable()
export class GoogleDriveService {

  constructor(
    private configService: ConfigService
  ) { }

  getAllThemes(): Promise<any> {
    return google.drive('v3').files.list({
      auth: this.configService.get('GOOGLE_API_KEY'),
      fields: 'files(*)',
      q: `'${folderThemesId}' in parents`
    }).then(responseGoogle => responseGoogle.data.files.map(f => f.id));
  }
}
