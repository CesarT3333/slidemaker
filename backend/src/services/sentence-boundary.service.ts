import { Injectable } from '@nestjs/common';

import * as sentenceBoundaryDetection from 'sbd';

import { Presentation } from '@model/presentation';

@Injectable()
export class SentenceBoundaryService {

  getTextSentences(presentation: Presentation): void {

    if (!presentation.amountOfSlides) {
      presentation.amountOfSlides = 15;
    }

    const sentences: Array<string> = sentenceBoundaryDetection
      .sentences(presentation.sanitizedText);

    presentation.textSentences = sentences.map(s => ({ text: s }))
      .slice(0, presentation.amountOfSlides);

    console.log('finish sentence boundary detection');
  }

}
