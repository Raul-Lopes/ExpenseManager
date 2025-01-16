// Importing necessary Angular and RxJS modules.
import { Injectable } from '@angular/core'; // Enables dependency injection for this service.
import { Observable, of } from 'rxjs'; // RxJS utilities to create observables.
import { tap, delay } from 'rxjs/operators'; // RxJS operators for side effects and delayed execution.

@Injectable({
  providedIn: 'root' // Makes this service available application-wide via the root injector.
})
export class AuthService {

  isUserLoggedIn: boolean = false; // Tracks the user's login state.

  // Method to handle user login.
  login(userName: string, password: string): Observable<boolean> {
    // Validates the credentials. If both the username and password are 'admin', login is successful.
    this.isUserLoggedIn = userName === 'admin' && password === 'admin';

    // Stores the login state in localStorage for persistence.
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    // Returns an observable of the login state, simulating an asynchronous call with a delay.
    return of(this.isUserLoggedIn).pipe(
      delay(1000), // Simulates a 1-second delay (e.g., for a backend call).
      tap(val => {
        // Logs the result of the login attempt for debugging purposes.
        console.log("Is User Authentication successful: " + val);
      })
    );
  }

  // Method to handle user logout.
  logout(): void {
    this.isUserLoggedIn = false; // Resets the login state to `false`.
    localStorage.removeItem('isUserLoggedIn'); // Removes the login state from localStorage.
  }

  // Constructor for the service. No specific initialization is required here.
  constructor() { }
}
