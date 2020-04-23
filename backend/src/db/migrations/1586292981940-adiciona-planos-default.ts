import { MigrationInterface, QueryRunner } from 'typeorm';

import { TipoCobrancaPlanoEnum } from '../models/enum/tipo-cobranca-plano.enum';
import Plan from '../models/plan';

// tslint:disable
export class adicionaPlanosDefault1586292981940
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {

    const planos: Array<Plan> = [
      {
        nome: 'pro',
        descricao: 'Apresentações ilimitadas para todas as horas, com a quantidade' +
          ' de slides que voê deseja',
        atributos: 'Apresentações ilimitadas;Configuração de Capa;Apresentação em Português',
        tipoCobrancaPlano: TipoCobrancaPlanoEnum.POR_MES,
        valor: 0.0
      },
      {
        nome: 'enterprise',
        descricao:
          'A ferramenta completa para todos os tipos de apresentações' +
          ' de slides que voê deseja',
        atributos:
          'Apresentações ilimitadas;' +
          'Configuração de Capa;' +
          'Apresentação em Português, Espanhol e Inglês;' +
          'Personalização de plano de fundo dos slides',
        tipoCobrancaPlano: TipoCobrancaPlanoEnum.POR_MES,
        valor: 0.0
      },
      {
        nome: 'startup',
        descricao:
          'Escolha a quantidade de apresentações que você precisa. ' +
          'O preço varia pela quantidade de slides que vocẽ deseja',
        atributos: 'Configuração de Capa;Apresentação em Português',
        tipoCobrancaPlano: TipoCobrancaPlanoEnum.POR_APRESENTACAO,
        valor: 0.0
      },
    ];

    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('planos')
      .values(planos)
      .execute();

  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE planos');
  }

}
