import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalConfirmsAcquisitionComponent } from './components/modal-confirms-acquisition/modal-confirms-acquisition.component';
import { PlanBillingTypePipe } from './pipes/plan-billing-type/plan-billing-type.pipe';
import { PortletPlanComponent } from './components/portlet-plan/portlet-plan.component';
import { PlanComponent } from './pages/plan/plan.component';
import { PlanService } from '@services/rest/plan.service';
import { PlanRoutingModule } from './plan.routing';

@NgModule({
  imports: [
    ReactiveFormsModule,
    PlanRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    FormsModule,
  ],
  entryComponents: [
    ModalConfirmsAcquisitionComponent
  ],
  declarations: [
    ModalConfirmsAcquisitionComponent,
    PortletPlanComponent,
    PlanBillingTypePipe,
    PlanComponent,
  ],
  providers: [PlanService]
})
export class PlanModule { }
