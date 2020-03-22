import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService} from './services/auth-guard.service'

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:"full"},
  { path: 'home', component:HomeComponent, canActivate:[AuthGuardService] },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),canLoad:[AuthGuardService]},
  { path: 'login',loadChildren: () => import('./login/login.module').then(m => m.LoginModule),canLoad:[AuthGuardService]},
  { path: "**", redirectTo:'home', pathMatch:"full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
