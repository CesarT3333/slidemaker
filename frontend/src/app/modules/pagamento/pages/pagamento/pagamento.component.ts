import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize, switchMap, map } from 'rxjs/operators';

import { AssinaturaService } from 'src/app/services/assinatura-usuario.service';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { PagamentoService } from 'src/app/services/pagamento.service';
import { AssinaturaUsuario } from 'src/app/models/assinatura-usuario';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
    private assinaturaService: AssinaturaService,
    // private transacaoService: TransacaoService,
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

        map((idTransacao: string): AssinaturaUsuario => {
          const assinatura = this.usuarioService.assinatura;

          assinatura.idTransacao = idTransacao;
          assinatura.plano = <Plano>{ id: assinatura.plano.id };

          return assinatura;

        }),

        switchMap((assinatura: AssinaturaUsuario) =>
          this.assinaturaService.criaAssinatura(assinatura)),

        finalize(() => this.loadingService.dismiss()),

      ).subscribe(
        _ =>
          this.router.navigate(['/configuracao-apresentacao'])
            .then(() => this.snackBarService.show('Assinatura realizada com sucesso')),

        error => this.handleErrorService.handle(error)
      );

  }

}
