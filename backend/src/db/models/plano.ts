import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TipoCobrancaPlanoEnum } from './enum/tipo-cobranca-plano.enum';

@Entity({ name: 'planos' })
export default class Plano {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    valor: number;

    @Column()
    atributos: string;

    @Column({ name: 'tipo_cobranca' })
    tipoCobrancaPlano: TipoCobrancaPlanoEnum;

}
