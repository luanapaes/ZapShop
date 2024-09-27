import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    httpClient = inject(HttpClient);
    router = inject(Router)

    urlApi = "/api/auth";

    logar(email: string, password: string): Observable<any> {
        return this.httpClient.post<any>(`${this.urlApi}/login`, { email, password }).pipe(
            tap((resposta) => {
                if (!resposta.accessToken) return;
                localStorage.setItem('token', btoa(JSON.stringify(resposta.accessToken)));
                localStorage.setItem('usuario', btoa(JSON.stringify(resposta.usuario)));
                this.router.navigate(['']);
            })
        );
    }

    registrar(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.urlApi}/register`, data).pipe(
            tap((resposta) => {
                if (!resposta.token) return;
                localStorage.setItem('token', btoa(JSON.stringify(resposta.token)));
                localStorage.setItem('usuario', btoa(JSON.stringify(resposta.usuario)));
                this.router.navigate(['']);
            })
        );
    }

    deslogar() {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    obterUsuarioLogado(): any {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(atob(usuario)) : null;
    }

    obterIdUsuarioLogado(): string {
        const usuario = localStorage.getItem('usuario');
        return usuario ? (JSON.parse(atob(usuario)) as any).id : null;
    }

    obterTokenUsuario(): string {
        const token = localStorage.getItem('token');
        return token ? JSON.parse(atob(token)) : null;
    }

    logado(): boolean {
        return localStorage.getItem('token') ? true : false;
    }
}