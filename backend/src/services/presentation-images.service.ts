import { Presentation } from '@model/presentation';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import * as g from 'googleapis';

const customSearch = g.google.customsearch('v1');

@Injectable()
export class PresentationImagesService {

  constructor(
    private configService: ConfigService
  ) { }

  async fetcImageOfAllSentences(presentation: Presentation) {

    presentation.textSentences.forEach(txs => txs.images = []);

    const imgs: Array<string> = [];
    const amountRequests: number = presentation.textSentences.length / 5;

    let start = 0;
    for (let amount = 0; amount <= amountRequests; amount++) {
      (await this.fetcGoogleAndReturnImageLinks(presentation.term, start))?.forEach(i => imgs.push(i));
      start += 5;
    }

    imgs.forEach((img, index) => presentation.textSentences[index]?.images?.push(img));

  }

  private async fetcGoogleAndReturnImageLinks(query: string, start: number) {

    const response: any =
      await customSearch.cse.list({
        auth: this.configService.get('GOOGLE_API_KEY'),
        cx: this.configService.get('GOOGLE_SEARCH_ENGINE_ID'),
        rights: 'cc_publicdomain',
        imgSize: 'MEDIUM',
        start,
        safe: 'off',
        num: 5,
        q: query,
        searchType: 'image',
      });

    const imagesUrls: Array<string> =
      response.data.items?.map(i => i.link);

    return imagesUrls || [];
  }
}
