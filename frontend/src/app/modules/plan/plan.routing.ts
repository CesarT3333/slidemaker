import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlanComponent } from './pages/plan/plan.component';

const planRoutes: Routes = [
  { path: '', component: PlanComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(planRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlanRoutingModule { }
