import { MigrationInterface, QueryRunner } from "typeorm";

import Plano from '../models/plano';

export class adicionaPlanos1586275530682
    implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("plano")
            .values(<Array<Plano>>[
                {
                    nome: 'startup',
                    descricao:
                        'Escolha a quantidade de apresentações que você precisa. ' +
                        'O preço varia pela quantidade de slides que vocẽ deseja',
                    atributos: 'Configuração de Capa;Apresentação em Português',
                    quantitativoDescricao: 'Por Apresentação',
                    quantitativoQuantidade: 5,
                    valor: 0.1
                },
                {
                    nome: 'pro',
                    quantitativoQuantidade: 10,
                    quantitativoDescricao: 'Por mês',
                    descricao: 'Apresentações ilimitadas para todas as horas, com a quantidade' +
                        ' de slides que voê deseja',
                    atributos: 'Apresentações ilimitadas;Configuração de Capa;Apresentação em Português',
                    valor: 0.1
                },
                {
                    nome: 'enterprise',
                    quantitativoQuantidade: 15,
                    quantitativoDescricao: 'Por mês',
                    descricao:
                        'A ferramenta completa para todos os tipos de apresentações' +
                        ' de slides que voê deseja',
                    atributos:
                        'Apresentações ilimitadas;' +
                        'Configuração de Capa;' +
                        'Apresentação em Português, Espanhol e Inglês;' +
                        'Personalização de plano de fundo dos slides;',
                    valor: 0.1
                }
            ]).execute()
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('TRUNCATE TABLE plano');
    }

}
