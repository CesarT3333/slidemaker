import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePlanNames1589494521492
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      UPDATE "plans" set name = 'Enterprise'
        WHERE id = 2;
    `);

    await queryRunner.query(`
      UPDATE "plans" set name = 'Startup'
        WHERE id = 3;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
    UPDATE "plans" set name = 'enterprise'
      WHERE id = 2;
  `);

    await queryRunner.query(`
    UPDATE "plans" set name = 'startup'
      WHERE id = 3;
  `);
  }

}
