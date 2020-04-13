import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '../util/resources';

@Injectable()
export class IdiomService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(resources.IDIOMS)
      .pipe(
        take(1),
        // tap(response => console.log(response)),
        // map(response => <any>response)
      );
  }

}
