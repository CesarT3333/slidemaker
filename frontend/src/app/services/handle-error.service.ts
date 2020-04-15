import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SnackBarService } from './snack-bar.service';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {

  constructor(
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  handle(error: { message: string, status: number }): void {

    switch (error.status) {
      case 401:
        console.log(error.message);
        this.snackBarService.show('Erro de autenticação');
        this.router.navigate(['/login']);
        break;

      default:
        this.snackBarService.show('Ocorreu um erro nesta requisição');
        console.log(error);
        break;
    }
  }

}
