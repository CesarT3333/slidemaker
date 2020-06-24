import { MigrationInterface, QueryRunner } from 'typeorm';
import { BillingPlanEnum } from '@model/enum/billing-plan.enum';

export class AddFreePlan1591055031139 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    const freePlan = {
      id: 4,
      name: 'free',
      description: 'Para quem quer algo simples com diversos recursos automáticos ou até mesmo ' +
        'conhecer a plataforma',
      cost: 0.0,
      attributes: '3 apresentações gratuitas;15 slides por apresentação;' +
        'Configuração de Capa;' +
        'Apresentação em Português e Inglês;' +
        'Personalização de temas de apresentações',
      billingType: BillingPlanEnum.PRESENTATION,
    };

    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('plans')
      .values(freePlan)
      .execute();

  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM presentations WHERE id = 4');
  }

}
