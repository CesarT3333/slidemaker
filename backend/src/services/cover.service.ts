import { Injectable } from '@nestjs/common';

import { CoverRepository } from '@repository/cover.repository';

@Injectable()
export class CoverService {

  constructor(
    private coverRepository: CoverRepository
  ) { }

}
