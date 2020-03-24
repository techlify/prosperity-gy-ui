import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IdeaViewService } from './idea-view.service';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-idea-view',
  templateUrl: './idea-view.component.html',
  styleUrls: ['./idea-view.component.css']
})
export class IdeaViewComponent implements OnInit {
  ideaId;
  ideaData;
  isLoggedIn;
  constructor(private auth:AuthService,private route:ActivatedRoute,private dialog:MatDialog,private ideaService:IdeaViewService,private snack:SnackbarService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated()
    this.route.params.subscribe(params => {
        if(params['id']) {
          this.ideaId = params['id']
          this.ideaService.feedFetch(this.ideaId).subscribe(response=>{
              this.ideaData = response
          })
        }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { writeup: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.ideaService.createwriteup({idea_id:this.ideaData.id,writeup:result}).subscribe(response=>{
          if (response) {
              this.ngOnInit();
              this.snack.openSnack("Writeup added successfully")
          }
        }, error => {
          this.snack.openSnack("Something went wrong")
        })
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}