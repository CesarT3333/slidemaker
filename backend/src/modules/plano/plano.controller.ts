import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PlanoService } from '../../services/plano.service';
import { resources } from 'src/util/resources';

@Controller(resources.PLANOS)
export class PlanoController {

    constructor(
        private readonly planoService: PlanoService
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    buscaPlanos() {
        return this.planoService.buscarTodos();
    }

}