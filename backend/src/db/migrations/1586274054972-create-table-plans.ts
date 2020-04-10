import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTablePlans1586274054972
    implements MigrationInterface {

    private table = new Table({
        name: 'planos',
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
                length: '100',
                isUnique: false,
                isNullable: false,
            },
            {
                name: 'descricao',
                type: 'text',
                isUnique: false,
                isNullable: true
            },
            {
                name: 'valor',
                type: 'decimal',
                isUnique: false,
                isNullable: false,
            },
            {
                name: 'atributos',
                type: 'varchar',
                length: '300',
                default: '0.0',
                isNullable: false,
                isUnique: false
            },
            {
                name: 'tipo_cobranca',
                type: 'text',
                isNullable: false,
                isUnique: false
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
