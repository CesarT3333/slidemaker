import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { OnInit, Component, ViewChild } from '@angular/core';

import { finalize, delay, tap, switchMap } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';

import { ApresentacaoService } from '@services/rest/apresentacao.service';
import { DataSourceService } from '@services/rest/data-sources.service';
import { HandleErrorService } from '@services/handle-error.service';
import { FileReaderService } from '@services/file-reade.service';
import { LoadingService } from '@services/loading.service';
import { EnumClientData } from '@models/enum-client-data';
import { DialogService } from '@services/dialog.service';
import { IdiomService } from '@services/rest/idiom.service';
import Apresentacao from '@models/apresentacao';
import { Theme } from '@models/theme';

@Component({
  templateUrl: './configuracao-apresentacao.component.html',
  styleUrls: ['./configuracao-apresentacao.component.scss']
})
export class ConfiguracaoApresentacaoComponent
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

  private _presentations: Array<Apresentacao> = [];

  private _dataSources: Array<EnumClientData> = [];
  private _idioms: Array<EnumClientData> = [];
  private _themes: Array<string> = [];

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
    private presentationService: ApresentacaoService,
    private handleErrorService: HandleErrorService,
    private dataSourceService: DataSourceService,
    private fileReaderService: FileReaderService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private idiomService: IdiomService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.startsMandatorySearches();
  }

  onAbreModal() {
    this.dialogService.open({ message: 'Teste de mensagem' });
  }

  onSavePresentation() {
    if (this.formPresentation.valid) {
      this.loadingService.show();
      this.presentationService.create(<Apresentacao>this.formPresentation.value)
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

  onSubmit() {
  }

  onClickAttachmentFile($event) {
    $event?.preventDefault();
    this.inputFile.nativeElement.click();
  }

  onArquivoAnexado($event) {
    $event?.preventDefault();
    this.processesAttachedFile();
  }

  getErrorsInput(input: string): ValidationErrors {
    return this.formPresentation.get(input)?.errors;
  }

  onLimparAttachedFile($event) {
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
        // TODO: Separar em método
        textFormControl.setValue(null);
        textFormControl.setValidators(Validators.required);

        filenameFormControl.patchValue(null);
        filenameFormControl.setErrors(null);
        filenameFormControl.setValidators(null);
        break;

      case 'FILE':
        // TODO: Separar em método
        filenameFormControl.setValue(null);
        filenameFormControl.setValidators(Validators.required);

        textFormControl.setValue(null);
        textFormControl.patchValue(null);
        textFormControl.setErrors(null);
        textFormControl.setValidators(null);
        break;

      default:
        filenameFormControl.setValidators(null);
        textFormControl.setValidators(null);
        break;
    }

    filenameFormControl.updateValueAndValidity();
    textFormControl.updateValueAndValidity();

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

  private getAllPresentations(): Observable<Array<Apresentacao>> {
    return this.presentationService.buscarSlides()
      .pipe(tap(presentations => this._presentations = presentations));
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

  get presentations(): Array<Apresentacao> {
    return this._presentations;
  }

  get themes(): Array<string> {
    return this._themes;
  }

  get themeFormControl(): Theme {
    return this.formPresentation?.get('theme')?.value;
  }

}
