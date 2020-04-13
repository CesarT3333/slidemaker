import { MatDialog } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { OnInit, Component } from '@angular/core';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ApresentacaoService } from 'src/app/services/apresentacao.service';
import { Router } from '@angular/router';
import Apresentacao from '../../../../models/apresentacao';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './configuracao-apresentacao.component.html',
  styleUrls: ['./configuracao-apresentacao.component.scss']
})
export class ConfiguracaoApresentacaoComponent
  implements OnInit {
  private _slides: Array<Apresentacao> = [];

  constructor(
    private handleErrorService: HandleErrorService,
    private snackBarService: SnackBarService,
    private loadingService: LoadingService,
    private apresentacaoService: ApresentacaoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //aqui vamos chamar a procedure para carregar as apresentações
    // já criadas pelo usuário e jogar na lista.
    this.getAllSlides();
  }

  private getAllSlides(): void {
    this.loadingService.show();
    this.apresentacaoService.buscarSlides()
      .pipe(finalize(() => this.loadingService.dismiss()))
      .subscribe(
        slides => this._slides = slides,
        error => this.handleErrorService.handle(error)
      );
  }

  clickCreateSlide() {
    //aqui vamos salvar os dados, e criar o registro no banco
  }

  enableDisableFile($event){
    //var select = document.getElementById('typeFile');
	 
	  console.log($event); // pt
  }


}
