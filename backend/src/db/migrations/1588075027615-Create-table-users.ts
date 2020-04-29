import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1588075027615
  implements MigrationInterface {

  private table = new Table({
    name: 'users',
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
        length: '255',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'family_name',
        type: 'varchar',
        length: '255',
        isUnique: false,
        isNullable: true
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'google_id',
        type: 'text',
        isUnique: true,
        isNullable: false,
      }
    ],
  });

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }

}
