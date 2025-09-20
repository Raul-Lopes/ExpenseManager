import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { StorageService } from './storage.service';

export const expenseGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const url: string = state.url;

  const val = storageService.getItem('isUserLoggedIn');

  if (val != null && val == "true") {
    if (url == "/login") {
      return router.parseUrl('/expenses');
    }
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
