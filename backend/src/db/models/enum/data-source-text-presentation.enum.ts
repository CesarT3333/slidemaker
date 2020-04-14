import { EnumClientData } from '../enum-client-data';

export enum DataSourceTextPresentationEnum {
  FILE = 'FILE',
  TXT = 'TXT',
  WIKIPEDIA = 'WIKIPEDIA',
}

export namespace DataSourceTextPresentationEnum {
  export const getAllForClient =
    (): Array<EnumClientData> => ([
      { name: DataSourceTextPresentationEnum.FILE, clientData: 'Arquivo' },
      { name: DataSourceTextPresentationEnum.TXT, clientData: 'Texto' },
      { name: DataSourceTextPresentationEnum.WIKIPEDIA, clientData: 'Wikipedia' }
    ]);
}
