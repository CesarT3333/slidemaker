import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {

  constructor(
    private dialogService: DialogService,
    private router: Router
  ) { }

  handle(error: { error: { message: string }, message: string, status: number }): void {

    switch (error.status) {
      case 400:
        this.dialogService.open({
          message: error.error.message
        });
        break;
      case 401:
        console.log(error.message);
        this.dialogService.open({
          message: 'Erro de autenticação'
        });
        this.router.navigate(['/login']);
        break;

      default:
        this.dialogService.open({
          message: 'Ocorreu um erro nesta requisição'
        });
        console.log(error);
        break;
    }
  }

}
