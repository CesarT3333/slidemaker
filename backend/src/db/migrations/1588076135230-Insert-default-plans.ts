import { MigrationInterface, QueryRunner } from 'typeorm';

import { BillingPlanEnum } from '@model/enum/billing-plan.enum';
import Plan from '@model/plan';

export class InsertDefaultPlans1588076135230
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {

    const plans: Array<any> = [
      {
        id: 1,
        name: 'pro',
        description: 'Apresentações ilimitadas para todas as horas, com a quantidade' +
          ' de slides que voê deseja',
        cost: 0.0,
        attributes: 'Apresentações ilimitadas;Configuração de Capa;Apresentação em Português',
        billingType: BillingPlanEnum.MONTH,
      },
      {
        id: 2,
        name: 'enterprise',
        description:
          'A ferramenta completa para todos os tipos de apresentações' +
          ' de slides que voê deseja',
        cost: 0.0,
        attributes:
          'Apresentações ilimitadas;' +
          'Configuração de Capa;' +
          'Apresentação em Português, Espanhol e Inglês;' +
          'Personalização de plano de fundo dos slides',
        billingType: BillingPlanEnum.MONTH,
      },
      {
        id: 3,
        name: 'startup',
        description:
          'Escolha a quantidade de apresentações que você precisa. ' +
          'O preço varia pela quantidade de slides que vocẽ deseja',
        cost: 0.0,
        attributes: 'Configuração de Capa;Apresentação em Português',
        billingType: BillingPlanEnum.PRESENTATION,
      },
    ];

    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('plans')
      .values(plans)
      .execute();

  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE plans');
  }

}
