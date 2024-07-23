import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from '../interfaces/marca.interface';
import { Produto } from '../interfaces/produto.interface';

@Injectable({
    providedIn: 'root'
})
export class MarcasService {
    httpClient = inject(HttpClient);
    urlMarcasApi: string = 'http://localhost:3000/marcas';
    urlProdutosApi: string = 'http://localhost:3000/produtos'

    //carrega todas as marcas
    get(){
        return this.httpClient.get<Marca[]>(this.urlMarcasApi)
    }

    //carrega produtos de uma marca específica
    getMarca(marca: string){
        return this.httpClient.get<Marca[]>(`${this.urlMarcasApi}/${marca}`)
    }

    //carrega produtos filtrados de marca e categoria específica
    getProdutosFiltrados(marca: string, categoria: string){
        return this.httpClient.get<Produto[]>(`${this.urlProdutosApi}?product_marca=${marca}&&product_categoria=${categoria}`)
    }
}