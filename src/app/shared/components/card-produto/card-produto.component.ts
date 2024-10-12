import { Component, inject, Input } from '@angular/core';
import { ButtonAddToBagComponent } from '../button-add-to-bag/button-add-to-bag.component';
import { Produto } from '../../interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';
import { MarcasService } from '../../services/MarcasService.service';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [ButtonAddToBagComponent, CurrencyPipe],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss'
})
export class CardProdutoComponent {
  @Input() productId?: number;
  @Input() productName: string = '';
  @Input() productImage: string = '';
  @Input() productPrice: number = 0;
  @Input() productDescription: string = '';
  @Input() productCategory: string = '';
  @Input() productMarca: string = '';
  @Input() marcaID?: number;

  product!: Produto;
  nomeMarca: string = '';
  marcasService = inject(MarcasService);

  getMarcaByID(id: number) {
    this.marcasService.getMarcaByID(id).subscribe(
      (marca) => {
        this.nomeMarca = marca.nome_marca
      }
    )
  }

  constructor(){}

  ngOnInit(): void {
    if (this.marcaID !== undefined) {
      this.getMarcaByID(this.marcaID);

      // A inicialização do produto ocorre após a resposta da marca
      this.marcasService.getMarcaByID(this.marcaID).subscribe((marca) => {
        this.nomeMarca = marca.nome_marca;

        // Inicialize o produto com nomeMarca após a resposta
        this.product = {
          nome_produto: this.productName,
          produto_image: this.productImage,
          produto_preco: this.productPrice,
          produto_descricao: this.productDescription,
          nome_marca: this.nomeMarca,
          categorias: this.productCategory
        };
      });
    } else {
      console.log('marcaID está undefined');
    }
  }

}
