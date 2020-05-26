import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SignatureUser } from '@models/signature-user';
import { GoogleProfile } from '@models/google-profile';
import { SnackBarService } from './snack-bar.service';
import { SignatureService } from '@services/rest/signature-user.service';
import { Router } from '@angular/router';
import { resources } from '@utils/resources';

@Injectable({ providedIn: 'root' })
export class UserService {

  signature: SignatureUser;

  private _googleProfile: GoogleProfile;

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService,
    private signatureSevice: SignatureService,
    private router: Router,
  ) { }

  logoutUser() {
    this.googleProfile = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
      .then(() => this.snackBarService.show('Usuário deslogado'));
  }

  set googleProfile(profile) {
    this._googleProfile = profile;
    localStorage.setItem('google_profile', JSON.stringify(profile));
  }

  get googleProfile(): GoogleProfile {
    if (!this._googleProfile) {
      return JSON.parse(localStorage.getItem('google_profile'));
    } else {
      return this._googleProfile;
    }
  }

  subsctiptionUser(): Observable<SignatureUser> {
  /*  console.log("to no metodo do service",
    this.http.post(resources.SIGNATURES, this.signature)
      .pipe(take(1)));
*/
    

    return this.http.get<SignatureUser>(`${resources.SIGNATURES}/usuario`)
    .pipe(take(1));

      /*map(response => {
        console.log("Resposta", response);
      })
    );*/

    /*console.log("to no metodo do service");

    if (!this.signature){
      console.log("assinatura vazia - ", localStorage);
      return JSON.parse(localStorage.getItem('amountPresentation'));
    }
    else {
      console.log("to no else");
      return this.signature;
    }*/
  }

}
