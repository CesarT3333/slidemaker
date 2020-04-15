import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { DataSourceTextPresentationEnum } from '../models/enum/data-source-text-presentation.enum';
import { IdiomEnum } from '../models/enum/idiom.enum';

export class createTablePresentation1586712511159
  implements MigrationInterface {

  private table = new Table({
    name: 'presentation',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'term',
        type: 'text',
        isNullable: false,
        isUnique: false
      },
      {
        name: 'text',
        type: 'text',
        isNullable: true,
        isUnique: false
      },
      {
        name: 'amount_slides',
        type: 'integer',
        isNullable: true
      },
      {
        name: 'idiom',
        type: 'text',
        default: `'${IdiomEnum.PT_PR}'`,
        isNullable: true,
      },
      {
        name: 'data_source',
        type: 'text',
        isNullable: false,
        default: `'${DataSourceTextPresentationEnum.WIKIPEDIA}'`,
      },
      {
        name: 'id_user',
        type: 'integer',
        isNullable: false
      }
    ],
    foreignKeys: [
      {
        name: 'fk_presentation_user',
        referencedTableName: 'usuario',
        referencedColumnNames: ['id'],
        columnNames: ['id_user'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }

}
