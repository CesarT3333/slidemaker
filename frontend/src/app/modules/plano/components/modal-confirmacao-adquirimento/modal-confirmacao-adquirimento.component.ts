import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Component, Inject } from '@angular/core';

import { TipoCobrancaPlanoEnum } from 'src/app/models/enum/tipo-cobranca-plano.enum';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import Plano from 'src/app/models/plano';

@Component({
  templateUrl: './modal-confirmacao-adquirimento.component.html'
})
export class ModalConfirmacaoAdiquirimentoComponent
  implements OnInit {

  quantidade = 1;

  private _plano: Plano;

  ngOnInit(): void { }

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacaoAdiquirimentoComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: { plano: Plano }
  ) {
    this._plano = data.plano;
  }

  onConfirmarClick(): void {
    if (this._plano.tipoCobrancaPlano === TipoCobrancaPlanoEnum.POR_APRESENTACAO) {

      const quantidadeFormatada = Number(this.quantidade);

      if (this.quantidadeEhValida(quantidadeFormatada)) {
        this.dialogRef.close({ quantidade: quantidadeFormatada });
      } else {
        this.snackBarService.show('Informe um valor válido para campo do tipo numérico');
        this.quantidade = 1;
      }
    } else {
      this.dialogRef.close({ quantidade: 0 });
    }
  }

  onCancelarClick(): void {
    this.dialogRef.close(null);
  }

  private quantidadeEhValida(quantidade): boolean {
    return quantidade !== null && !isNaN(quantidade);
  }

  get plano(): Plano {
    return this._plano;
  }

  get planoPagoPorQuantidadeApresentacoes(): boolean {
    return this._plano.tipoCobrancaPlano === TipoCobrancaPlanoEnum.POR_APRESENTACAO;
  }
}
