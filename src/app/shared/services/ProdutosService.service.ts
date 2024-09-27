import { inject, Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {
    httpClient = inject(HttpClient);

    apiUrl = "/api/produtos";

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

    getProdutoById(product_id: string){
        return this.httpClient.get<Produto>(`${this.apiUrl}?product_id=${product_id}`)
    }

    editProduct(id: string, payload: Produto) {
        return this.httpClient.put(`/api/products/${id}`, payload)
    }

    deleteProductById(product_id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}?product_id=${product_id}`);
    }
}
