import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Transacao } from '../models/transacao';
import { resources } from '../util/resources';

@Injectable()
export class TransacaoService {

  constructor(
    private http: HttpClient
  ) { }

  registraTransacao(transacao: Transacao): Observable<any> {
    return this.http.post(resources.TRANSACOES, transacao)
      .pipe(
        take(1)
      );
  }

}
