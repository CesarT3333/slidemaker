import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import Presentation from '@models/presentation';
import { resources } from '@utils/resources';

@Injectable()
export class PresentationService {

  constructor(
    private http: HttpClient,
  ) { }

  create(presentation: Presentation): Observable<Presentation> {
    return this.http.post<Presentation>(
      resources.PRESENTATIONS,
      presentation
    ).pipe(take(1));
  }

  buscarSlides(): Observable<Array<Presentation>> {
    return this.http.get<Array<Presentation>>(resources.PRESENTATIONS)
      .pipe(take(1));
  }

}
