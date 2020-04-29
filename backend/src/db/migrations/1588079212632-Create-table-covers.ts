import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCovers1588079212632
  implements MigrationInterface {

  private table = new Table({
    name: 'covers',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'title',
        type: 'varchar',
        length: '150',
        isNullable: false,
        isUnique: false
      },
      {
        name: 'sub_title',
        type: 'varchar',
        length: '150',
        isNullable: true,
        isUnique: false
      }
    ]
  });

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.createTable(this.table);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable(this.table);
  }

}
