import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  matDialogRef = inject(MatDialogRef)

  //awnser true
  onYes() {
    this.matDialogRef.close(true);
  }

}
