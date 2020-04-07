import { OnInit, Component } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { HandleErrorService } from 'src/app/services/handle-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PlanoService } from 'src/app/services/plano.service';
import Plano from 'src/app/models/plano';

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
  ) { }

  ngOnInit(): void {
    this.buscaTodosOsPlanos();
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
