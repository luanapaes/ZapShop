import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Marca } from '../interfaces/marca.interface';
import { Produto } from '../interfaces/produto.interface';

@Injectable({
    providedIn: 'root'
})
export class MarcasService {
    httpClient = inject(HttpClient);
    urlMarcasApi: string = 'http://localhost:3000/marcas';
    urlProdutosApi: string = 'http://localhost:3000/produtos';

    marcaSelecionada = signal<string>('');

    //carrega todas as marcas
    get(){
        return this.httpClient.get<Marca[]>(this.urlMarcasApi)
    }

    //carrega produtos de uma marca específica
    getProdutosDaMarca(marca: string){
        return this.httpClient.get<Marca[]>(`${this.urlMarcasApi}/${marca}`)
    }

    getProdutosFiltrados(marca: string) {
        return this.httpClient.get<Produto[]>(`${this.urlProdutosApi}?product_marca=${marca}`);
    }

    getMarca(): string{
        return this.marcaSelecionada();
    }

    setMarca(marca: string){
        this.marcaSelecionada.set(marca)
    }

    cadastrarMarca(marca: Marca){
        const newMarca: Marca = {
            nome_marca: marca.nome_marca,
            categorias: marca.categorias,
            logomarca: marca.logomarca
        }

        return this.httpClient.post<Marca>(this.urlMarcasApi,newMarca)
    }
}