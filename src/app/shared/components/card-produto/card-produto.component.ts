import { Component, Input } from '@angular/core';
import { ButtonAddToBagComponent } from '../button-add-to-bag/button-add-to-bag.component';
import { Produto } from '../../interfaces/produto.interface';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [ButtonAddToBagComponent],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss'
})
export class CardProdutoComponent {
  @Input() productId: string = '';
  @Input() productName: string = '';
  @Input() productPrice: string = '';
  @Input() productDescription: string = '';
  @Input() productCategory: string = '';
  @Input() productMarca: string = '';

  product!: Produto;

  constructor(){}

  ngOnInit(): void {
    this.product = {
      product_id: this.productId,
      product_name: this.productName,
      product_price: this.productPrice,
      product_description: this.productDescription,
      product_marca: this.productMarca,
      product_categoria: this.productCategory
    }
  }
}
