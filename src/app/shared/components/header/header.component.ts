import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isHome: boolean = true;
  constructor(public dialog: MatDialog) { }

  openCart() {
    this.dialog.open(CartComponent).
    afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
