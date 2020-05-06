import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PresentationSetupComponent } from './components/presentation-setup/presentation-setup.component';
import { PresentationComponent } from './pages/presentation/presentation.component';

const presentationSetupRoutes: Routes = [
  {
    path: '', component: PresentationComponent, children: [
      { path: '', component: PresentationSetupComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(presentationSetupRoutes)
  ],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
