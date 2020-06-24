import { Theme } from './theme';
import { Cover } from './cover';

export default interface Presentation {
  id?: number;
  term: string;
  amountOfSlides: number;
  idiom: string;
  dataSource: string;
  text: string;
  theme: Theme;
  cover: Cover;
  createdAt: Date;
  thankSlide: boolean;

  idGoogle: string;
}
