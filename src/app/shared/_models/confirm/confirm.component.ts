import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { text: string, buttons: { confirm: string, cancel: string } },
    public ref: MatDialogRef<ConfirmComponent>
  ) { }
  
}