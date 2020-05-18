import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAttributesPlans1589235168523
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    const textForUpdateEnterprisePlan = [
      'Apresentações ilimitadas',
      'Configuração de Capa',
      'Apresentação em Português e Inglês',
      'Personalização de temas de apresentações',
    ].join(';');

    const textForUpdateStartupPlan = [
      'Configuração de Capa',
      'Apresentação em Português e Inglês',
      'Personalização de temas de apresentações',
    ].join(';');

    await queryRunner.query(`
      UPDATE "plans" set attributes = '${textForUpdateEnterprisePlan}'
        WHERE id = 2;
    `);

    await queryRunner.query(`
      UPDATE "plans" set attributes = '${textForUpdateStartupPlan}'
        WHERE id = 3;
    `);
  }

  async  down(queryRunner: QueryRunner): Promise<any> { }

}
