import { Controller, UseGuards, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { EnumClientData } from 'src/db/models/enum-client-data';
import { IdiomService } from 'src/services/idiom.service';
import { resources } from 'src/util/resources';

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
