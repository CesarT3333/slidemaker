import { Injectable } from '@nestjs/common';

import { AssinaturaUsuarioService } from './assinatura-usuario.service';
import { Transacao } from '../db/models/transacao';

@Injectable()
export class TransacaoService {

    constructor(
        private assinaturaService: AssinaturaUsuarioService,
        // private transacaoRepository: TransacaoRepository
    ) { }

    registraTransacao(transacao: Transacao): void {
        // TODO: Cenário futuro
        this.assinaturaService.criaAssinaturaPor(transacao);
    }

}
