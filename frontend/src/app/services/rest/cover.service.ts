import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '@utils/resources';
import { Cover } from '@models/cover';

@Injectable()
export class CoverService {

  constructor(
    private http: HttpClient
  ) { }

  producesCoverImage(cover: Cover): Observable<any> {
    return this.http.post(`${resources.COVER}/produces-image`,
      cover,
      { responseType: 'blob' }
    ).pipe(take(1));
  }

}
