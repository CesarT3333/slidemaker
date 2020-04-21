import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateThemeColumnInPresentationTable1587419626144
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`
      ALTER TABLE "presentation"
        ADD COLUMN "id_theme" integer DEFAULT 9 NOT NULL
    `);

    await queryRunner.createForeignKey(
      'presentation',
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
  }

}
