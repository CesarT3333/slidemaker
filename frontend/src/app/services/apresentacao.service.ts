import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApresentacaoService {

  constructor(
    private http: HttpClient
  ) { }

  teste(): Observable<any> {
    return this.http.get('');
  }

}
