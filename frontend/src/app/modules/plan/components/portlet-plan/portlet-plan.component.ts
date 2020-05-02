import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

import Plan from '@models/plan';

@Component({
  selector: 'smk-portlet-plan',
  templateUrl: './portlet-plan.component.html',
  styleUrls: ['./portlet-plan.component.scss']
})
export class PortletPlanComponent
  implements OnInit {

  @Input() plan: Plan;

  @Output() eventPurchasePlan = new EventEmitter<Plan>();

  ngOnInit(): void { }

  onPurchasePlan(): void {
    this.eventPurchasePlan.emit(this.plan);
  }

  get attributesPlan(): Array<string> {
    return this.plan.attributes.split(';');
  }

}
