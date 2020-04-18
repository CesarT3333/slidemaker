import { Injectable } from '@nestjs/common';

import { GoogleDriveService } from './google-drive.service';

@Injectable()
export class ThemeService {

  constructor(
    private googleDriveService: GoogleDriveService
  ) { }

  async getAll(): Promise<any> {
    return await this.googleDriveService.getAllThemes();
  }
}
