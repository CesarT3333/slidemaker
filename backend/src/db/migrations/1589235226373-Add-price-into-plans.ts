import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriceIntoPlans1589235226373
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      UPDATE "plans" set cost = 14.99
        WHERE id = 2;
    `);

    await queryRunner.query(`
      UPDATE "plans" set cost = 4.99
        WHERE id = 3;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('UPDATE "plans" set cost = 0;');
  }

}
