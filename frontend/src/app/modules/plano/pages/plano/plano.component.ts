import { OnInit, Component } from '@angular/core';

import { ApiService } from '../../../../services/api.service';

@Component({
  template: `
    <h1>Plano works</h1>
    <button (click)="onClickButton()">TESTE REQUEST</button>
  ` })
export class PlanoComponent
  implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void { }

  onClickButton(): void {
    this.apiService.teste()
      .subscribe(res => { });
  }

}
