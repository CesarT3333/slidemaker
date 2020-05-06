import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { filter } from 'rxjs/operators';

import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'smk-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent
  implements OnInit {

  @Input() formPresentation: FormGroup;
  @Output() formPresentationChange = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.registerThemeChange();
  }

  private registerThemeChange(): void {
    this.formPresentation.get('term').valueChanges
      .pipe(filter(term => term))
      .subscribe((term: string) => {
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
