import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '@utils/resources';
import { Theme } from '@models/theme';

@Injectable()
export class ThemeService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Array<Theme>> {
    return this.http.get<Array<Theme>>(resources.THEMES)
      .pipe(take(1));
  }

}
