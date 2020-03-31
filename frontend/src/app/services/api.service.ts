import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  teste(): Observable<any> {

    console.log(localStorage.getItem('token'));
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const uri = 'slidemaker/api/apresentacao';
    // const uri = 'apresentacao';
    // const uri = 'auth/teste';
    // const uri = 'apresentacoes/teste';
    // return this.http.get('slidemaker/api/teste',
    //   { headers: httpHeaders })
    //   .pipe(
    //     // map(res => res.json())
    //   );

    return this.http.get(uri, { headers: httpHeaders });
  }

}
