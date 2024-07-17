import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  disabled: boolean = true

  verificar(){
    if (this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.disabled = false;
      console.log("Enviado")
    }else{
      this.disabled = true;
      console.log("não enviado");
    }
  }

  save() {
    const firstFormData = this.firstFormGroup.value;
    const secondFormData = this.secondFormGroup.value;

    localStorage.setItem('firstFormGroup', JSON.stringify(firstFormData));
    localStorage.setItem('secondFormGroup', JSON.stringify(secondFormData));

    console.log('Dados salvos no localStorage.');
  }

  constructor(private _formBuilder: FormBuilder) { }
}
