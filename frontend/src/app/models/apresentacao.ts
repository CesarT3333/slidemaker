import { Theme } from './theme';

export default interface Apresentacao {
  id?: number;
  term: string;
  amountOfSlides: number;
  idiom: string;
  dataSource: string;
  text: string;
  theme: Theme;
}
