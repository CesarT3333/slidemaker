import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SnackBarService {

  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  show(mensagem: string): void {
    this.matSnackBar.open(mensagem, 'Fechar', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

}
