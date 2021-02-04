import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token =  this.auth.getToken();

    if (token === null) return next.handle(request);

    const cloneRequest = request.clone({
      setHeaders: {
        Authentication: token
      }
    });

    return next.handle(cloneRequest);
  }

}
