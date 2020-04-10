import { Repository, EntityRepository } from 'typeorm';

import { Transacao } from '../db/models/transacao';

@EntityRepository(Transacao)
export class TransacaoRepository
    extends Repository<Transacao> {

}