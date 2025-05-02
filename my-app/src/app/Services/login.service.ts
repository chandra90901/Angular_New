import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiUrl;
  private authSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus$ = this.authSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  private isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  addSignup(signup: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/signup`, signup).pipe(
      catchError(error => {
        console.error('Signup Error:', error);
        return throwError(() => error);
      })
    );
  }

  getAllSignups(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/signup`).pipe(
      catchError(error => {
        console.error('Get Signups Error:', error);
        return throwError(() => error);
      })
    );
  }

  updateSignup(id: number, signup: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/signup/${id}`, signup).pipe(
      catchError(error => {
        console.error('Update Signup Error:', error);
        return throwError(() => error);
      })
    );
  }

  deleteSignup(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/signup/${id}`).pipe(
      catchError(error => {
        console.error('Delete Signup Error:', error);
        return throwError(() => error);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, credentials).pipe(
      catchError(error => {
        console.error('Login Error:', error);
        return throwError(() => error);
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
}
