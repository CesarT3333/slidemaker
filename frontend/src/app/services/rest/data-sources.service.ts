import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { EnumClientData } from '@models/enum-client-data';
import { resources } from '@utils/resources';

@Injectable()
export class DataSourceService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Array<EnumClientData>> {
    return this.http.get<Array<EnumClientData>>(resources.DATA_SOURCES)
      .pipe(take(1));
  }

}
