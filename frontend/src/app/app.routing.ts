import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AssinaturaUsuarioGuard } from './services/guards/assinatura-usuario.guard';
import { UsuarioLogadoGuard } from './services/guards/usuario-logado.guard';

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
        canActivate: [UsuarioLogadoGuard],
        loadChildren: () => import(`./modules/plano/plano.module`)
          .then(m => m.PlanoModule)
      },
      {
        path: 'apresentacao',
        canActivate: [
          UsuarioLogadoGuard,
          AssinaturaUsuarioGuard
        ],
        loadChildren: () => import(`./modules/apresentacao/apresentacao.module`)
          .then(m => m.ApresentacaoModule)
      },
      {
        path: 'pagamento',
        canActivate: [UsuarioLogadoGuard],
        loadChildren: () => import(`./modules/pagamento/pagamento.module`)
          .then(m => m.PagamentoMocule)
      }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
