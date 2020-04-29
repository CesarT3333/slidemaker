import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePlans1588075374331
  implements MigrationInterface {

  private table = new Table({
    name: 'plans',
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
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'description',
        type: 'text',
        isUnique: false,
        isNullable: true
      },
      {
        name: 'cost',
        type: 'decimal',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'attributes',
        type: 'varchar',
        length: '300',
        default: '0.0',
        isNullable: false,
        isUnique: false
      },
      {
        name: 'billing_type',
        type: 'text',
        isNullable: false,
        isUnique: false
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
