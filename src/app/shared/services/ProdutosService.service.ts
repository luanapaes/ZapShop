import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto.interface';

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {
    private arrayProducts: Produto[] = [];

    addNewProduct(id: string, nomeProduto: string, 
        precoProduto: number, descricaoProduto: string, marcaProduto: string, categoriaProduto: string){
        
        const produto: Produto = {
            product_id: id,
            product_name: nomeProduto,
            product_price: precoProduto,
            product_description: descricaoProduto,
            product_marca: marcaProduto,
            product_categoria: categoriaProduto
        }

        this.arrayProducts.push(produto);
    }

    getProdutos(): Produto[]{
        return this.arrayProducts;
    }
}
