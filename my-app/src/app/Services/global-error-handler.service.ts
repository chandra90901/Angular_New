import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error: any): void {
        console.error('Global Error Handler:', error);
        console.log('Error Details:', error);
        const router = this.injector.get(Router);
        const toastr = this.injector.get(ToastrService);

        const isBrowser = typeof window !== 'undefined';

        if (isBrowser) {
            if (error.status === 401) {
                toastr.warning('Unauthorized. Please log in again.', 'Warning');
                router.navigate(['/login']);
            } else if (error.status === 404) {
                toastr.error('Resource not found.', 'Error 404');
                router.navigate(['/not-found']);
            } else {
                toastr.error('An unexpected error occurred. Please try again later.', 'Error');
            }
        } else {
            console.log('Error occurred during SSR or non-browser context.');
        }
    }
}
