import { NgModule } from '@angular/core';
import { IdeaViewComponent, DialogOverviewExampleDialog } from './idea-view.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxStarsModule } from 'ngx-stars';


const ideaview:Routes = [
  { path: '', component:IdeaViewComponent }
]

@NgModule({
  declarations: [IdeaViewComponent,DialogOverviewExampleDialog],
  imports: [
    SharedModule,
    RouterModule.forChild(ideaview),
    MatDialogModule,
    NgxStarsModule
  ]
})
export class IdeaViewModule { }
