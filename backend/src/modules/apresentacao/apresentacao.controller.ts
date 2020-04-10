import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { resources } from '../../util/resources';

@Controller(resources.APRESENTACOES)
export class ApresentacaoController {

    @Get()
    @UseGuards(AuthGuard('jwt'))
    testerequest() { }

}
