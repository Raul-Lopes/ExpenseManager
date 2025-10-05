import { Injectable, signal, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root' // Makes this service available application-wide via the root injector.
})
export class AuthService {
  private _isUserLoggedIn = signal(false);
  private storageService = inject(StorageService);

  get isUserLoggedIn() {
    return this._isUserLoggedIn.asReadonly();
  }

  login(userName: string, password: string): Observable<boolean> {
    const isAuthenticated = userName === 'admin' && password === 'admin';
    this._isUserLoggedIn.set(isAuthenticated);
    this.storageService.setItem('isUserLoggedIn', String(isAuthenticated));

    return of(isAuthenticated).pipe(
      delay(1000),
      tap(val => console.log("Authentication successful:", val))
    );
  }

  // Method to handle user logout.
  logout(): void {
    this._isUserLoggedIn.set(false);
    this.storageService.removeItem('isUserLoggedIn');
  }
}
