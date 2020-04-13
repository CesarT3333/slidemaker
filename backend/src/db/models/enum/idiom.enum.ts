export type IdiomDataType = { [key in IdiomEnum]: string };

export enum IdiomEnum {
  PT_PR = 'PT_BR',
  EN = 'EN'
}

export namespace IdiomEnum {
  export const getAllForCLientTest =
    (): IdiomDataType => ({
      EN: 'Inglês',
      PT_BR: 'Português'
    });
}
