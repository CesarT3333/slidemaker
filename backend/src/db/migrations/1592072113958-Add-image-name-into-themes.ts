import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageNameIntoThemes1592072113958
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "themes"
        ADD COLUMN image_name VARCHAR;`
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "themes"
        DROP column image_name;`
    );
  }

}
