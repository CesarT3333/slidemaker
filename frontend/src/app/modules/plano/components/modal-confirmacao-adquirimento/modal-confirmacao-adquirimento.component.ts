import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Component, Inject } from '@angular/core';

import { SnackBarService } from '@services/snack-bar.service';
import Plano from '@models/plano';
import { BillingPlanEnum } from '@models/enum/billing-plan.enum';

@Component({
  templateUrl: './modal-confirmacao-adquirimento.component.html'
})
export class ModalConfirmacaoAdiquirimentoComponent
  implements OnInit {

  quantidade = 1;

  private _plano: Plano;

  ngOnInit(): void { }

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmacaoAdiquirimentoComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) data: { plano: Plano }
  ) {
    this._plano = data.plano;
  }

  onConfirmarClick(): void {
    if (this._plano.billingType === BillingPlanEnum.PRESENTATION) {

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
    return quantidade && !isNaN(quantidade);
  }

  get plano(): Plano {
    return this._plano;
  }

  get planoPagoPorQuantidadeApresentacoes(): boolean {
    return this._plano.billingType === BillingPlanEnum.PRESENTATION;
  }
}
