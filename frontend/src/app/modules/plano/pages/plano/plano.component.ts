import { OnInit, Component } from '@angular/core';

import { UsuarioService } from '../../../../services/usuario.service';
import { ApiService } from '../../../../services/api.service';
import { Plano } from 'src/app/models/plano';

@Component({
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.scss']
})
export class PlanoComponent
  implements OnInit {

  constructor(
    private apiService: ApiService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void { }

  logout() {
    document.location.href =
      'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000';
    localStorage.removeItem('token');
  }

  onClickButton(): void {
    this.apiService.teste()
      .subscribe(res => { });
  }

  get planos(): Array<Plano> {
    return [
      {
        titulo: 'startup',
        quantitativo: { quantidade: 5, descricao: 'Por Apresentação' },
        descricao: 'Escolha a quantidade de apresentações que você precisa.' +
          ' O preço varia pela quantidade de slides que vocẽ deseja',
        atributos: [
          'Configuração de Capa', 'Apresentação em Português'
        ]
      },

      {
        titulo: 'pro',
        quantitativo: { quantidade: 10, descricao: 'Por mês' },
        descricao: 'Apresentações ilimitadas para todas as horas, com a quantidade' +
          ' de slides que voê deseja',
        atributos: [
          'Apresentações ilimitadas',
          'Configuração de Capa',
          'Apresentação em Português',
        ]
      },

      {
        titulo: 'enterprise',
        quantitativo: { quantidade: 15, descricao: 'Por mês' },
        descricao: 'A ferramenta completa para todos os tipos de apresentações' +
          ' de slides que voê deseja',
        atributos: [
          'Apresentações ilimitadas',
          'Configuração de Capa',
          'Apresentação em Português, Espanhol e Inglês',
          'Personalização de plano de fundo dos slides',
        ]
      }
    ];
  }

}
