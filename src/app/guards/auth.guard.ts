import { Injectable } from "@angular/core";
import { LoginService } from "../shared/services/LoginService.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(
    private authService: LoginService
  ) { }

  canActivate() {
    return this.authService.logado();
  }
}
