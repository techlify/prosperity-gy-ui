import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';


const feed:Routes = [
  { path: '', component:FeedComponent }
]

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(feed),
    SharedModule,
    MatSelectModule
  ],
})
export class FeedModule { }
