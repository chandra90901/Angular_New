import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error: any): void {
        console.error('Global Error Handler:', error);
        const router = this.injector.get(Router);

        const isBrowser = typeof window !== 'undefined';

        if (isBrowser) {
            if (error.status === 401) {
                alert('Unauthorized. Please log in again.');
                router.navigate(['/login']);
            } else if (error.status === 404) {
                alert('Resource not found.');
                router.navigate(['/not-found']);
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
        } else {
            console.log('Error occurred during SSR or non-browser context.');
        }
    }
}
