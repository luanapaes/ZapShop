import { Component, Input } from '@angular/core';
import { ButtonAddToBagComponent } from '../button-add-to-bag/button-add-to-bag.component';
import { Produto } from '../../interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [ButtonAddToBagComponent, CurrencyPipe],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss'
})
export class CardProdutoComponent {
  @Input() productId: string = '';
  @Input() productName: string = '';
  @Input() productImage: string = '';
  @Input() productPrice: number = 0;
  @Input() productDescription: string = '';
  @Input() productCategory: string[] = [];
  @Input() productMarca: string = '';

  product!: Produto;

  constructor(){}

  ngOnInit(): void {
    this.product = {
      product_id: this.productId,
      product_name: this.productName,
      product_image: this.productImage,
      product_price: this.productPrice,
      product_description: this.productDescription,
      product_marca: this.productMarca,
      product_categoria: this.productCategory
    }
    console.log(this.product)
  }
}
