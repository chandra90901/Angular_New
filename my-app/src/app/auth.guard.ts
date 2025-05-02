import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const token = localStorage.getItem('token');
  const router = inject(Router);

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
        alert('Session expired. Please login again.');
        router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      console.error('Token decoding failed', error);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
