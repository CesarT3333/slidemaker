import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateCoverColumnInPresentation1588079335332
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "presentations"
        ADD COLUMN "id_cover" integer DEFAULT NULL
    `);

    await queryRunner.createForeignKey(
      'presentations',
      new TableForeignKey({
        name: 'fk_presentation_cover',
        columnNames: ['id_cover'],
        referencedColumnNames: ['id'],
        referencedTableName: 'covers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    // TODO:
  }
}
