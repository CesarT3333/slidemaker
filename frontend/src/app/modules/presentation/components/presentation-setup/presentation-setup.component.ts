import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { OnInit, Component, ViewChild } from '@angular/core';

import { finalize, delay, tap, switchMap, map } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';

import { ModalSuccessfulPresentationCreationComponent } from '../successful-presentation-creation.component/modal-successful-presentation-creation.component';
import { ModalProgressPresentationComponent } from '../modal-progress-presentation/modal-progress-presentation.component';
import { PresentationService } from '@services/rest/presentation.service';
import { DataSourceService } from '@services/rest/data-sources.service';
import { HandleErrorService } from '@services/handle-error.service';
import { amountOfSlidesListDefaultValues } from '@utils/constants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileReaderService } from '@services/file-reade.service';
import { BillingPlanEnum } from '@models/enum/billing-plan.enum';
import { IdiomService } from '@services/rest/idiom.service';
import { CoverService } from '@services/rest/cover.service';
import { LoadingService } from '@services/loading.service';
import { EnumClientData } from '@models/enum-client-data';
import { DialogService } from '@services/dialog.service';
import { UserService } from '@services/user.service';
import { Subscription } from '@models/subscription';
import Presentation from '@models/presentation';
import { Theme } from '@models/theme';
import { Cover } from '@models/cover';

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
  showNewFlag = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  imageToShow: any;

  themeByPresentation: Theme;
  idPlanUser: number;

  private _presentations: Array<Presentation> = [];
  private _dataSources: Array<EnumClientData> = [];
  private _idioms: Array<EnumClientData> = [];
  private _themes: Array<string> = [];
  private _userSubscription: Subscription;

  private readonly _defaults = {
    DATASOURCE: 'WIKIPEDIA',
    IDIOM: 'PT_BR',
    AMOUNT_SLIDES: 20,
    thankSlide: true,
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
    private coverService: CoverService,
    private idiomService: IdiomService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.startsMandatorySearches();
  }

  onCopyPresentation(selectedPresentation: Presentation): void {
    this.loadingService.show();
    this.presentationService.getById(selectedPresentation.id)
      .pipe(
        delay(1000),
        finalize(() => this.loadingService.dismiss())
      ).subscribe(
        presentation => this.buildFormByPresentation(presentation),
        error => this.handleErrorService.handle(error)
      );
  }

  onAccessPresentation($event: Presentation): void {
    window.open(
      `https://docs.google.com/presentation/d/${$event.idGoogle}`,
      '_blank'
    );
  }

  onSubmit() {
    if (this.formPresentation.valid) {
      this.formPresentation.patchValue({ id: null });

      const modalProgressPresentation: MatDialogRef<ModalProgressPresentationComponent> =
        this.openModalProgressPresentation();

      const formPresentationValue: Presentation = this.formPresentation.value;

      this.presentationService.create(formPresentationValue)
        .pipe(
          finalize(() => modalProgressPresentation.close()),

          tap((newPresentation: Presentation) =>
            this.openModalSuccessfulPresentationCreation(newPresentation.idGoogle)),
          switchMap(() => this.getUserSubscription()),
          switchMap(() => this.getAllPresentations())
        ).subscribe(
          userpresentations => {
            this._presentations = userpresentations;
            this.resetFormDefault();
            this.showNewFlag = true;
          },
          error => this.handleErrorService.handle(error)
        );
    }

  }

  onProducesImageCover(): void {
    const cover: Cover = this.formPresentation.get('cover').value;
    const theme: Theme = this.formPresentation.get('theme').value;

    this.coverService.producesCoverImage(<Cover>{
      title: cover.title,
      subTitle: cover.subTitle,
      themeId: theme.id
    }).subscribe(
      imageBlob => this.fileReaderService.createImageFromBlob(
        imageBlob,
        result => this.imageToShow = result
      ),
      error => this.handleErrorService.handle(error)
    );
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

  onDeletePresentation(): void {
    this.loadingService.show();
    this.getAllPresentations()
      .pipe(finalize(() => this.loadingService.dismiss())
      ).subscribe();
  }

  onStepChange($event): void {
    if ($event.selectedIndex === 2) {
      this.onProducesImageCover();
    }
  }

  private openModalSuccessfulPresentationCreation(googleIdPresentation: string): void {
    this.dialog.open(ModalSuccessfulPresentationCreationComponent, {
      data: { googleIdPresentation: googleIdPresentation }
    });
  }

  private openModalProgressPresentation(): MatDialogRef<ModalProgressPresentationComponent> {
    return this.dialog.open(ModalProgressPresentationComponent, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
    });
  }

  private buildFormByPresentation(presentation: Presentation): void {
    this.resetFormDefault();
    this.themeByPresentation = presentation.theme;
    this.formPresentation.patchValue({ ...presentation });
    this.formPresentation.updateValueAndValidity();
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
      this.getUserSubscription(),
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

  private getUserSubscription(): Observable<Subscription> {
    return this.userService.subsctiptionUser()
      .pipe(tap(subscription => this._userSubscription = subscription));
  }

  private getAllPresentations(): Observable<any> {
    return this.presentationService.getAllOfTheUser()
      .pipe(
        switchMap(presentations => {

          const requests: Array<Observable<any>> = [];

          presentations.forEach(p => {
            (<Cover>p.cover).themeId = p.theme.id;
            requests.push(this.coverService.producesCoverImage(p.cover)
              .pipe(
                tap(imageBlob => this.fileReaderService.createImageFromBlob(imageBlob,
                  result => p.cover.imageMiniature = result))
              ));
          });

          return concat(...requests).pipe(
            finalize(() => this._presentations = presentations)
          );

        }),

      );
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

    const amountOfSlidesValues: number =
      this._userSubscription.plan.id === 4 ?
        15 : this._defaults.AMOUNT_SLIDES;

    const amountOfSlidesDisabled: boolean =
      !!(this._userSubscription.plan.id === 4);

    this.formPresentation =
      this.formBuilder.group({
        id: null,
        term: [null, Validators.required],
        text: null,
        thankSlide: [true],
        amountOfSlides: [
          {
            value: amountOfSlidesValues,
            disabled: amountOfSlidesDisabled
          },
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

    const amountOfSlidesValues: number =
      this._userSubscription.plan.id === 4 ?
        15 : this._defaults.AMOUNT_SLIDES;

    this.form.resetForm();
    this.formPresentation.patchValue({
      term: null,
      text: null,
      amountOfSlides: amountOfSlidesValues,
      fileName: null,
      thankSlide: this._defaults.thankSlide,
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

  get themes(): Array<string> {
    return this._themes;
  }

  get themeFormControl(): Theme {
    return this.formPresentation?.get('theme')?.value;
  }

  get amountOfSlidesListValues(): Array<number> {
    return amountOfSlidesListDefaultValues;
  }

  get amountPresentations(): number {
    return this._userSubscription?.amountPresentation;
  }

  get isStartupPlan(): boolean {
    return this._userSubscription?.plan.billingType === BillingPlanEnum.PRESENTATION;
  }
}
