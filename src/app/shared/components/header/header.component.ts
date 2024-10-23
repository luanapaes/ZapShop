import { Component, Input, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { NavOptionsComponent } from './components/nav-options/nav-options.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatMenuModule, 
    NavOptionsComponent, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isHome: boolean = true;

  //verifica se tem token no localStorage
  adm: boolean = localStorage.getItem('token') !== null; 
  
  constructor(public dialog: MatDialog) {}

  openCart() {
    this.dialog.open(CartComponent).
    afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openUserDialog(){
    const dialogRef = this.dialog.open(UserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  open(){
    if(localStorage.length > 0){
      this.openCart()
    }else{
      this.openUserDialog()
    }
  }
}
