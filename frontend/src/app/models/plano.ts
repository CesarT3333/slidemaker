export interface Plano {
  titulo: string;
  quantitativo: {
    quantidade: number,
    descricao: string
  };
  descricao: string;
  atributos: Array<string>;

}
