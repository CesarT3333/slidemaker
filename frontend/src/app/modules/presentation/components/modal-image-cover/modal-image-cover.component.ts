import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Component, Inject } from '@angular/core';

@Component({
  templateUrl: './modal-image-cover.component.html',
  styleUrls: ['./modal-image-cover.component.scss'],
})
export class ModalImageCoverComponent
  implements OnInit {

  imageToShow: any;

  constructor(
    private dialogRef: MatDialogRef<ModalImageCoverComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { this.imageToShow = data; }

  ngOnInit(): void { }

}
