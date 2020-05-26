import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Subscription } from '@models/subscription';
import { resources } from '@utils/resources';

@Injectable({ providedIn: 'root' })
export class SignatureService {

  constructor(
    private http: HttpClient
  ) { }

  createSignature(signature: Subscription): Observable<any> {
    return this.http.post(resources.SIGNATURES, signature)
      .pipe(take(1));
  }

  searchUserSignature(): Observable<Subscription> {
    return this.http.get<Subscription>(`${resources.SIGNATURES}/usuario`)
      .pipe(take(1));
  }
}
