import { EntityRepository, Repository } from 'typeorm';

import { Theme } from '@model/theme';

@EntityRepository(Theme)
export class ThemeRepository
  extends Repository<Theme> { }
