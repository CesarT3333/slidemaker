import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Guid } from 'guid-typescript';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Transacao } from '../models/transacao';

@Injectable()
export class PagamentoService {

  constructor(
    private http: HttpClient
  ) { }

  confirmarPagamento(): Observable<Transacao> {
    return of({
      idTransacao: Guid.create().toString()
    }).pipe(
      delay(5000),
      map(response => <Transacao>response)
    );
  }

}
