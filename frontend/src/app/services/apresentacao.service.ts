import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { resources } from '../util/resources';
import { Apresentacao } from '../models/apresentacao';

@Injectable()
export class ApresentacaoService {

  constructor(
    private http: HttpClient
  ) { }

  buscarSlides(): Observable<Array<Apresentacao>> {
    // this.http.get(resources.APRESENTACOES)
    return of([{}])
      .pipe(
        take(1),
        map(res => <Array<Apresentacao>>res),
      );
  }

}
