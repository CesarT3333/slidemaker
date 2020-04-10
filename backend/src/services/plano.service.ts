import { Injectable } from '@nestjs/common';

import { PlanoRepository } from '../repository/plano.repository';
import Plano from '../db/models/plano';

@Injectable()
export class PlanoService {

    constructor(
        private readonly planoRepository: PlanoRepository
    ) { }

    buscarTodos(): Promise<Array<Plano>> {
        return this.planoRepository.find();
    }

    // buscarTodos = async (idGoogle: string) => {
    //     return await this.createQueryBuilder().getA();
    // }
}
