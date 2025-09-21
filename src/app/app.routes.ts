import { Routes } from '@angular/router';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { ExpenseEntryListComponent } from './expense-entry-list/expense-entry-list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { AboutComponent } from './about/about.component';
import { expenseGuard } from './expense.guard';

export const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'expenses',
    component: ExpenseEntryListComponent,
    canActivate: [expenseGuard]
  },
  {
    path: 'expenses/detail/:id',
    component: ExpenseEntryComponent,
    canActivate: [expenseGuard]
  },
  {
    path: 'expenses/add',
    component: EditEntryComponent,
    canActivate: [expenseGuard]
  },
  {
    path: 'expenses/edit/:id',
    component: EditEntryComponent,
    canActivate: [expenseGuard]
  },
  {
    path: '',
    redirectTo: 'expenses',
    pathMatch: 'full'
  }
];
