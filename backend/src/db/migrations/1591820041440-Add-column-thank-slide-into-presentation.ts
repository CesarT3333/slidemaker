import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnThankSlideIntoPresentation1591820041440
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "presentations"
        ADD COLUMN thank_slide boolean DEFAULT true NOT NULL
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "presentations"
        DROP column thank_slide;
    `);
  }

}
