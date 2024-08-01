import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isHome: boolean = true;
  
  constructor(public dialog: MatDialog, private router: Router) { }

  openCart() {
    this.dialog.open(CartComponent).
    afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goToAddProdutos(){
    this.router.navigate(['cadastrar-produto'])
  }

  goToAdmPage(){
    this.router.navigate(['area-adm'])
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
