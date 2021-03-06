import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,) { }
  public confirmMessage:string;
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(){
    console.log("confirm");
    
  }


}
