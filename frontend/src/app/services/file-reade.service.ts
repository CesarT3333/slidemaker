import { Injectable } from '@angular/core';

@Injectable()
export class FileReaderService {

  readFileContent(file, callbackFunction): void {
    if (file) {

      const reader = new FileReader();

      reader.readAsText(file, 'UTF-8');

      reader.onload = function (evt): void {
        callbackFunction(`${evt.target.result}`);
      };

      reader.onerror = function (evt) {
        callbackFunction(null, evt.target.result);
      };

    }

  }

}
