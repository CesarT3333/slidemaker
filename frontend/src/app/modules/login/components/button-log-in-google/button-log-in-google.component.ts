import { OnInit, Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'smk-button-log-in-google',
  templateUrl: './button-log-in-google.component.html',
  styleUrls: ['./button-log-in-google.component.scss']
})
export class ButtonLogInGoogleComponent
  implements OnInit {

  @Output() eventClickButtonLogin: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { }

}
