import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '@utils/resources';
import Plano from '@models/plano';

@Injectable()
export class PlanoService {

  constructor(
    private http: HttpClient
  ) { }

  buscarTodos(): Observable<Array<Plano>> {
    return this.http.get<Array<Plano>>(resources.PLANOS)
      .pipe(take(1));
  }
}
