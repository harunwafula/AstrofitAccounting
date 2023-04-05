import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { canActivate} from './services/auth.guard';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const routes: Routes = [
  {path : "home", component :  HomeComponent,   canActivate: [canActivate]},
  {path : "auth", component : AuthComponent, children: [
    {path: "login", component : LoginFormComponent},
    {path: "register", component: RegisterFormComponent}
  ]},
  {path: "", redirectTo : "home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
