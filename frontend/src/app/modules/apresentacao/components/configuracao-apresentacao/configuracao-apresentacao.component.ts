import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { OnInit, Component, ViewChild } from '@angular/core';

import { finalize, delay } from 'rxjs/operators';

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

  private _slides: Array<Apresentacao> = [];

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
    // aqui vamos chamar a procedure para carregar as apresentações
    // já criadas pelo usuário e jogar na lista.
    this.getAllSlides();
    this.initForm();

    this.getIdioms();
    this.getDataSources();
  }

  onSubmit() {
    if (this.formPresentation.valid) {
      this.loadingService.show();
      this.presentationService.create(<Apresentacao>this.formPresentation.value)
        .pipe(
          delay(2000),
          finalize(() => {
            this.resetFormDefault();
            this.loadingService.dismiss();
            this.snackBarService.show('Apresentação criada com sucesso');
          })
        ).subscribe(
          apresentacaoCriada => console.log(apresentacaoCriada),
          error => this.handleErrorService.handle(error)
        );
    }

  }

  clickCreateSlide(): void {
    // aqui vamos salvar os dados, e criar o registro no banco
  }

  enableDisableFile($event): void {
    // var select = document.getElementById('typeFile');

    console.log($event); // pt
  }

  onClickAnexarArquivoButton($event) {
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

  // TODO: CONCAT SUBJECTS
  private getAllSlides(): void {
    this.loadingService.show();
    this.presentationService.buscarSlides()
      .pipe(finalize(() => this.loadingService.dismiss()))
      .subscribe(
        slides => this._slides = slides,
        error => this.handleErrorService.handle(error)
      );
  }

  // TODO: CONCAT SUBJECTS
  private getDataSources() {
    this.dataSourceService.getAll()
      .pipe(

        finalize(() =>
          this.formPresentation
            .patchValue({
              dataSource: this._dataSources
                .find(i => i.name === this._defaults.DATASOURCE).name
            }))

      ).subscribe(
        dataSources => this._dataSources = dataSources,
        errors => this.handleErrorService.handle(errors)
      );
  }

  // TODO: CONCAT SUBJECTS
  private getIdioms() {
    this.idiomService.getAll()
      .pipe(

        finalize(() => this.formPresentation
          .patchValue({
            idiom: this._idioms
              .find(i => i.name === this._defaults.IDIOM).name
          }))

      ).subscribe(
        idioms => this._idioms = idioms,
        errors => this.handleErrorService.handle(errors)
      );
  }

  private initForm() {
    this.formPresentation =
      this.formBuilder.group({
        fileName: null,
        text: null,
        term: [null, Validators.required],
        amountOfSlides: [
          // TODO: Fazer validação de campo permitir somente números
          this._defaults.AMOUNT_SLIDES,
          Validators.required
        ],
        idiom: [null, Validators.required],
        dataSource: [null, Validators.required],
      });
  }

  private resetFormDefault(): void {
    this.formPresentation.patchValue({
      fileName: null,
      text: null,
      term: null,
      amountOfSlides: this._defaults.AMOUNT_SLIDES,
      idiom: this._defaults.IDIOM,
      dataSource: this._defaults.DATASOURCE,
    });

    this.formPresentation.setErrors(null);
    this.formPresentation.get('term').setErrors(null);
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

}
