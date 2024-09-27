import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../shared/services/LoginService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  myLoginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  onSubmit() {
    console.log(this.myLoginForm.value.email,
      this.myLoginForm.value.password)
    if (this.myLoginForm.valid) {
      this.loginService.logar(
        this.myLoginForm.value.email,
        this.myLoginForm.value.password,
      ).subscribe(() => {
        this.router.navigate(['produtos'])
      })
    } else {
      console.log("Não enviado.")
    }
  }
}
