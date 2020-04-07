import { OnInit, Component, Input } from '@angular/core';
import Plano from 'src/app/models/plano';

@Component({
  selector: 'smk-portlet-plano',
  templateUrl: './portlet-plano.component.html',
  styleUrls: ['./portlet-plano.component.scss']
})
export class PortletPlanoComponent
  implements OnInit {

  @Input() plano: Plano;

  ngOnInit(): void { }

  get atributosPlano(): Array<string> {
    return this.plano.atributos.split(';');
  }

}
