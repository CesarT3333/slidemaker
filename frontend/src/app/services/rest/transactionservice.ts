import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

}
