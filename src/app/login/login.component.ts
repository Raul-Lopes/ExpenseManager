import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

   userName: string = '';
   password: string = '';
   formData!: FormGroup;

   constructor(private authService: AuthService, private router: Router) { }

   ngOnInit(): void {
      this.formData = new FormGroup({
         userName: new FormControl('admin', [Validators.required]),
         password: new FormControl('admin', [Validators.required]),
      });
   }

   onClickSubmit(data: any): void {
      this.userName = data.userName;
      this.password = data.password;

      console.log("Login page: " + this.userName);
      console.log("Login page: " + this.password);

      this.authService.login(this.userName, this.password).subscribe({
         next: (data) => {
            console.log("Is Login Success: " + data);
            if (data) {
               this.router.navigate(['/expenses']);
            } else {
               alert("Invalid username or password.");
            }
         },
         error: (err) => {
            console.error("Login error:", err);
            alert("An error occurred during login. Please try again later.");
         }
      });
   }
}
