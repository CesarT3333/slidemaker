import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    setTimeout(() => this._loading = value);
  }

  show(): void {
    this.loading = true;
  }

  dismiss(): void {
    this.loading = false;
  }
}
