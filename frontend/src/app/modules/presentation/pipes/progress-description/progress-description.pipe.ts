import { PipeTransform, Pipe } from '@angular/core';
import { EventProgressPresentationEnum } from '@models/enum/event-progress-presentation.enum';

@Pipe({ name: 'progressDescriptionPipe', pure: false })
export class ProgressDescriptionPipe
  implements PipeTransform {

  transform(eventProgressPresentationEnum: EventProgressPresentationEnum): string {
    return EventProgressPresentationEnum.getDescription(eventProgressPresentationEnum);
  }

}
