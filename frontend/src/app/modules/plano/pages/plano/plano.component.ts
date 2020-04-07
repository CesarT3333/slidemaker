import { MatDialog } from '@angular/material/dialog';
import { OnInit, Component } from '@angular/core';

import { finalize, filter } from 'rxjs/operators';

import { ModalConfirmacaoAdiquirimentoComponent } from '../../components/modal-confirmacao-adquirimento/modal-confirmacao-adquirimento.component';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PlanoService } from 'src/app/services/plano.service';
import Plano from 'src/app/models/plano';
import { Router } from '@angular/router';

@Component({
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.scss']
})
export class PlanoComponent
  implements OnInit {

  private _planos: Array<Plano> = [];

  constructor(
    private handleErrorService: HandleErrorService,
    private loadingService: LoadingService,
    private planoService: PlanoService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buscaTodosOsPlanos();
  }

  onAdiquirirPlano($event: Plano) {
    this.dialog.open(ModalConfirmacaoAdiquirimentoComponent, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
      data: { plano: $event }
    }).afterClosed()
      .pipe(filter(resultadoConfirmacao => resultadoConfirmacao))
      .subscribe(result => {
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

  get planos(): Array<Plano> {
    return this._planos;
  }

}
