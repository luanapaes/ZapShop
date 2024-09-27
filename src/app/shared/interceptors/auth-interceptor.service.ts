import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/LoginService.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.obterTokenUsuario();
        const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
        return next.handle(authReq);
    }

}
