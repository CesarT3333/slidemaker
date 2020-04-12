import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { resources } from '../util/resources';
import { Apresentacao } from '../models/apresentacao';

@Injectable()
export class ApresentacaoService {

  constructor(
    private http: HttpClient
  ) { }

  buscarSlides(): Observable<Array<Apresentacao>> {
    return this.http.get(resources.APRESENTACOES)
    .pipe(
      take(1),
      map(res => <Array<Apresentacao>>res),
    );
  }

}
