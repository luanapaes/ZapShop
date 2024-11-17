import { Component, inject } from '@angular/core';
import { ConfirmDeleteComponent } from '../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-marca',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirm-delete-marca.component.html',
  styleUrl: './confirm-delete-marca.component.scss'
})
export class ConfirmDeleteMarcaComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  matDialogRef = inject(MatDialogRef)

  //awnser true
  onYes() {
    this.matDialogRef.close(true);
  }
}
