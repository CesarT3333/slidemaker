import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnCreatedAtInThePresentation1588770209273
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE "presentations"
        ADD COLUMN created_at TIMESTAMP DEFAULT NOW() NOT NULL
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    // TODO:
  }

}
