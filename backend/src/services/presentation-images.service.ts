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

    for (const sentence of presentation.textSentences) {

      if (sentence?.keywords?.length) {

        const query = `${presentation.term} ${sentence.keywords[0]}`;

        sentence.images = await this.fetcGoogleAndReturnImageLinks(query);

      }

    }
  }

  private async fetcGoogleAndReturnImageLinks(query: string) {

    const response: any =
      await customSearch.cse.list({
        auth: this.configService.get('GOOGLE_API_KEY'),
        cx: this.configService.get('GOOGLE_SEARCH_ENGINE_ID'),
        q: query,
        searchType: 'image',
        num: 2
      });

    const imagesUrls: Array<string> =
      response.data.items.map(i => i.link);

    return imagesUrls;
  }
}
