import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TransacaoService } from '../../services/transacao.service';
import { Transacao } from '../../db/models/transacao';
import { resources } from '../../util/resources';
import Usuario from '../../db/models/usuario';

@Controller(resources.TRANSACOES)
export class TransacaoController {

    constructor(
        private transacaoService: TransacaoService
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    registraTransacao(@Req() request) {
        const transacao: Transacao = request.body;
        transacao.usuario = <Usuario>{ googleId: request.user.profileId }
        this.transacaoService.registraTransacao(transacao);
    }

}
