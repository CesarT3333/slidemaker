import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import Apresentacao from '@models/apresentacao';
import { resources } from '@utils/resources';

@Injectable()
export class ApresentacaoService {

  constructor(
    private http: HttpClient,
  ) { }

  create(apresentacao: Apresentacao): Observable<Apresentacao> {
    return this.http.post<Apresentacao>(
      resources.APRESENTACOES,
      apresentacao
    ).pipe(take(1));
  }

  buscarSlides(): Observable<Array<Apresentacao>> {
    return this.http.get<Array<Apresentacao>>(resources.APRESENTACOES)
      .pipe(take(1));
  }

}
