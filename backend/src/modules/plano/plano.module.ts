import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PlanoRepository } from '../../repository/plano.repository';
import { PlanoService } from '../../services/plano.service';
import { PlanoController } from './plano.controller';
import Plano from '../../db/models/plano';

@Module({
    imports: [
        TypeOrmModule.forFeature([Plano, PlanoRepository])
    ],
    controllers: [PlanoController],
    providers: [PlanoService],
    exports: [PlanoService]
})
export class PlanoModule { }
