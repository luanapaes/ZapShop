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

    addNewProduct(nomeProduto: string, produto_imagem: File, precoProduto: number, descricaoProduto: string, marcaProduto: string, categoriaProduto: string) {
        
        // criando um  FormData
        const formData = new FormData();

        formData.append('nome_produto', nomeProduto);
        formData.append('produto_preco', precoProduto.toString());
        formData.append('produto_descricao', descricaoProduto);
        formData.append('nome_marca', marcaProduto);
        formData.append('categorias', categoriaProduto);
        formData.append('produto_imagem', produto_imagem); 

        return this.httpClient.post<Produto>(this.apiUrl, formData);
    }

    getProdutos() {
        return this.httpClient.get<Produto[]>(this.apiUrl)
    }

    getProdutoById(product_id: string) {
        return this.httpClient.get<Produto>(`${this.apiUrl}/${product_id}`)
    }

    editProduct(id: string, nomeProduto: string, produto_imagem: File, precoProduto: number, descricaoProduto: string, marcaProduto: string, categoriaProduto: string) {
        // criando um  FormData
        const formData = new FormData();

        if(nomeProduto){
            formData.append('nome_produto', nomeProduto);
        }

        if(precoProduto){
            formData.append('produto_preco', precoProduto.toString());
        }

        if(descricaoProduto){
            formData.append('produto_descricao', descricaoProduto);
        }

        if(marcaProduto){
            formData.append('nome_marca', marcaProduto);
        }

        if(categoriaProduto){
            formData.append('categorias', categoriaProduto);
        }

        if(produto_imagem){
            formData.append('produto_imagem', produto_imagem); 
        }

        console.log(formData.get(nomeProduto))
        return this.httpClient.patch(`${this.apiUrl}/${id}`, formData)
    }

    deleteProductById(product_id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${product_id}`);
    }
}
