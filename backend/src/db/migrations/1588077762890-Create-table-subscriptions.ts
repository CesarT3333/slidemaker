import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableSubscriptions1588077762890
  implements MigrationInterface {

  private table = new Table({
    name: 'subscriptions',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'amount_presentation',
        type: 'integer',
        isNullable: true,
        isUnique: false
      },
      {
        name: 'id_user',
        type: 'integer',
        isNullable: false,
        isUnique: false
      },
      {
        name: 'id_plan',
        type: 'integer',
        isNullable: false,
        isUnique: false
      }
    ]
  });

  async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKey(
      'subscriptions',
      new TableForeignKey({
        name: 'fk_subscription_user',
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));

    await queryRunner.createForeignKey(
      'subscriptions',
      new TableForeignKey({
        name: 'fk_assinatura_plan',
        columnNames: ['id_plan'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plans',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
