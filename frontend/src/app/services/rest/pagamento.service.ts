import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Guid } from 'guid-typescript';

import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class PagamentoService {

  constructor(
    private http: HttpClient
  ) { }

  confirmarPagamento(): Observable<string> {
    return of<string>(Guid.create().toString())
      .pipe(delay(2000));
  }

}