import { MatDialog } from '@angular/material/dialog';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize, filter } from 'rxjs/operators';

import { ModalConfirmacaoAdiquirimentoComponent } from '../../components/modal-confirmacao-adquirimento/modal-confirmacao-adquirimento.component';
import { AssinaturaService } from '@services/rest/assinatura-usuario.service';
import { HandleErrorService } from '@services/handle-error.service';
import { AssinaturaUsuario } from '@models/assinatura-usuario';
import { SnackBarService } from '@services/snack-bar.service';
import { LoadingService } from '@services/loading.service';
import { UsuarioService } from '@services/usuario.service';
import { PlanoService } from '@services/rest/plano.service';
import Plano from '@models/plano';

@Component({
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.scss']
})
export class PlanoComponent
  implements OnInit {

  private _planos: Array<Plano> = [];

  constructor(
    private handleErrorService: HandleErrorService,
    private assinaturaService: AssinaturaService,
    private snackBarService: SnackBarService,
    private loadingService: LoadingService,
    private usuarioService: UsuarioService,
    private planoService: PlanoService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buscaTodosOsPlanos();
    this.verificaSeUsuarioiPossuiAssinatura();
  }

  onAdiquirirPlano($event: Plano) {
    this.dialog.open(ModalConfirmacaoAdiquirimentoComponent, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
      data: { plano: $event }
    }).afterClosed()
      .pipe(filter(resultadoConfirmacao => resultadoConfirmacao))
      .subscribe((quantidadeObjeto: { quantidade: number }) => {
        this.usuarioService.assinatura =
          <AssinaturaUsuario>{ plan: $event };

        if (quantidadeObjeto) {
          this.usuarioService.assinatura
            .amountPresentation = quantidadeObjeto.quantidade;
        }

        this.router.navigate(['./pagamento']);
      });
  }

  private buscaTodosOsPlanos(): void {
    this.loadingService.show();
    this.planoService.buscarTodos()
      .pipe(finalize(() => this.loadingService.dismiss()))
      .subscribe(
        planos => this._planos = planos,
        error => this.handleErrorService.handle(error)
      );
  }

  private verificaSeUsuarioiPossuiAssinatura(): void {
    this.assinaturaService.buscaAssinaturaUsuario()
      .subscribe(assinatura => {
        if (assinatura) {
          this.loadingService.show();
          this.router.navigate(['/apresentacao'])
            .then(() => this.snackBarService.show('Usuário já possui assinatura!'))
            .finally(() => this.loadingService.dismiss());
        }
      });
  }

  get planos(): Array<Plano> {
    return this._planos;
  }

}
