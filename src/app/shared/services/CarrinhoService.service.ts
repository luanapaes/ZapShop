import { Injectable } from '@angular/core';
import { CartProduct } from '../interfaces/cart-product.interface';

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    private produtosCarrinho: CartProduct[] = [];

    addProductToBag(nomeProduto: string, productImage: string,
        precoProduto: number, descricaoProduto: string, marcaProduto: string, categoriaProduto: string) {
        const product: CartProduct = {
            qtd_product: 1,
            nome_produto: nomeProduto,
            produto_image: productImage,
            produto_preco: precoProduto,
            produto_descricao: descricaoProduto,
            nome_marca: marcaProduto,
            categorias: categoriaProduto
        };

        this.produtosCarrinho.push(product);
    }

    getProdutosCarrinho(): CartProduct[] {
        return this.produtosCarrinho;
    }

    // delete(name: string): void {
    //     this.produtosCarrinho = this.produtosCarrinho.filter(produto => produto.product_name !== name);
    // }
}
