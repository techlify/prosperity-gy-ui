import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SharedModule } from '../shared/shared.module';


const signup:Routes = [
  { path: '', component:SignupComponent }
]
@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(signup),
    SharedModule
  ],
  providers: []
})
export class SignupModule { }
