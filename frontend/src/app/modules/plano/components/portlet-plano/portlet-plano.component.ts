import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import Plano from 'src/app/models/plano';

@Component({
  selector: 'smk-portlet-plano',
  templateUrl: './portlet-plano.component.html',
  styleUrls: ['./portlet-plano.component.scss']
})
export class PortletPlanoComponent
  implements OnInit {

  @Input() plano: Plano;

  @Output() eventAdiquirirPlano = new EventEmitter<Plano>();

  ngOnInit(): void { }

  onAdiquirirPlano(): void {
    this.eventAdiquirirPlano.emit(this.plano);
  }

  get atributosPlano(): Array<string> {
    return this.plano.atributos.split(';');
  }

}
