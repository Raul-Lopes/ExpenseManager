import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   information = 'Angular and NodeJs CRUD';
   year = '2025';

   title = 'Expense Manager';
   isUserLoggedIn = false;

   constructor(private authService: AuthService) { }

   ngOnInit() {
      let storeData = localStorage.getItem("isUserLoggedIn");
      console.log("StoreData: " + storeData);

      if (storeData != null && storeData == "true")
         this.isUserLoggedIn = true;
      else
         this.isUserLoggedIn = false;
   }
}