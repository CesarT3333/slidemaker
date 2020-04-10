import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransacaoService {

  constructor(
    private http: HttpClient
  ) { }

}
