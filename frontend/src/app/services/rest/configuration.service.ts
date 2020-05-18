import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '@utils/resources';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {

  constructor(
    private http: HttpClient
  ) { }

  getStripePublicKey(): Observable<string> {
    return this.http.get<{
      stripePublicKey: string
    }>(`${resources.CONFIGURATIONS}/stripe/public-key`)
      .pipe(take(1), map(response => response.stripePublicKey));
  }

}
