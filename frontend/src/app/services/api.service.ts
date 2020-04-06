import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  teste(): Observable<any> {

    const uri = 'slidemaker/api/apresentacao';

    return this.http.get(uri);
  }

}
