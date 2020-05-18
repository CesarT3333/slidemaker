import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintUserIntoSubscription1589544910836
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE "subscriptions"
        ADD CONSTRAINT uq_user_signature UNIQUE (id_user)
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE "subscriptions"
        DROP CONSTRAINT uq_user_signature;
    `);
  }

}
