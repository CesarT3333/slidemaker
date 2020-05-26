import { Injectable } from '@nestjs/common';
import { Presentation } from '@model/presentation';

@Injectable()
export class TextService {

  sanitilizeContent(presentation: Presentation): void {

    const withoutBlankLinesAndMArkdown =
      this.removeBlankLinesAndMarkDown(presentation.textToSanitize);

    const withoutDatesInParentheses =
      this.removeDatesInParentheses(withoutBlankLinesAndMArkdown);

    presentation.sanitizedText = withoutDatesInParentheses;

    console.log('finish text sanitilize');
  }

  private removeBlankLinesAndMarkDown(text) {
    const allLines = text.split('\n');

    return allLines
      .filter(line =>
        line.trim().length !== 0 && !line.trim().startsWith('='))
      .join(' ');

  }

  private removeDatesInParentheses(text) {
    return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ');
  }

}
