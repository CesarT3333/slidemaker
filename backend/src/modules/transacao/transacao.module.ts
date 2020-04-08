import { Module } from '@nestjs/common';

import { AssinaturaUsuarioModule } from '../assinatura/assinatura-usuario.module';
import { TransacaoService } from '../../services/transacao.service';
import { TransacaoController } from './transacao.controller';

// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        AssinaturaUsuarioModule
        // TypeOrmModule.forFeature([
        //     Transacao,
        //     TransacaoRepository
        // ])
    ],
    controllers: [TransacaoController],
    providers: [TransacaoService],
})
export class TransacaoModule { }