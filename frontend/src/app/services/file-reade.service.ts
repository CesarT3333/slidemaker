import { Injectable } from '@angular/core';

@Injectable()
export class FileReaderService {

  private _reader = new FileReader();

  constructor() { }

  readFileContent(file, callbackFunction): void {
    if (file) {

      this._reader.readAsText(file, 'UTF-8');

      this._reader.onload = function (evt): void {
        callbackFunction(`${evt.target.result}`);
      };

      this._reader.onerror = function (evt) {
        callbackFunction(null, evt.target.result);
      };

    }

  }

  createImageFromBlob(imageBlob: Blob, callback): void {
    this._reader = new FileReader();
    this._reader.addEventListener('load',
      () => callback(this._reader.result), false);

    if (imageBlob) {
      this._reader.readAsDataURL(imageBlob);
    }

    // TODO: testar
    // this._reader.removeEventListener('load', () => { });
  }

}
