import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProdutosService } from '../../../shared/services/ProdutosService.service';
import { Produto } from '../../../shared/interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MarcasService } from '../../../shared/services/MarcasService.service';

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

  marcasService = inject(MarcasService);
  nomeMarca: string = '';

  router = inject(Router)

  ngOnInit(): void {
    this.carregarProdutos()
  }

  //carrega nome da marca pelo id 
  getMarcaByID(id: number) {
    this.marcasService.getMarcaByID(id).subscribe(
      (marca) => {
        this.nomeMarca = marca.nome_marca
      }
    )
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe(
      (produto: Produto[]) => {
        produto.map((prod) => this.getMarcaByID(prod.marcaId!)) //carrega nome da marca
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

  onEdit(produto: Produto) {
    console.log(produto)
    this.router.navigate(['edit-product', produto.produto_id])
  }
}
