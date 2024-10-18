import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Marca } from '../interfaces/marca.interface';
import { Produto } from '../interfaces/produto.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MarcasService {
    httpClient = inject(HttpClient);
    urlMarcasApi: string = '/api/marcas';
    urlProdutosApi: string = '/api/produtos';

    marcaSelecionada = signal<string>('');

    //carrega todas as marcas
    get(){
        return this.httpClient.get<Marca[]>(this.urlMarcasApi)
    }

    getMarcaByID(id: number){
        return this.httpClient.get<Marca>(`${this.urlMarcasApi}/${id}`)
    }

    //carrega produtos de uma marca específica
    getProdutosDaMarca(marca: string){
        return this.httpClient.get<Marca[]>(`${this.urlMarcasApi}/${marca}`)
    }

    getProdutosFiltrados(marca: string) {
        return this.httpClient.get<Produto[]>(`${this.urlProdutosApi}?nome_marca=${marca}`);
    }

    getMarcaByName(nome_marca: string): Observable<Marca> {
        return this.httpClient.get<Marca>(`${this.urlMarcasApi}?nome_marca=${nome_marca}`);
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