import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Add OnPush change detection
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  information = signal('Angular and NodeJs CRUD');
  year = signal(new Date().getFullYear().toString());
  title = signal('Expense Manager');
  isUserLoggedIn = signal(false);

  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  ngOnInit() {
    const storeData = this.storageService.getItem("isUserLoggedIn");
    console.log("StoreData: " + storeData);
    this.isUserLoggedIn.set(storeData != null && storeData == "true");
  }
}
