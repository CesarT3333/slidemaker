import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { finalize, filter, tap } from 'rxjs/operators';

import { HandleErrorService } from '@services/handle-error.service';
import { ThemeService } from '@services/rest/theme.service';
import { Theme } from '@models/theme';

@Component({
  selector: 'smk-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent
  implements OnInit {

  private readonly _defaultThemeId: string =
    '1JC-VSuLW41b_jP9twIXUQFDAeI4ET9dpDjKLj-5dptE';

  private _themes: Array<Theme> = [];

  @Input() set themeByPresentation(theme: Theme) {
    if (theme) {
      this.onSelectTheme(theme);
    }
  }

  @Input() formPresentation: FormGroup;
  @Output() formPresentationChange = new EventEmitter<FormGroup>();

  themeHovered: Theme;
  themeSelected: Theme;

  constructor(
    private handleErrorService: HandleErrorService,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.getAllThemes();
    this.registerActionOnChangeTheme();
  }

  onMouseOutImageTheme(): void {
    this.themeHovered = this.themeSelected;
  }

  onMouseEnterImageTheme(theme: Theme): void {
    if (!this.themeSelected || this.themeSelected.googleIdPresentation === this._defaultThemeId) {
      this.themeHovered = theme;
    }
  }

  onSelectTheme(theme: Theme): void {
    this._themes.forEach(t => t.selected = false);

    const themeSelected = this._themes.find(t => t === theme);

    theme.selected = true;

    if (theme.id === this.themeSelected?.id) {
      themeSelected.selected = false;
      this.themeSelected = null;
      this.themeHovered = null;
      this.setDefaultTheme();
    } else {
      this.themeSelected = theme;
      this.themeHovered = theme;
      this.formPresentation.patchValue({ theme: theme });
      this.formPresentation.get('theme')
        .updateValueAndValidity();
    }

    this.formPresentationChange.emit(this.formPresentation);

  }

  private getAllThemes(): void {
    this.themeService.getAll()
      .pipe(finalize(() => this.setDefaultTheme()))
      .subscribe(
        themes => this._themes = themes,
        error => this.handleErrorService.handle(error)
      );
  }

  private setDefaultTheme(): void {
    const defaultTheme: Theme = this._themes
      .find(t => t.googleIdPresentation === this._defaultThemeId);

    if (defaultTheme) {
      this.onSelectTheme(defaultTheme);
    }
  }

  private registerActionOnChangeTheme() {
    this.formPresentation.get('theme').valueChanges
      .pipe(
        filter(theme => !theme && !this.formPresentation.get('id').value),
        tap(_ => this.setDefaultTheme())
      ).subscribe();
  }

  get themes(): Array<Theme> {
    return this._themes;
  }

}
