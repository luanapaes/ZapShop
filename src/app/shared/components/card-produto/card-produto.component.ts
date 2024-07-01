import { Component, Input} from '@angular/core';
import { ButtonAddToBagComponent } from '../button-add-to-bag/button-add-to-bag.component';

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
}
