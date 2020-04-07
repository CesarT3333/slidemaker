import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTablePlans1586274054972
    implements MigrationInterface {

    private table = new Table({
        name: 'plano',
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
                name: 'descricao',
                type: 'varchar',
                length: '255',
                isUnique: false,
                isNullable: true
            },
            {
                name: 'quantitativo_descricao',
                type: 'varchar',
                length: '255',
                isUnique: false,
                isNullable: false,
            },
            {
                name: 'quantitativo_quantidade',
                type: 'integer',
                isUnique: false,
                isNullable: false,
            },
            {
                name: 'valor',
                type: 'decimal',
                isNullable: false,
                default: '0.0',
            },
            {
                name: 'atributos',
                type: 'varchar',
                length: '300',
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
