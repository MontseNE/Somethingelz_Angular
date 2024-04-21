import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  private roles = this._currentUser()?.roles;

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('user', this._currentUser.name);
    console.log(this._authStatus());
    console.log(this._currentUser.name);
    return true;
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/login`;
    const body = { email, password };
    const resp = this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))

      );

    return resp;
  }

  register(name: string, email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/register`;
    const body = { name, email, password };
    const resp = this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))

      );
    return resp;
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/check-status`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);

    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    console.log('Hay token');
    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );

  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    console.log('cerrando sesión');

  }

  isAdmin() {
    return this.roles?.includes('admin');
  }

  isUser(): boolean | undefined {
    return this.roles?.includes('user');
  }

  isLogged(): boolean {

    return this._currentUser != null;
  }



}
