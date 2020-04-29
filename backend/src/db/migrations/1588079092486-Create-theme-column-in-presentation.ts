import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateThemeColumnInPresentation1588079092486
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`
      ALTER TABLE "presentations"
        ADD COLUMN "id_theme" integer DEFAULT 9 NOT NULL
    `);

    await queryRunner.createForeignKey(
      'presentations',
      new TableForeignKey({
        name: 'fk_presentation_theme',
        columnNames: ['id_theme'],
        referencedColumnNames: ['id'],
        referencedTableName: 'themes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    // TODO:
  }
}
