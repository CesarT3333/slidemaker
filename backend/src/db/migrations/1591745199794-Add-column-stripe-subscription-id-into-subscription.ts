import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnStripeSubscriptionIdIntoSubscription1591745199794
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE "subscriptions"
        ADD COLUMN stripe_subscription_id VARCHAR
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE "subscriptions"
        DROP column stripe_subscription_id;
    `);
  }

}
