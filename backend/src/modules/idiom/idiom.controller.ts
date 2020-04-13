import { Controller, UseGuards, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IdiomService } from 'src/services/idiom.service';
import { resources } from 'src/util/resources';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.IDIOMS)
export class IdiomController {

  constructor(
    private idiomService: IdiomService
  ) { }

  @Get()
  getAll() {
    return this.idiomService.getAll();
  }

}
