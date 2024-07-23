import { inject, Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {
    httpClient = inject(HttpClient);

    apiUrl:string = 'http://localhost:3000/produtos'

    // addNewProduct(id: string, nomeProduto: string, productImage: string,
    //     precoProduto: number, descricaoProduto: string, marcaProduto: string, categoriaProduto: string[]){

    //     const produto: Produto = {
    //         product_id: id,
    //         product_name: nomeProduto,
    //         product_image: productImage,
    //         product_price: precoProduto,
    //         product_description: descricaoProduto,
    //         product_marca: marcaProduto,
    //         product_categoria: categoriaProduto
    //     }

    //     this.arrayProducts.push(produto);
    // }

    addNewProduct(id: string, nomeProduto: string, productImage: string,
        precoProduto: number, descricaoProduto: string, marcaProduto: string, categoriaProduto: string[]) {

        const produto: Produto = {
            product_id: id,
            product_name: nomeProduto,
            product_image: productImage,
            product_price: precoProduto,
            product_description: descricaoProduto,
            product_marca: marcaProduto,
            product_categoria: categoriaProduto
        }

        return this.httpClient.post<Produto>(this.apiUrl, produto)
    }

    getProdutos() {
        return this.httpClient.get<Produto[]>(this.apiUrl)
    }

}
