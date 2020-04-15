import { Controller, UseGuards, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { EnumClientData } from '../../db/models/enum-client-data';
import { IdiomService } from '../../services/idiom.service';
import { resources } from '../../util/resources';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.IDIOMS)
export class IdiomController {

  constructor(
    private idiomService: IdiomService
  ) { }

  @Get()
  getAll(): Array<EnumClientData> {
    return this.idiomService.getAll();
  }

}
