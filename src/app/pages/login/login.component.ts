import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/LoginService.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  constructor(private _snackBar: MatSnackBar){}

  myLoginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  onSubmit() {
    if (this.myLoginForm.valid) {
      this.loginService.logar(
        this.myLoginForm.value.email as string,
        this.myLoginForm.value.password as string,
      ).subscribe(() => {
        this._snackBar.open('Aguarde..', '', {
          duration: 1200
        });
        setTimeout(() => {
          this.router.navigate(['produtos'])
        }, 2000);
      })
    } else {
      console.log("Não enviado.")
    }
  }
}
