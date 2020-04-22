import { Injectable } from '@nestjs/common';

import { ThemeRepository } from '../db/repository/theme.repository';

@Injectable()
export class ThemeService {

  constructor(
    private themeRepository: ThemeRepository
  ) { }

  async getAll(): Promise<any> {
    return await this.themeRepository.find();
  }
}
