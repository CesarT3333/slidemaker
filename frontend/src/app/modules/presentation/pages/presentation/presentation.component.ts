import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <smk-header-toolbar></smk-header-toolbar>
    <div class="intro">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent
  implements OnInit {

  ngOnInit(): void { }

}
