export type IdiomDataType = {
  name: IdiomEnum,
  clientData: string
};

export enum IdiomEnum {
  PT_PR = 'PT_BR',
  EN = 'EN'
}

export namespace IdiomEnum {
  export const getAllForCLientTest =
    (): Array<IdiomDataType> => ([
      { name: IdiomEnum.PT_PR, clientData: 'Português' },
      { name: IdiomEnum.EN, clientData: 'Inglês' },
    ]);
}
