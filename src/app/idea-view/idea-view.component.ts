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
  vote;
  rating;
  review;
  showRating;
  rateStar = false
  constructor(private auth: AuthService, private route: ActivatedRoute, private dialog: MatDialog, private ideaService: IdeaViewService, private snack: SnackbarService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated()
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ideaId = params['id']
        this.rateStar = false;
        this.ideaService.feedFetch(this.ideaId).subscribe(response => {
          this.ideaData = response
          this.showRating = response.Ratings
          this.rateStar =true;
        })
        this.ideaService.getUserVote({ idea_id: this.ideaId }).subscribe(response => {
          if (response) this.vote = response.vote
        })
      }
    })
  }
  makeVote(vote) {
    this.ideaService.createVote({ idea_id: this.ideaId, vote: vote }).subscribe(response => {
      this.vote = vote
      this.snack.openSnack("Voted Successfully")
      this.ngOnInit()
    }, error => {
      this.snack.openSnack("Something went wrong")
    })
  }
  onRatingSet(event) {
    this.rating = event
  }
  saveRating() {
    this.ideaService.createRecommendation({ idea_id: this.ideaId, rating: this.rating, text: this.review }).subscribe(response => {
      this.snack.openSnack("Rated Successfully")
      this.ngOnInit()
    }, error => {
      this.snack.openSnack("Something went wrong")
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { writeup: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ideaService.createwriteup({ idea_id: this.ideaData.id, writeup: result }).subscribe(response => {
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