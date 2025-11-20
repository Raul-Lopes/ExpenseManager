import { Routes } from '@angular/router';
import { expenseGuard } from './expense.guard';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then(m => m.LogoutComponent)
  },
  {
    path: 'expenses',
    loadComponent: () => import('./expense-entry-list/expense-entry-list.component').then(m => m.ExpenseEntryListComponent),
    canActivate: [expenseGuard]
  },
  {
    path: 'expenses/detail/:id',
    loadComponent: () => import('./expense-entry/expense-entry.component').then(m => m.ExpenseEntryComponent),
    canActivate: [expenseGuard]
  },
  {
    path: 'expenses/add',
    loadComponent: () => import('./edit-entry/edit-entry.component').then(m => m.EditEntryComponent),
    canActivate: [expenseGuard]
  },
  {
    path: 'expenses/edit/:id',
    loadComponent: () => import('./edit-entry/edit-entry.component').then(m => m.EditEntryComponent),
    canActivate: [expenseGuard]
  },
  {
    path: '',
    redirectTo: 'expenses',
    pathMatch: 'full'
  }
];
