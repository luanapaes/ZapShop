import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Marca } from '../interfaces/marca.interface';
import { Observable } from 'rxjs';
import { CustomMarca } from '../interfaces/custom-marca.interface';
import { LoginService } from './LoginService.service';

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
        return this.httpClient.get<CustomMarca[]>(this.urlMarcasApi)
    }

    getMarcaByID(id: number | string){
        return this.httpClient.get<Marca>(`${this.urlMarcasApi}/${id}`)
    }

    //carrega produtos de uma marca específica
    getProdutosDaMarca(marca: string){
        return this.httpClient.get<Marca[]>(`${this.urlMarcasApi}/${marca}`)
    }

    getProdutosFiltrados(marca: string) {
        return this.httpClient.get<CustomMarca>(`${this.urlMarcasApi}?nome_marca=${marca}`);
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

    cadastrarMarca(nomeMarca: string, categorias: string, logomarca: File){
        
        const formData = new FormData();

        formData.append('nome_marca', nomeMarca);
        formData.append('categorias', categorias),
        formData.append('logomarca', logomarca)

        return this.httpClient.post<Marca>(this.urlMarcasApi, formData)
    }

    editarMarca(id: string, nomeMarca: string, categorias: string, logomarca: File) {
        const formData = new FormData();

        if (nomeMarca) {
            formData.append('nome_marca', nomeMarca);
        }

        if (categorias) {
            formData.append('categorias', categorias);
        }

        if (logomarca) {
            formData.append('logomarca', logomarca);
        }

        const marca: Marca = {
            nome_marca: formData.get('nome_marca') as string,
            categorias: formData.get('categorias') as string,
            logomarca: formData.get('logomarca') as string
        }

        const token = localStorage.getItem('authToken'); //pega o token do localstorage

        const headers = {
            Authorization: `Bearer ${token}`, //envia o token no cabeçalho
        };

        return this.httpClient.patch(`${this.urlMarcasApi}/${id}`, marca, { headers });
    }


    delete(id: number): Observable<void>{
        return this.httpClient.delete<void>(`${this.urlMarcasApi}/${id}`)
    }
}