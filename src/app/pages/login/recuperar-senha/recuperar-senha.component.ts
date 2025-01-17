import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../shared/services/LoginService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.scss'
})
export class RecuperarSenhaComponent {
  loginService = inject(LoginService);
  router = inject(Router)
  token: string | null = '';

  constructor(private _snackBar: MatSnackBar) { }

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  toLogin(){
    this.router.navigate(['/login']);
  }

  openSnackBar() {
    const message = 'Senha alterada com sucesso!';
    const action = 'OK';
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.toLogin();
    });
  }

  reset(pass: string, token: string){
    return this.loginService.resetPass(pass, token)
  }

  onSubmit() {
    if(this.resetPasswordForm.valid){
      this.loginService.forgetPassword(this.resetPasswordForm.value.email as string)
      .subscribe((res) => {
        if(res.status === 200){
          return this.reset(this.resetPasswordForm.value.newPassword as string, res.token)
              .subscribe(() => {
                this.openSnackBar();
                setTimeout(() => {
                  this.toLogin();
                }, 3000);
              })
        }else if(res.status === 404){
          this._snackBar.open('Informe um e-mail válido.', '', {
            duration: 3000,
          });
        }
        return
      })
    }else{
      this._snackBar.open('Preencha todos os campos', 'OK', {
        duration: 3000,
      });
    }
  }
}
