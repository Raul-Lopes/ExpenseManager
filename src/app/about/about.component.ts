import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-about',
   templateUrl: './about.component.html',
   styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

   title = "About";

   constructor(
      private router: Router
   ) { }

   ngOnInit() {
   }

   goToList() {
      this.router.navigate(['/expenses']);
   }

}