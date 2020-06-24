import { OnInit, Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { filter, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ModalImageCoverComponent } from '../modal-image-cover/modal-image-cover.component';
import { Theme } from 'src/app/models/theme';
import { Cover } from '@models/cover';

@Component({
  selector: 'smk-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent
  implements OnInit, OnDestroy {

  @Input() imageToShow: any;
  @Input() formPresentation: FormGroup;

  @Output() formPresentationChange = new EventEmitter<FormGroup>();
  @Output() eventCoverChange = new EventEmitter();

  private subject = new Subject();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.registerThemeChange();
    this.configureKeyUpInputEvent();
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  onProduzImagem($event): void {
    $event?.preventDefault();
    this.subject.next();
  }

  onCoverImageClick(): void {
    this.dialog.open(ModalImageCoverComponent, {
      disableClose: false,
      width: '700px',
      data: this.imageToShow
    });
  }

  private configureKeyUpInputEvent(): void {
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(() => this.eventCoverChange.emit());
  }

  private registerThemeChange(): void {
    this.formPresentation.get('term').valueChanges
      .pipe(filter(term => term)).subscribe((term: string) => {
        this.formPresentation.get('cover')
          .patchValue({ title: term });

        this.formPresentationChange.emit(this.formPresentation);
      });
  }

  get selectedTheme(): Theme {
    return this.formPresentation?.get('theme').value;
  }

  get coverFormGroup(): FormGroup {
    return <FormGroup>this.formPresentation.get('cover');
  }
}
