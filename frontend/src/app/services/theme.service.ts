import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resources } from '../util/resources';

@Injectable()
export class ThemeService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(resources.THEMES);
  }

}
