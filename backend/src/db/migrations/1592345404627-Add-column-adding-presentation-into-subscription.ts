import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnAddingPresentationIntoSubscription1592345404627
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "subscriptions"
        ADD COLUMN adding_presentation integer
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "subscriptions"
        DROP column adding_presentation;
    `);
  }

}
