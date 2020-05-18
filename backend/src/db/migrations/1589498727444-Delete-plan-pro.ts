import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeletePlanPro1589498727444
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      DELETE FROM "plans"
        WHERE id = 1;
    `);
  }

  async down(_: QueryRunner): Promise<any> { }

}
