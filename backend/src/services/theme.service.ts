import { Injectable } from '@nestjs/common';

import { ThemeRepository } from '@repository/theme.repository';

@Injectable()
export class ThemeService {

  constructor(
    private themeRepository: ThemeRepository
  ) { }

  async getAll(): Promise<any> {
    return await this.themeRepository.find();
  }

  async getImageNameBy(themeId: number): Promise<string> {
    const theme = await this.themeRepository
      .getImageNameBy(themeId);

    return theme.imageName;
  }

}
