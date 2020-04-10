import { MatDialog } from '@angular/material/dialog';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize, filter } from 'rxjs/operators';

import { ModalConfirmacaoAdiquirimentoComponent } from '../../components/modal-confirmacao-adquirimento/modal-confirmacao-adquirimento.component';
import { AssinaturaService } from 'src/app/services/assinatura-usuario.service';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PlanoService } from 'src/app/services/plano.service';
import Plano from 'src/app/models/plano';
import { AssinaturaUsuario } from 'src/app/models/assinatura-usuario';

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
          <AssinaturaUsuario>{ plano: $event };

        if (quantidadeObjeto) {
          this.usuarioService.assinatura
            .quantidadeApresentacoes = quantidadeObjeto.quantidade;
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
          this.router.navigate(['/configuracao-apresentacao'])
            .then(() => this.snackBarService.show('Usuário já possui assinatura!'))
            .finally(() => this.loadingService.dismiss());
        }
      });
  }

  get planos(): Array<Plano> {
    return this._planos;
  }

}
