import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () => import(`./modules/login/login.module`)
          .then(m => m.LoginModule)
      },
      {
        path: 'planos',
        loadChildren: () => import(`./modules/plano/plano.module`)
          .then(m => m.PlanoModule)
      },
      {
        path: 'configuracao-apresentacao',
        loadChildren: () => import(`./modules/configuracao-apresentacao/configuracao-apresentacao.module`)
          .then(m => m.ConfiguracaoApresentacaoModule)
      }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
