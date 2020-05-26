import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnIdGoogleInPresentation1590357291920
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE "presentations"
        ADD COLUMN id_google varchar
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    // TODO:
  }

}
