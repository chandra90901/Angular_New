import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  // Ensure the code only runs in the browser
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token');
    const router = inject(Router);
    const injector = inject(Injector);
    const toastr = injector.get(ToastrService);

    if (isLoggedIn && token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded Token:', decoded);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log('Token Expiry:', decoded.exp);
        if (decoded.exp && decoded.exp > currentTime) {
          console.log('Current Time:', currentTime);
          return true;
        } else {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('token');
          toastr.warning('Session expired. Please login again.', 'Session Timeout');
          router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        console.error('Token decoding failed', error);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        toastr.error('Invalid session. Please login again.', 'Auth Error');
        router.navigate(['/login']);
        return false;
      }
    } else {
      toastr.info('Please login to continue.', 'Auth Required');
      router.navigate(['/login']);
      return false;
    }
  }
  return false;
};
