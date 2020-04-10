import { Injectable } from '@angular/core';
import { SnackBarService } from './snack-bar.service';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {

  constructor(
    private snackBarService: SnackBarService
  ) { }

  handle(error): void {
    console.log(error);
    this.snackBarService.show('Ocorreu um erro nesta requisição');
  }

}
