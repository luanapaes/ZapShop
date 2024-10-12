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
      this.productCart.nome_produto, this.productCart.produto_image,
      this.productCart.produto_preco, this.productCart.produto_descricao,
      this.productCart.nome_marca, this.productCart.categorias
    )
  }

}
