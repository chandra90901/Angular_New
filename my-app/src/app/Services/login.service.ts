import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiUrl;

  private authSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) { }


  private isLoggedIn(): boolean {

    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      return token !== null;
    }
    return false;
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials)
      .pipe(
        catchError(error => {
          console.error('Login Error:', error);
          throw error;
        })
      );
  }

  storeToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
      this.authSubject.next(true);
    }
  }


  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }


  clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      this.authSubject.next(false);
    }
  }


  addSignup(signup: any) {
    return this.http.post(`${this.baseUrl}/signup`, signup)
      .pipe(
        catchError(error => {
          console.error('Error during signup:', error);
          throw error;
        })
      );
  }
}
