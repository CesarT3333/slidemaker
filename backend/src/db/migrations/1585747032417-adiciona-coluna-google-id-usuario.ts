import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable
export class adicionaColunaGoogleIdUsuario1585747032417
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            ALTER TABLE "usuario"
                ADD COLUMN "google_id" text DEFAULT NULL NOT NULL
        `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            ALTER TABLE "usuario"
                DROP COLUMN "google_id"
        `);
  }

}
