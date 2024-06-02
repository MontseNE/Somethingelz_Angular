import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { JsonPipe } from '@angular/common';
import { Property } from '../../properties/interfaces/property.interface';

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
  public favProperties = computed(() => this._currentUser()?.favList);

  constructor() {
    this.checkAuthStatus().subscribe();
  }


  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    if (user.id)
      localStorage.setItem('id', user.id);

    console.log(this._authStatus());
    console.log(this._currentUser());
    console.log("Imprimiendo ID del usuario actual " + this._currentUser()!.id);
    return true;
  }


  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/login`;
    const body = { email, password };
    const resp = this.http.post<User>(url, body)
      .pipe(
        map((user) => this.setAuthentication(user, user.token)),
        catchError(err => throwError(() => err.error.message))
      );
    return resp;
  }

  updateUserFavList(userId: string, favList: string[]): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.patch<User>(`${this.baseUrl}/api/auth/${userId}`, { favList }, { headers });
  }


  toggleFavorite(propertyId: string) {
    const id = localStorage.getItem('id');

    if (!id) return;
    console.log(id);
    const favList = this._currentUser()?.favList || [];
    const index = favList.indexOf(propertyId);
    if (index > -1) {
      favList.splice(index, 1); // eliminar favoritos
    } else {
      favList.push(propertyId); // añadir a favoritos
    }


    this.updateUserFavList(id, favList).subscribe(updatedUser => {
      this._currentUser.set(updatedUser);
      console.log(this._currentUser());

      //this.updateFavProperties();
    });
  }


  register(name: string, email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/register`;
    const body = { name, email, password };
    const resp = this.http.post<User>(url, body)
      .pipe(
        map((user) => this.setAuthentication(user, user.token)),
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
    return this.http.get<User>(url, { headers })
      .pipe(
        map((user) => this.setAuthentication(user, user.token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    console.log('cerrando sesión');

  }

  isAdmin() {
    return this.roles?.includes('admin');
  }

  userName(): string | undefined {
    return this._currentUser()?.name;
  }

  isLogged(): boolean {

    return this._currentUser !== null;
  }



}
