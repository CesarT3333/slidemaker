import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

import { finalize, filter, tap, switchMap } from 'rxjs/operators';

import { ConfirmService } from 'src/app/modules/ui/services/confirm.service';
import { PresentationService } from '@services/rest/presentation.service';
import { HandleErrorService } from '@services/handle-error.service';
import { SnackBarService } from '@services/snack-bar.service';
import { LoadingService } from '@services/loading.service';
import Presentation from '@models/presentation';

@Component({
  selector: 'smk-list-presentation',
  templateUrl: './list-presentation.component.html',
  styleUrls: ['./list-presentation.component.scss']
})
export class ListPresentationComponent
  implements OnInit {

  @Input() listPresentation: Array<Presentation> = [];
  @Input() showNewFlag = false;

  @Output() eventCopy = new EventEmitter<Presentation>();
  @Output() eventAccessPresentation = new EventEmitter<Presentation>();
  @Output() eventDeletePresentation = new EventEmitter<Presentation>();

  constructor(
    private presentationService: PresentationService,
    private handleErrorService: HandleErrorService,
    private snackBarService: SnackBarService,
    private confirmService: ConfirmService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void { }

  onDeletePresentation(presentation): void {
    this.confirmService.open({
      title: 'Exclusão de apresentação',
      textBody: `Você têm certeza que deseja excluir apresentação? =/
        A apresentação será excluida do seu google drive também`,
      showCancelButton: true
    }).afterClosed()
      .pipe(
        filter(resultConfirmation => resultConfirmation),
        tap(() => this.loadingService.show()),
        switchMap(() => this.presentationService.delete(presentation.id)),
        finalize(() => {
          this.eventDeletePresentation.emit();
          this.showNewFlag = false;
        })
      ).subscribe(
        _ => this.snackBarService.show('Apresentação deletada com sucesso'),
        error => this.handleErrorService.handle(error)
      );

  }

}
