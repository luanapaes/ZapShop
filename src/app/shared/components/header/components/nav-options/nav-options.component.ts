import { NgStyle } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/LoginService.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-options',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, NgStyle],
  templateUrl: './nav-options.component.html',
  styleUrl: './nav-options.component.scss'
})
export class NavOptionsComponent {
  loginService = inject(LoginService)
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ){}
  
  @Input() isADM: boolean = true;

  goToAddProdutos() {
    this.router.navigate(['cadastrar-produto'])
  }

  goToAdmPage() {
    this.router.navigate(['area-adm'])
  }

  goToMarcas(){
    this.router.navigate(['marcas'])
  }

  deslogar(){
    this._snackBar.open('Saindo..', '', {
      duration: 1200
    });
    setTimeout(() => {
      this.loginService.deslogar()
    }, 2000);
  }
}
