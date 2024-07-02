import { Component, signal } from '@angular/core';
import { CardProdutoComponent } from '../../shared/components/card-produto/card-produto.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Produto } from '../../shared/interfaces/produto.interface';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CardProdutoComponent, HeaderComponent, FooterComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  public productsList = signal<Produto[]>([
    {
      product_id: '10',
      product_name: 'Floratta Rose',
      product_price: '130,00',
      product_description: 'Perfume feminino de alta fixação ideal para o dia.',
      product_marca: 'oBoticário',
      product_categoria: 'Perfume'
    },
    {
      product_id: '11',
      product_name: 'Malbec Strong',
      product_price: '210,00',
      product_description: 'Perfume feminino de alta fixação ideal para o dia.',
      product_marca: 'oBoticário',
      product_categoria: 'Perfume'
    }, 
    {
      product_id: '12',
      product_name: 'Kit Todo dia',
      product_price: '75,00',
      product_description: 'Perfume feminino de alta fixação ideal para o dia.',
      product_marca: 'Natura',
      product_categoria: 'Kit'
    } ,
    {
      product_id: '11',
      product_name: 'Malbec Strong',
      product_price: '210,00',
      product_description: 'Perfume feminino de alta fixação ideal para o dia.',
      product_marca: 'oBoticário',
      product_categoria: 'Perfume'
    }, 
    {
      product_id: '12',
      product_name: 'Kit Todo dia',
      product_price: '75,00',
      product_description: 'Perfume feminino de alta fixação ideal para o dia.',
      product_marca: 'Natura',
      product_categoria: 'Kit'
    } ,
    {
      product_id: '11',
      product_name: 'Malbec Strong',
      product_price: '210,00',
      product_description: 'Perfume feminino de alta fixação ideal para o dia.',
      product_marca: 'oBoticário',
      product_categoria: 'Perfume'
    }, 
    {
      product_id: '12',
      product_name: 'Kit Todo dia',
      product_price: '75,00',
      product_description: 'Perfume feminino de alta fixação ideal para o dia.',
      product_marca: 'Natura',
      product_categoria: 'Kit'
    } 

  ])
}
