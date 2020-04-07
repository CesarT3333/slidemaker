import { OnInit, Component } from '@angular/core';

import { PagamentoService } from 'src/app/services/pagamento.service';

@Component({
  template: `
    <button (click)="onConfirmarFormularioPagamento()">
      Confirmar Pagamento
    </button>
` })
export class PagamentoComponent
  implements OnInit {

  constructor(
    private pagamentoService: PagamentoService
  ) { }

  ngOnInit(): void { }

  onConfirmarFormularioPagamento(): void {
    // TODO: Cenário futuro
    this.pagamentoService.confirmarPagamento();

  }

}
