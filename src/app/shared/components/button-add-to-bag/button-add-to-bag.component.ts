import { Component, Input, inject } from '@angular/core';
import { Produto } from '../../interfaces/produto.interface';
import { CarrinhoService } from '../../services/CarrinhoService.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-button-add-to-bag',
  standalone: true,
  imports: [],
  templateUrl: './button-add-to-bag.component.html',
  styleUrl: './button-add-to-bag.component.scss'
})
export class ButtonAddToBagComponent {
  @Input() productCart!: Produto;
  carrinhoService = inject(CarrinhoService);
  matSnackBar = inject(MatSnackBar)

  addProductToBag() {
    this.matSnackBar.open("Produto adicionado ao carrinho", "OK")
    this.carrinhoService.addProductToBag(
      this.productCart.product_id, this.productCart.product_name, this.productCart.product_image,
      this.productCart.product_price, this.productCart.product_description, 
      this.productCart.product_marca,this.productCart.product_categoria
    )
  }

}
