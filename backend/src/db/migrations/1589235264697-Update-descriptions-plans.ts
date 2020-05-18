import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDescriptionsPlans1589235264697
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {

    const newDescription = 'Escolha a quantidade que você precisa. ' +
      'O preço varia pela quantidade de apresentações que vocẽ escolhe';

    await queryRunner.query(`
        UPDATE "plans" set description = '${newDescription}'
          WHERE id = 3;
      `);
  }

  async down(_: QueryRunner): Promise<any> { }

}
