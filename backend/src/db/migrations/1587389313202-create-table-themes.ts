import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableThemes1587389313202
  implements MigrationInterface {

  private table = new Table({
    name: 'themes',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
      {
        name: 'google_id_img',
        type: 'text',
        isNullable: false,
        isUnique: true
      },
      {
        name: 'google_id_presentation',
        type: 'text',
        isNullable: false,
        isUnique: true
      },
    ]
  });

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.createTable(this.table);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable(this.table);
  }

}
