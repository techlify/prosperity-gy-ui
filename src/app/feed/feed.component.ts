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
  data:any;
  constructor(private feedService: FeedService,private snack:SnackbarService,private auth:AuthService) { }

  ngOnInit(): void {
    this.data = undefined
    this.isLoggedIn = this.auth.isAuthenticated()
    this.feedService.feedData().subscribe(response => {
      this.feedData = response
    })
  }
  feedSave(){
    this.feedService.createIdea({ idea: this.data, }).subscribe(response => {
      if (response) {
        this.snack.openSnack("Created Successfully")
        this.ngOnInit()
      }
    }, error => {
      if (error.status == 422) {
        this.snack.openSnack("Something went wrong. Please try again")
      }
    })
  }
  
}

