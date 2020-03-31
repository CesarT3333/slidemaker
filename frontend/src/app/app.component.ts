import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <smk-loading *ngIf="loading"></smk-loading>
  `
})
export class AppComponent
  implements OnInit {

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void { }

  get loading(): boolean {
    return this.loadingService.loading;
  }

}
