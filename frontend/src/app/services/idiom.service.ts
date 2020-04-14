import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { EnumClientData } from '../models/enum-client-data';
import { resources } from '../util/resources';

@Injectable()
export class IdiomService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Array<EnumClientData>> {
    return this.http.get(resources.IDIOMS)
      .pipe(
        take(1),
        map(idioms => <Array<EnumClientData>>idioms),
      );
  }

}
