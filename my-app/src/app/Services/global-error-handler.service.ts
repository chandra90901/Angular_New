import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        // Log the error to the console (or an external logging service)
        console.error('An unexpected error occurred:', error);

        // Show a user-friendly message
        alert('An unexpected error occurred. Please try again later.');

        // Optionally, send the error to an error logging service for monitoring
        // loggingService.logError(error);
    }
}
