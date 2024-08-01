import { Component, inject } from '@angular/core';
import { ProdutosService } from '../../../shared/services/ProdutosService.service';
import { Produto } from '../../../shared/interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})

export class ProductTableComponent {
  produtosService = inject(ProdutosService)
  produtosArray: Produto[] = [];

  ngOnInit(): void {
    this.carregarProdutos()
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe(
      (produto: Produto[]) => {
        this.produtosArray = produto
      }
    )
  }

  deleteProduto(product_id: string): void {
    this.produtosService.deleteProductById(product_id).subscribe(
      () => {
        console.log('Produto excluído com sucesso');
        this.carregarProdutos()
      },
      (error) => {
        console.error('Erro ao excluir o produto:', error);
      }
    );
  }
}
