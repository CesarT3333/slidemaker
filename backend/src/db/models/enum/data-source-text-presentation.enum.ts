export type DataSourceTextPresentationDataType = {
  [key in DataSourceTextPresentationEnum]: string
};

export enum DataSourceTextPresentationEnum {
  FILE = 'FILE',
  TXT = 'TXT',
  WIKIPEDIA = 'WIKIPEDIA',
}

export namespace DataSourceTextPresentationEnum {
  export const getAllForClient =
    (): DataSourceTextPresentationDataType => ({
      FILE: 'Arquivo',
      TXT: 'Texto',
      WIKIPEDIA: 'Wikipedia'
    });
}
