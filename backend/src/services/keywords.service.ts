import { Injectable } from '@nestjs/common';

import NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
import { ConfigService } from '@nestjs/config';
import { Presentation } from '@model/presentation';

@Injectable()
export class KeywordsService {

  private _nlu: NaturalLanguageUnderstandingV1;

  constructor(
    _configService: ConfigService
  ) {
    this._nlu = new NaturalLanguageUnderstandingV1({
      iam_apikey: _configService.get('WATSON_API_KEY'),
      version: '2018-04-05',
      url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
    });
  }

  async fetchKeywordsOfAllSentences(presentation: Presentation) {

    for (const s of presentation.textSentences) {
      console.log(s.text);
      s.keywords = [];
      s.keywords = await this.fetchWatsonAndReturnKeywords(s.text);
    }

    console.log('finish fetch keywords sentences');

  }

  private async fetchWatsonAndReturnKeywords(sentence): Promise<any> {

    return new Promise((resolve, reject) => {
      this._nlu.analyze({
        text: sentence,
        features: {
          keywords: {}
        },
      }, (err, resp) => {

        const keywords: Array<string> = resp?.keywords?.map((kw) => kw.text);

        resolve(keywords);

      });
    }).catch(e => {
      console.log(e);
      throw new Error('que');
    });
  }

}
