import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import Presentation from '@models/presentation';
import { resources } from '@utils/resources';
import { UserService } from '@services/user.service';

@Injectable()
export class PresentationService {

  constructor(
    private userService: UserService,
    private http: HttpClient,
  ) { }

  create(presentation: Presentation): Observable<Presentation> {

    const googleAccessToken: string =
      this.userService.googleProfile?.googleAccessToken;

    const headers = new HttpHeaders()
      .set('google_access_token', googleAccessToken);

    return this.http.post<Presentation>(
      resources.PRESENTATIONS,
      presentation,
      { headers }
    ).pipe(take(1));
  }

  getAllOfTheUser(): Observable<Array<Presentation>> {

    const googleAccessToken: string =
      this.userService.googleProfile?.googleAccessToken;

    const headers = new HttpHeaders()
      .set('google_access_token', googleAccessToken);

    return this.http.get<Array<Presentation>>(resources.PRESENTATIONS, { headers })
      .pipe(take(1));
  }

  getById(idPresentation: number): Observable<Presentation> {
    return this.http.get<Presentation>(`${resources.PRESENTATIONS}/${idPresentation}`)
      .pipe(take(1));
  }

  delete(idPresentation: number): Observable<any> {
    const googleAccessToken: string =
      this.userService.googleProfile?.googleAccessToken;

    const headers = new HttpHeaders()
      .set('google_access_token', googleAccessToken);

    return this.http.delete<any>(
      `${resources.PRESENTATIONS}/${idPresentation}`,
      { headers }
    ).pipe(take(1));
  }

}
