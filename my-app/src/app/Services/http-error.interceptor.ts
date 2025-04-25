import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // Client-side errors
                    errorMessage = `Client-side error: ${error.error.message}`;
                } else {
                    // Server-side errors
                    errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
                }
                console.error(errorMessage);
                alert('An error occurred while processing your request.');
                return throwError(errorMessage);
            })
        );
    }
}
