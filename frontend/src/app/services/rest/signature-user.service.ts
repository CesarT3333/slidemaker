import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SignatureUser } from '@models/signature-user';
import { resources } from '@utils/resources';

@Injectable({ providedIn: 'root' })
export class SignatureService {

  constructor(
    private http: HttpClient
  ) { }

  createSignature(signature: SignatureUser): Observable<any> {
    return this.http.post(resources.SIGNATURES, signature)
      .pipe(take(1));
  }

  searchUserSignature(): Observable<SignatureUser> {
    return this.http.get<SignatureUser>(`${resources.SIGNATURES}/usuario`)
      .pipe(take(1));
  }
}
