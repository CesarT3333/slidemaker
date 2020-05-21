import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as algorithmia from 'algorithmia';

import { Presentation } from '@model/presentation';
import { IdiomEnum } from '@model/enum/idiom.enum';

@Injectable()
export class AlgorithmiaService {

  constructor(
    private configService: ConfigService
  ) { }

  async fetchContentFromWikipedia(presentation: Presentation): Promise<void> {

    const algorithmiaResponse = await algorithmia
      .client(`${this.configService.get('ALGORITHMIA_KEY')}`)
      .algo('web/WikipediaParser/0.1.2')
      .pipe({
        articleName: presentation.term,
        lang: IdiomEnum.getAlgorithmiainitials(presentation.idiom)
      });

    presentation.textToSanitize = algorithmiaResponse.get().content;

    console.log('Finish get content from wikipedia');

  }

}
