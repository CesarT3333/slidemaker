import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './modal-successful-presentation-creation.component.html',
  styleUrls: ['./modal-successful-presentation-creation.component.scss']
})
export class ModalSuccessfulPresentationCreationComponent
  implements OnInit {

  private _googleIdPresentation: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { googleIdPresentation: string }
  ) {
    this._googleIdPresentation = data.googleIdPresentation;
  }

  ngOnInit(): void { }

  onLinkPresentationClick($event): void {
    $event?.preventDefault();
    window.open(
      `https://docs.google.com/presentation/d/${this._googleIdPresentation}`,
      '_blank'
    );
  }

}
