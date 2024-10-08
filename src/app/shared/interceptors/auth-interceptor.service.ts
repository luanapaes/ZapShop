import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/LoginService.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // lista de URLs que não precisam de autenticação
    private nonAuthUrls: string[] = [
        '/login',
        '/home'
    ];

    constructor(private authService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // verifica se a URL da requisição está em nonAuthUrls
        const requiresAuth = !this.nonAuthUrls.some(url => req.url.includes(url));

        if (requiresAuth) {
            const authToken = this.authService.obterTokenUsuario();
            if (authToken) {
                // faz um clone da requisição e adiciona o cabeçalho Authorization
                const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
                return next.handle(authReq);
            }
        }

        // se não precisar de autenticação segue a requisição normal
        return next.handle(req);
    }
}
