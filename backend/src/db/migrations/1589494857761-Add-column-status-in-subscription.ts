import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnStatusInSubscription1589494857761
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      ALTER TABLE "subscriptions"
        ADD COLUMN status VARCHAR NOT NULL
          DEFAULT 'PENDING'
  `);
  }

  async down(_: QueryRunner): Promise<any> { }

}
