import { Module } from '@nestjs/common';

import { ApresentacaoController } from './apresentacao.controller';

@Module({
    controllers: [ApresentacaoController]
})
export class ApresentacaoModule { }
