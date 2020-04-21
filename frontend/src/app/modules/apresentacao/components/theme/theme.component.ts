import { OnInit, Component, Input } from '@angular/core';

import { HandleErrorService } from 'src/app/services/handle-error.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme';
import { finalize } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

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

  @Input() formPresentation: FormGroup;

  themeHovered: Theme;
  themeSelected: Theme;

  constructor(
    private handleErrorService: HandleErrorService,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.getAllThemes();
  }

  onMouseEnterImageTheme(theme: Theme): void {
    if (!this.themeSelected) {
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
    }

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

  get themes(): Array<Theme> {
    return this._themes;
  }

}
