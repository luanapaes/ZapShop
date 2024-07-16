import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from '../interfaces/marca.interface';

@Injectable({
    providedIn: 'root'
})
export class MarcasService {
    httpClient = inject(HttpClient);

    get(){
        return this.httpClient.get<Marca[]>('http://localhost:3000/marcas')
    }
}