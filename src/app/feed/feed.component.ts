import { Component, OnInit, Inject } from '@angular/core';
import { FeedService } from './feed.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feedData = [];
  isLoggedIn;
  constructor(private feedService: FeedService, public dialog: MatDialog,private snack:SnackbarService,private auth:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated()
    this.feedService.feedData().subscribe(response => {
      this.feedData = response
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { idea: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.feedService.createIdea({ idea: result }).subscribe(response => {
        if (response) {
          this.snack.openSnack("Created Successfully")
          this.ngOnInit()
        }
      }, error => {
        if (error.status == 422) {
          this.snack.openSnack("Something went wrong. Please try again")
        }
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
