import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import Apresentacao from '../models/apresentacao';
import { resources } from '../util/resources';

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
    // this.http.get(resources.APRESENTACOES)
    return of([{}])
      .pipe(
        take(1),
        map(res => <Array<Apresentacao>>res),
      );
  }

}
