import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { OnInit, Component, ViewChild } from '@angular/core';

import { finalize, delay, tap, switchMap } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';

import { PresentationService } from '@services/rest/presentation.service';
import { DataSourceService } from '@services/rest/data-sources.service';
import { HandleErrorService } from '@services/handle-error.service';
import { FileReaderService } from '@services/file-reade.service';
import { IdiomService } from '@services/rest/idiom.service';
import { LoadingService } from '@services/loading.service';
import { EnumClientData } from '@models/enum-client-data';
import { DialogService } from '@services/dialog.service';
import Presentation from '@models/presentation';
import { ThemeService } from '@services/rest/theme.service';
import { Theme } from '@models/theme';

@Component({
  templateUrl: './presentation-setup.component.html',
  styleUrls: ['./presentation-setup.component.scss']
})
export class PresentationSetupComponent
  implements OnInit {

  @ViewChild('inputFile', { static: true })
  inputFile;

  @ViewChild('form', { static: false })
  form;

  @ViewChild(MatHorizontalStepper, { static: false })
  presentationStepper: MatHorizontalStepper;

  formPresentation: FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  presentationTeste: Presentation;

  private _presentations: Array<Presentation> = [];
  private _themes: Array<Theme> = [];
  private _dataSources: Array<EnumClientData> = [];
  private _idioms: Array<EnumClientData> = [];
  
  private readonly _defaults = {
    DATASOURCE: 'WIKIPEDIA',
    IDIOM: 'PT_BR',
    AMOUNT_SLIDES: 20,
    COVER: {
      title: 'Claro Simples',
      subTitle: 'Legenda'
    }
  };

  constructor(
    private presentationService: PresentationService,
    private handleErrorService: HandleErrorService,
    private dataSourceService: DataSourceService,
    private fileReaderService: FileReaderService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private idiomService: IdiomService,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.startsMandatorySearches();
  }

  onSubmit() {
    if (this.formPresentation.valid) {
      this.loadingService.show();
      this.presentationService.create(<Presentation>this.formPresentation.value)
        .pipe(
          delay(2000),
          finalize(() => this.loadingService.dismiss()),
          switchMap(() => this.getAllPresentations())
        ).subscribe(
          userpresentations => {
            this._presentations = userpresentations;
            this.resetFormDefault();
            this.dialogService.open({ message: 'Apresentação criada com sucesso' });
          },
          error => this.handleErrorService.handle(error)
        );
    }

  }

  onClickAttachmentFile($event) {
    $event?.preventDefault();
    this.inputFile.nativeElement.click();
  }

  onAttachedFile($event) {
    $event?.preventDefault();
    this.processesAttachedFile();
  }

  getErrorsInput(input: string): ValidationErrors {
    return this.formPresentation.get(input)?.errors;
  }

  onCleanAttachedFile($event) {
    $event?.preventDefault();
    this.formPresentation.patchValue({
      text: null,
      fileName: null
    });
  }

  onDataSourceChange(): void {
    const dataSourceSelected: string =
      this.formPresentation.get('dataSource').value;

    const textFormControl = <FormControl>this.formPresentation.get('text');
    const filenameFormControl = <FormControl>this.formPresentation.get('fileName');

    switch (dataSourceSelected) {
      case 'TXT':
        this.enableTextFormControl(textFormControl, filenameFormControl);
        break;

      case 'FILE':
        this.enableFileFormControl(textFormControl, filenameFormControl);
        break;

      default:
        filenameFormControl.setValidators(null);
        textFormControl.setValidators(null);
        break;
    }

    filenameFormControl.updateValueAndValidity();
    textFormControl.updateValueAndValidity();

  }

  private setTheme(theme:Theme):void {
    const selectedTheme: Theme = this._themes
    .find(t => t.googleIdPresentation === this.presentationTeste.theme.googleIdPresentation);      

    if (selectedTheme) {
      this.onSelectTheme(selectedTheme);
    }
  }

  onSelectTheme(theme: Theme): void {
    this._themes.forEach(t => t.selected = false);
    const themeSelected = this._themes.find(t => t === theme);
    theme.selected = true;
  }

  private enableTextFormControl(
    textFormControl: FormControl,
    filenameFormControl: FormControl
  ): void {
    textFormControl.setValue(null);
    textFormControl.setValidators(Validators.required);

    filenameFormControl.patchValue(null);
    filenameFormControl.setErrors(null);
    filenameFormControl.setValidators(null);
  }

  private enableFileFormControl(
    textFormControl: FormControl,
    filenameFormControl: FormControl
  ): void {
    filenameFormControl.setValue(null);
    filenameFormControl.setValidators(Validators.required);

    textFormControl.setValue(null);
    textFormControl.patchValue(null);
    textFormControl.setErrors(null);
    textFormControl.setValidators(null);
  }

  private startsMandatorySearches(): void {
    this.loadingService.show();
    concat(
      this.getAllPresentations(),
      this.getDataSources(),
      this.getIdioms()      
    ).pipe(
      finalize(() => {
        this.loadingService.dismiss();
        this.initForm();
      })
    ).subscribe(
      _ => { },
      error => this.handleErrorService.handle(error)
    );
  }

  private getAllPresentations(): Observable<Array<Presentation>> {
    return this.presentationService.getAllOfTheUser()
      .pipe(tap(presentations => {this._presentations = presentations
        this._presentations.forEach(presentation => {
          this.setTheme(presentation.theme);            
        });        
      }));
  }

  private getDataSources(): Observable<Array<EnumClientData>> {
    return this.dataSourceService.getAll()
      .pipe(tap(dataSources => this._dataSources = dataSources));
  }

  private getIdioms(): Observable<Array<EnumClientData>> {
    return this.idiomService.getAll()
      .pipe(tap(idioms => this._idioms = idioms));
  }

  private initForm() {
    this.formPresentation =
      this.formBuilder.group({
        term: [null, Validators.required],
        text: null,
        amountOfSlides: [
          this._defaults.AMOUNT_SLIDES,
          [
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ]
        ],
        fileName: [{
          value: null,
          disabled: false
        }],
        idiom: [null, Validators.required],
        dataSource: [null, Validators.required],
        theme: [null, Validators.required],
        cover: this.formBuilder.group({
          title: [
            this._defaults.COVER.title,
            Validators.required
          ],
          subTitle: this._defaults.COVER.subTitle,
        })
      });

    this.setDatasourceToDefault();
    this.setIdiomToDefault();

  }

  private resetFormDefault(): void {
    this.presentationStepper.selectedIndex = 0;
    this.presentationStepper.reset();

    this.form.resetForm();
    this.formPresentation.patchValue({
      term: null,
      text: null,
      amountOfSlides: this._defaults.AMOUNT_SLIDES,
      fileName: null,
      idiom: this._defaults.IDIOM,
      dataSource: this._defaults.DATASOURCE,
      theme: null,
      cover: {
        title: this._defaults.COVER.title,
        subTitle: this._defaults.COVER.subTitle,
      }
    });

    this.formPresentation.updateValueAndValidity();

  }

  private processesAttachedFile(): void {
    const file = this.inputFile.nativeElement.files[0];

    this.fileReaderService.readFileContent(file, (fileContent, error?) => {

      if (error) {

        this.dialogService.open({
          title: 'Erro ao anexar arquivo',
          message: 'Ocorreu um erro ao anexar o arquivo. Tente novamente'
        });

      } else {

        this.formPresentation.patchValue({
          fileName: file.name,
          text: fileContent
        });

      }

    });
  }

  private setIdiomToDefault(): void {
    this.formPresentation
      .patchValue({
        idiom: this._idioms
          .find(i => i.name === this._defaults.IDIOM).name
      });
  }

  private setDatasourceToDefault(): void {
    this.formPresentation
      .patchValue({
        dataSource: this._dataSources
          .find(i => i.name === this._defaults.DATASOURCE).name
      });
  }

  

  get idioms(): Array<EnumClientData> {
    return this._idioms;
  }

  get dataSources(): Array<EnumClientData> {
    return this._dataSources;
  }

  get dataSourceSelected(): string {
    return this.formPresentation?.get('dataSource')?.value;
  }

  get fileName(): FormControl {
    return <FormControl>this.formPresentation.get('fileName');
  }

  get presentations(): Array<Presentation> {
    return this._presentations;
  }

  /*get themes(): Array<string> {
    return this._themes;
  }*/

  get themeFormControl(): Theme {
    return this.formPresentation?.get('theme')?.value;
  }

}
