import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Theme } from 'src/app/models/theme';
import { filter } from 'rxjs/operators';

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
    this.formPresentation.get('theme').valueChanges
      .pipe(filter(theme => theme))
      .subscribe((theme: Theme) => {
        this.formPresentation.get('cover')
          .patchValue({
            title: theme.name,
            subTitle: 'Legenda',
          });

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