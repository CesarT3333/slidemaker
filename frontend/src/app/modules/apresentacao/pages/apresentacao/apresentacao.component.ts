import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <smk-header-toolbar></smk-header-toolbar>
    <div class="intro">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent
  implements OnInit {

  ngOnInit(): void { }

}
