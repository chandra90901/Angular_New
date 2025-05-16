import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const toastr = this.injector.get(ToastrService);

                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Client-side error: ${error.error.message}`;
                } else {
                    errorMessage = `Server error (${error.status}): ${error.message}`;
                }

                console.error(errorMessage);
                toastr.error('An error occurred while processing your request.', 'HTTP Error');

                return throwError(() => new Error(errorMessage));
            })
        );
    }
}
