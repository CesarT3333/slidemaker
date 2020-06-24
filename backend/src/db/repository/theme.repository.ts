import { EntityRepository, Repository } from 'typeorm';

import { Theme } from '@model/theme';

@EntityRepository(Theme)
export class ThemeRepository
  extends Repository<Theme> {

  getImageNameBy = async (themeId: number): Promise<Theme> => {
    return await this.findOne({
      select: ['imageName'],
      where: { id: `${themeId}` },
    });
  }
}
