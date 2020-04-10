import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AssinaturaUsuario } from '../models/assinatura-usuario';
import { resources } from '../util/resources';

@Injectable({ providedIn: 'root' })
export class AssinaturaService {

  constructor(
    private http: HttpClient
  ) { }

  criaAssinatura(assinatura: AssinaturaUsuario): Observable<any> {
    return this.http.post(resources.ASSINATURAS, assinatura)
      .pipe(take(1));
  }

  buscaAssinaturaUsuario(): Observable<AssinaturaUsuario> {
    return this.http.get(`${resources.ASSINATURAS}/usuario`)
      .pipe(
        map(assinatura => <AssinaturaUsuario>assinatura),
        take(1)
      );
  }
}
