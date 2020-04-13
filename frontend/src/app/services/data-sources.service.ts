import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '../util/resources';

@Injectable()
export class DataSourceService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(resources.DATA_SOURCES)
      .pipe(take(1));
  }

}
