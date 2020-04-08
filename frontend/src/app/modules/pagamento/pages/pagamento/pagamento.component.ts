import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize, switchMap, map } from 'rxjs/operators';

import { HandleErrorService } from 'src/app/services/handle-error.service';
import { TransacaoService } from 'src/app/services/transacao.service';
import { PagamentoService } from 'src/app/services/pagamento.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Transacao } from 'src/app/models/transacao';
import Plano from 'src/app/models/plano';

@Component({
  template: `
    <h1>Pagamento e geração de assinatura</h1>
    <button (click)="onConfirmarFormularioPagamento()">
      Confirmar Pagamento
    </button>
` })
export class PagamentoComponent
  implements OnInit {

  constructor(
    private handleErrorService: HandleErrorService,
    private pagamentoService: PagamentoService,
    private transacaoService: TransacaoService,
    private snackBarService: SnackBarService,
    private usuarioService: UsuarioService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onConfirmarFormularioPagamento(): void {

    this.loadingService.show();
    this.pagamentoService.confirmarPagamento()
      .pipe(

        map((dadosTransacao: Transacao): Transacao =>
          ({
            ...dadosTransacao,
            plano: <Plano>{
              id: this.usuarioService.planoUsuario.id
            }
          })
        ),

        switchMap((dadosTransacao: Transacao) =>
          this.transacaoService.registraTransacao(dadosTransacao)),

        finalize(() => this.loadingService.dismiss()),

      ).subscribe(
        _ =>
          this.router.navigate(['/configuracao-apresentacao'])
            .then(() => this.snackBarService.show('Assinatura realizada com sucesso')),

        error => this.handleErrorService.handle(error)
      );

  }

}
