import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '../util/resources';
import Plano from '../models/plano';

@Injectable()
export class PlanoService {

  constructor(
    private http: HttpClient
  ) { }

  buscarTodos(): Observable<Array<Plano>> {
    return this.http.get(resources.PLANOS)
      .pipe(map(res => <Array<any>>res));
  }
}
