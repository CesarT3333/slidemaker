import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// tslint:disable
export class createTableUsers1585402919006
  implements MigrationInterface {

  private table = new Table({
    name: 'usuario',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'nome',
        type: 'varchar',
        length: '255',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'sobre_nome',
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
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }

}
