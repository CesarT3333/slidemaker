import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import Presentation from '@models/presentation';
import { resources } from '@utils/resources';

@Injectable()
export class ApresentacaoService {

  constructor(
    private http: HttpClient,
  ) { }

  create(apresentacao: Presentation): Observable<Presentation> {
    return this.http.post<Presentation>(
      resources.PRESENTATIONS,
      apresentacao
    ).pipe(take(1));
  }

  buscarSlides(): Observable<Array<Presentation>> {
    return this.http.get<Array<Presentation>>(resources.PRESENTATIONS)
      .pipe(take(1));
  }

  getById(idPresentation: number): Observable<Presentation> {
    return this.http.get<Presentation>(`${resources.PRESENTATIONS}/${idPresentation}`)
      .pipe(take(1));
  }

}
