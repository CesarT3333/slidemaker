import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Component, Inject } from '@angular/core';

import Plano from 'src/app/models/plano';
import { TipoCobrancaPlanoEnum } from 'src/app/models/enum/tipo-cobranca-plano.enum';

@Component({
  templateUrl: './modal-confirmacao-adquirimento.component.html'
})
export class ModalConfirmacaoAdiquirimentoComponent
  implements OnInit {

  quantidade = 1;
  contemErro = false;

  private _plano: Plano;

  ngOnInit(): void { }

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacaoAdiquirimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { plano: Plano }
  ) {
    this._plano = data.plano;
  }

  onConfirmarClick(): void {
    if (this._plano.tipoCobrancaPlano === TipoCobrancaPlanoEnum.POR_APRESENTACAO) {
      if (this.quantidadeEhValida()) {
        this.contemErro = false;
        this.dialogRef.close(this.quantidade);
      } else {
        this.quantidade = 1;
        this.contemErro = true;
      }
    }
  }

  onCancelarClick(): void {
    this.dialogRef.close(null);
  }

  private quantidadeEhValida(): boolean {
    console.log(typeof this.quantidade);
    return this.quantidade !== null &&
      typeof this.quantidade === 'number';
  }

  get plano(): Plano {
    return this._plano;
  }

  get planoPagoPorQuantidadeApresentacoes(): boolean {
    return this._plano.tipoCobrancaPlano === TipoCobrancaPlanoEnum.POR_APRESENTACAO;
  }
}
