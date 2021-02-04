import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"
import { environment } from 'src/environments/environment';

interface IAuthencationResponse {
  exp: string,
  message: string,
  token: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token")

    if (token === "") return false

    return !this.jwtHelper.isTokenExpired(token)

  }

  public getToken() {
    return this.jwtHelper.tokenGetter();
  }

  public authenticate(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${window.btoa(`${username}:${password}`)}`
    });

    return this.http.post<IAuthencationResponse>(`${environment.serverUrl}/auth/login`, null, {headers});
  }
}
