import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const toastr = this.injector.get(ToastrService);
                if (error.status === 401) {
                    toastr.warning('Unauthorized Access - Please log in.', '401 Unauthorized');
                } else if (error.status === 500) {
                    toastr.error('Server error, please try again later.', '500 Server Error');
                }
                return throwError(() => error);
            })
        );
    }
}