import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto.interface';

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    private produtosCarrinho: Produto[] = [];

    addProductToBag(productId: string, productName: string, productPrice: string, productDescription: string, productMarca: string, productCartegory: string) {
        const product: Produto = {
            product_id: productId,
            product_name: productName,
            product_price: productPrice,
            product_description: productDescription,
            product_marca: productMarca,
            product_categoria: productCartegory
        };

        this.produtosCarrinho.push(product);
    }

    getProdutosCarrinho(): Produto[] {
        return this.produtosCarrinho;
    }
}
