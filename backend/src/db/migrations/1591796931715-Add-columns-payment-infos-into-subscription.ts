import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsPaymentInfosIntoSubscription1591796931715
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "subscriptions"
        ADD COLUMN original_amount_presentation integer
    `);

    await queryRunner.query(`
      ALTER TABLE "subscriptions"
        ADD COLUMN amount_paid decimal
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "subscriptions"
        DROP column original_amount_presentation;
    `);

    await queryRunner.query(`
      ALTER TABLE "subscriptions"
        DROP column amount_paid;
    `);
  }

}
