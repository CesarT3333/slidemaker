import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

import Presentation from '@models/presentation';

@Component({
  selector: 'smk-list-presentation',
  templateUrl: './list-presentation.component.html',
  styleUrls: ['./list-presentation.component.scss']
})
export class ListPresentationComponent
  implements OnInit {

  @Input() listPresentation: Array<Presentation> = [];

  @Output() eventCopy = new EventEmitter<Presentation>();
  @Output() eventAccessPresentation = new EventEmitter<Presentation>();

  ngOnInit(): void { }

}
