import { MigrationInterface, QueryRunner } from 'typeorm';

import { Theme } from '@model/theme';

export class InsertDefaultThemes1588078979737
  implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {

    const themes: Array<Theme> =
      [
        {
          name: 'Preto Simples',
          googleIdPresentation: '1BsNCWawZ8xwQ6vOVjDRh-N9sS9XYte9X3R9mrL8RbEw',
          googleIdImg: '1oyAogmSj2_czk5YBqLSHcQ59Rszp0Bpm'
        },
        {
          name: 'Paradigma',
          googleIdPresentation: '1KkkDx9WTamff1xEcAPHH7Uh2oYDQ-1429UL7lq3-_mM',
          googleIdImg: '1p10aFrmsJb658tNYbleFhVlGQXAL--1U'
        },
        {
          name: 'Mudança',
          googleIdPresentation: '1bykwdUAzq2BM2YZMfLV1-d_zvrxIQTnQ93UTQB_anMM',
          googleIdImg: '1Xy8fsEFZuiVi5p_Cm5BTPUeW-NEd3Np_'
        },
        {
          name: 'Modernização',
          googleIdPresentation: '1u1zbFX-WTX3HE-1Uy8Zuira8XOg4z-1HeUUBrTXJ7aQ',
          googleIdImg: '1Iv6pLhihsRzaY26oAohjgmoZzRDB3zZH'
        },
        {
          name: 'Material',
          googleIdPresentation: '1BeQKwfSwkeReV5h28gPq8Q6lVVh1QZkrsI5aR7JUrV4',
          googleIdImg: '1ZhClJMZaDeE0VyRL_Riu_TjKSgcvgoNw'
        },
        {
          name: 'Ímpeto',
          googleIdPresentation: '1FnQsM_9-x1tKztUyJXR1IjuL3VlTg2Dnh1YvdjXOf7Y',
          googleIdImg: '1w7jBbDvkcFymvvEuqD7yPrHQFIDrBTgF'
        },
        {
          name: 'Foco',
          googleIdPresentation: '1FsfH2cIpJJ2YVaKFOFffyuk1thLR3uD0pC57hqli9XU',
          googleIdImg: '1kyTFRo4cOc-c9Zk8TdpL71pSQ9PtzLlv'
        },
        {
          name: 'Dia de praia',
          googleIdPresentation: '1bh68IFrtKMq0_dx3hPMEoXGWp2-ZvqkWmnQNZ1n_PxI',
          googleIdImg: '1alCSVh5gLXP51bfuaW7AvEsMzUkCz995'
        },
        {
          name: 'Claro Simples',
          googleIdPresentation: '1JC-VSuLW41b_jP9twIXUQFDAeI4ET9dpDjKLj-5dptE',
          googleIdImg: '1xtt7MnmBMD3Fd7gBU6sGKKgKM2VP8sHc'
        },
        {
          name: 'Ardósia',
          googleIdPresentation: '15RIcqJvoUz-Do4tHG1SF3uiI-y9s0cklTLa2gLZjZXg',
          googleIdImg: '1M52I4UX-qSj7zQN_xH2Z_9Xh8NuuufNG'
        }
      ];

    await queryRunner
      .manager.createQueryBuilder()
      .insert()
      .into('themes')
      .values(themes)
      .execute();
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE themes');
  }

}
