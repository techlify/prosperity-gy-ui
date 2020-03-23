import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent, DialogOverviewExampleDialog } from './feed.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';


const feed:Routes = [
  { path: '', component:FeedComponent }
]

@NgModule({
  declarations: [FeedComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    RouterModule.forChild(feed),
    SharedModule,
    MatDialogModule
  ],
})
export class FeedModule { }
