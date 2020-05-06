import { Pipe, PipeTransform } from '@angular/core';
import Presentation from '@models/presentation';

@Pipe({ name: 'sortByDatePipe' })
export class SortByDatePipe
  implements PipeTransform {

  transform(presentations: Array<Presentation>): any {
    return presentations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

}
