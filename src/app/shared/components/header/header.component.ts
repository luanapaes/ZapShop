import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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
}
