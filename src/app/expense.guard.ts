// Importing necessary Angular modules for route guarding and navigation.
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service'; // Importing the authentication service.

@Injectable({
   providedIn: 'root' // Makes this guard available application-wide through the root injector.
})
export class ExpenseGuard implements CanActivate {

   // Constructor injecting AuthService and Router to handle authentication and navigation.
   constructor(private authService: AuthService, private router: Router) { }

   /**
    * Determines if the requested route can be activated.
    * @param next - The next route to be activated.
    * @param state - The state of the router at the time of the route activation.
    * @returns A boolean or UrlTree indicating if navigation is allowed.
    */
   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url; // Captures the current URL of the requested route.
      return this.checkLogin(url); // Calls checkLogin to validate access.
   }

   /**
    * Checks whether the user is logged in and handles redirection if not.
    * @param url - The URL being accessed.
    * @returns A boolean indicating access permission or a UrlTree for navigation redirection.
    */
   checkLogin(url: string): true | UrlTree {
      let val: string = localStorage.getItem('isUserLoggedIn'); // Reads the login status from localStorage.

      if (val != null && val == "true") { // Checks if the user is logged in.
         if (url == "/login") // Prevents logged-in users from accessing the login page.
            this.router.parseUrl('/expenses'); // Redirects to the expenses page if already logged in.
         else
            return true; // Allows navigation to the requested route.
      } else {
         return this.router.parseUrl('/login'); // Redirects unauthenticated users to the login page.
      }
   }
}
