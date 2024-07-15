import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto.interface';
import { CartProduct } from '../interfaces/cart-product.interface';

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    private produtosCarrinho: CartProduct[] = [];

    addProductToBag(productId: string, productName: string, productImage: string, productPrice: number, productDescription: string, productMarca: string, productCartegory: string[]) {
        const product: CartProduct = {
            product_id: productId,
            product_name: productName,
            qtd_product: 1,
            product_image: productImage,
            product_price: productPrice,
            product_description: productDescription,
            product_marca: productMarca,
            product_categoria: productCartegory
        };

        this.produtosCarrinho.push(product);
    }

    getProdutosCarrinho(): CartProduct[] {
        return this.produtosCarrinho;
    }

    delete(id: string): Produto | undefined {
        return this.produtosCarrinho.find(produto => produto.product_name === id);
    }

    // delete(name: string): void {
    //     this.produtosCarrinho = this.produtosCarrinho.filter(produto => produto.product_name !== name);
    // }
}
