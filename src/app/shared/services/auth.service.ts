import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { LoginData } from 'src/app/models/SendingData.model';

//Здесь должна быть ссылка на сервер с данными входа
const AUTH_API = '';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Это стрим, который будет передавать на всю аппликацию значения входа/выхода
  private readonly _isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, 
    private tokenStorageService: TokenStorageService, 
    private router: Router) { }


public isRouteAuthenticated() {
  return this._isAuthenticated$;
}

public setIsAuthenticated(isAuth: boolean): void {
  this._isAuthenticated$.next(isAuth)
}

//Метод, который отправляет данные для входа
login(data: LoginData): Observable<any> {
  return this.http.post(AUTH_API, data);
}


logout(): void {
  this.setIsAuthenticated(false)
  this.tokenStorageService.signOut();
  this.router.navigateByUrl('/login')
}
}
