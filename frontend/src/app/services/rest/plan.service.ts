import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { resources } from '@utils/resources';
import Plan from '@models/plan';

@Injectable()
export class PlanService {

  constructor(
    private http: HttpClient
  ) { }

  searchAll(): Observable<Array<Plan>> {
    return this.http.get<Array<Plan>>(resources.PLANS)
      .pipe(take(1));
  }
}
