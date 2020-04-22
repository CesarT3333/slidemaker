import { EntityRepository, Repository } from 'typeorm';

import { Theme } from '../models/theme';

@EntityRepository(Theme)
export class ThemeRepository
  extends Repository<Theme> { }
