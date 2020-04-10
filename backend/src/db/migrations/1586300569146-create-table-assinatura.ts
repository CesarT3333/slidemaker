import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createTableAssinatura1586300569146 implements MigrationInterface {

    private table = new Table({
        name: 'assinaturas',
        columns: [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'quantidade_apresentacoes',
                type: 'integer',
                isNullable: true,
                isUnique: false
            },
            {
                name: 'id_usuario',
                type: 'integer',
                isNullable: false,
                isUnique: false
            },
            {
                name: 'id_plano',
                type: 'integer',
                isNullable: false,
                isUnique: false
            }
        ]
    });

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(this.table);

        await queryRunner.createForeignKey(
            'assinaturas',
            new TableForeignKey({
                name: 'fk_assinatura_usuario',
                columnNames: ['id_usuario'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuario',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }));

        await queryRunner.createForeignKey(
            'assinaturas',
            new TableForeignKey({
                name: 'fk_assinatura_plano',
                columnNames: ['id_plano'],
                referencedColumnNames: ['id'],
                referencedTableName: 'planos',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.table);
    }

}
