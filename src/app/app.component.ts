// Importing necessary modules and services from Angular.
import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Custom authentication service for handling user login/logout.

@Component({
   selector: 'app-root', // Defines the name of the HTML tag used to render this component.
   templateUrl: './app.component.html', // Path to the HTML template associated with this component.
   styleUrls: ['./app.component.css'] // Path to the CSS file(s) for styling this component.
})
export class AppComponent {
   // Component properties to store application information and state.
   information = 'Angular and NodeJs CRUD'; // Displayed as additional information about the application.
   year = '2025'; // Current year to display in the application.
   title = 'Expense Manager'; // Title of the application.

   isUserLoggedIn = false; // Tracks whether the user is logged in or not.

   // Injecting the authentication service to use its methods.
   constructor(private authService: AuthService) { }

   // Lifecycle hook that executes after the component is initialized.
   ngOnInit() {
      // Retrieves user login status from the browser's local storage.
      let storeData = localStorage.getItem("isUserLoggedIn"); 
      console.log("StoreData: " + storeData); // Logs the stored login status for debugging purposes.

      // Checks if the stored data exists and indicates a logged-in user.
      if (storeData != null && storeData == "true")
         this.isUserLoggedIn = true; // Sets the state to logged in.
      else
         this.isUserLoggedIn = false; // Sets the state to logged out if no valid data is found.
   }
}
