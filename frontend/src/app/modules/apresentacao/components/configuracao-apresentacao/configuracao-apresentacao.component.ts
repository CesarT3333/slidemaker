import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl, Form } from '@angular/forms';
import { OnInit, Component, ViewChild } from '@angular/core';

import { finalize, delay, tap, switchMap } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';

import { ApresentacaoService } from 'src/app/services/apresentacao.service';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { DataSourceService } from 'src/app/services/data-sources.service';
import { FileReaderService } from 'src/app/services/file-reade.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EnumClientData } from 'src/app/models/enum-client-data';
import { IdiomService } from 'src/app/services/idiom.service';
import Apresentacao from '../../../../models/apresentacao';

@Component({
  templateUrl: './configuracao-apresentacao.component.html',
  styleUrls: ['./configuracao-apresentacao.component.scss']
})
export class ConfiguracaoApresentacaoComponent
  implements OnInit {

  @ViewChild('inputFile', { static: true }) inputFile;

  @ViewChild('form', { static: false }) form;

  private _presentations: Array<Apresentacao> = [];

  private _dataSources: Array<EnumClientData> = [];
  private _idioms: Array<EnumClientData> = [];

  private readonly _defaults = {
    DATASOURCE: 'WIKIPEDIA',
    IDIOM: 'PT_BR',
    AMOUNT_SLIDES: 20
  };

  formPresentation: FormGroup;

  constructor(
    private presentationService: ApresentacaoService,
    private handleErrorService: HandleErrorService,
    private dataSourceService: DataSourceService,
    private fileReaderService: FileReaderService,
    private snackBarService: SnackBarService,
    private loadingService: LoadingService,
    private idiomService: IdiomService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.startsMandatorySearches();
  }

  onSubmit() {
    if (this.formPresentation.valid) {
      this.loadingService.show();
      this.presentationService.create(<Apresentacao>this.formPresentation.value)
        .pipe(
          delay(2000),
          finalize(() => this.loadingService.dismiss()),
          switchMap(() => this.getAllSlides())
        ).subscribe(
          userpresentations => {
            this._presentations = userpresentations;
            this.resetFormDefault();
            this.snackBarService.show('Apresentação criada com sucesso');
          },
          error => this.handleErrorService.handle(error)
        );
    }

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
    return this.formPresentation.get(input).errors;
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

        textFormControl.setValue(null);
        textFormControl.setValidators(Validators.required);

        filenameFormControl.patchValue(null);
        filenameFormControl.setErrors(null);
        filenameFormControl.setValidators(null);
        break;

      case 'FILE':
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
      this.getAllSlides(),
      this.getDataSources(),
      this.getIdioms()
    ).pipe(
      finalize(() => {
        this.loadingService.dismiss();
        this.initForm();
      })
    ).subscribe();
  }

  private getAllSlides(): Observable<Array<Apresentacao>> {
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
        fileName: [{
          value: null,
          disabled: false
        }],
        text: null,
        term: [null, Validators.required],
        amountOfSlides: [
          this._defaults.AMOUNT_SLIDES,
          [
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ]
        ],
        idiom: [null, Validators.required],
        dataSource: [null, Validators.required],
      });

    this.setDatasourceToDefault();
    this.setIdiomToDefault();

  }

  private resetFormDefault(): void {
    this.form.resetForm();
    this.formPresentation.patchValue({
      term: null,
      text: null,
      fileName: null,
      amountOfSlides: this._defaults.AMOUNT_SLIDES,
      idiom: this._defaults.IDIOM,
      dataSource: this._defaults.DATASOURCE,
    });

    this.formPresentation.updateValueAndValidity();

  }

  private processesAttachedFile(): void {
    const file = this.inputFile.nativeElement.files[0];

    this.fileReaderService.readFileContent(file, (fileContent, error?) => {

      if (error) {
        console.log(error);
        this.snackBarService
          .show('Ocorreu um erro ao anexar o arquivo. Tente novamente');
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

}
