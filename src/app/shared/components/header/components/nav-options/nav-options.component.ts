import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-options',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, NgStyle],
  templateUrl: './nav-options.component.html',
  styleUrl: './nav-options.component.scss'
})
export class NavOptionsComponent {
  constructor(private router: Router){}
  
  @Input() isADM: boolean = true;

  goToAddProdutos() {
    this.router.navigate(['cadastrar-produto'])
  }

  goToAdmPage() {
    this.router.navigate(['area-adm'])
  }
}
