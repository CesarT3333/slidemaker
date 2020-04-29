import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ConfiguracaoApresentacaoComponent } from './components/configuracao-apresentacao/configuracao-apresentacao.component';
import { ApresentacaoComponent } from './pages/apresentacao/apresentacao.component';

const configuracaoApresentacaoRoutes: Routes = [
  {
    path: '', component: ApresentacaoComponent, children: [
      { path: '', component: ConfiguracaoApresentacaoComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(configuracaoApresentacaoRoutes)
  ],
  exports: [RouterModule]
})
export class ApresentacaoRoutingModule { }
