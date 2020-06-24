import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertImageNames1592072499445
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    const data = [
      { themeId: 1, imageName: 'Preto_simples.png' },
      { themeId: 2, imageName: 'Paradigma.png' },
      { themeId: 3, imageName: 'Mudanca.png' },
      { themeId: 4, imageName: 'Modernizacao.png' },
      { themeId: 5, imageName: 'Material.png' },
      { themeId: 6, imageName: 'ímpeto.png' },
      { themeId: 7, imageName: 'Foco.png' },
      { themeId: 8, imageName: 'Dia_de_praia.png' },
      { themeId: 9, imageName: 'Claro_simples.png' },
      { themeId: 10, imageName: 'Ardosia.png' }
    ];

    data.forEach(async d => await queryRunner.query(
      `UPDATE themes SET image_name = '${d.imageName}'
        WHERE id = ${d.themeId}`
    ));
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE themes SET image_name = null`
    );
  }

}
