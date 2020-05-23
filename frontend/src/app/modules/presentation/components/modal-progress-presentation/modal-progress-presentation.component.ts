import { OnInit, Component, OnDestroy } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { concatMap, delay } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';

import { EventProgressPresentationEnum } from '@models/enum/event-progress-presentation.enum';

@Component({
  templateUrl: './modal-progress-presentation.component.html',
  styleUrls: ['./modal-progress-presentation.component.scss']
})
export class ModalProgressPresentationComponent
  implements OnInit, OnDestroy {

  private _progressPresentationProgress$: Subscription;
  private _progress: EventProgressPresentationEnum;

  private readonly DELAY_PROGRESS = 2000;

  constructor(
    private socket: Socket
  ) {

    this._progressPresentationProgress$ =
      this.socket.fromEvent<WsResponse>('presentationProgress')
        .pipe(concatMap(item => of(item).pipe(delay(this.DELAY_PROGRESS))))
        .subscribe(wsResponse => this._progress = wsResponse.progress);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._progressPresentationProgress$.unsubscribe();
  }

  get progress(): EventProgressPresentationEnum {
    return this._progress;
  }

}

interface WsResponse {
  progress: EventProgressPresentationEnum;
}
