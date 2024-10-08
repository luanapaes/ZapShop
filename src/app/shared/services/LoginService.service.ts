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

    // Função para verificar se está rodando no navegador
    isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

    logar(email: string, password: string): Observable<any> {
        return this.httpClient.post<any>(`${this.urlApi}/login`, { email, password }).pipe(
            tap((resposta) => {
                // Verifica se o token foi recebido
                if (!resposta.accessToken || !this.isBrowser()) return;

                // Logando o token recebido no console para verificar
                console.log("Token recebido:", resposta.accessToken);

                // Armazenando o token no localStorage
                localStorage.setItem('token', btoa(JSON.stringify(resposta.accessToken)));
                localStorage.setItem('usuario', btoa(JSON.stringify(resposta.usuario)));

                // Redirecionando para a rota home após login
                this.router.navigate(['']);
            })
        );
    }


    registrar(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.urlApi}/register`, data).pipe(
            tap((resposta) => {
                if (!resposta.token || !this.isBrowser()) return;
                localStorage.setItem('token', btoa(JSON.stringify(resposta.token)));
                localStorage.setItem('usuario', btoa(JSON.stringify(resposta.usuario)));
                this.router.navigate(['']);
            })
        );
    }

    deslogar() {
        if (this.isBrowser()) {
            localStorage.clear();
            this.router.navigate(['login']);
        }
    }

    obterUsuarioLogado(): any {
        if (!this.isBrowser()) return null;
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(atob(usuario)) : null;
    }

    obterIdUsuarioLogado(){
        if (!this.isBrowser()) return null;
        const usuario = localStorage.getItem('usuario');
        return usuario ? (JSON.parse(atob(usuario)) as any).id : null;
    }

    obterTokenUsuario() {
        if (!this.isBrowser()) return null;
        const token = localStorage.getItem('token');
        return token ? JSON.parse(atob(token)) : null;
    }

    logado(): boolean {
        return this.isBrowser() && localStorage.getItem('token') ? true : false;
    }
}
