import { Component, OnInit, Inject } from '@angular/core';
import { FeedService } from './feed.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feedData = [];
  isLoggedIn;
  data: any;
  selectedData;
  userData: any;
  category = new FormControl();
  categories = []
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private feedService: FeedService, private snack: SnackbarService, private auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    this.data = undefined
    this.isLoggedIn = this.auth.isAuthenticated()
    if (this.isLoggedIn) {
      this.user.userData().subscribe(response => {
        this.userData = response
      })
    }
    this.feedService.feedData().subscribe(response => {
      this.feedData = response
    })

    this.feedService.fetchCategories().subscribe(response=>{
      this.categories = response;
    })
  }
  feedSave() {
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
  feedEdit(data) {
    this.selectedData = data
  }
  updateFeed() {
    var model:any = {
      idea_id: this.selectedData.id,
      idea: this.selectedData.idea
    }
    if(this.category.value) model.categories = this.category.value;
    this.feedService.updateIdea(model).subscribe(response => {
      
      this.snack.openSnack("Updated Successfully")
      this.ngOnInit()
    }, error => {
      this.snack.openSnack("Something went wrong. Please try again")
    })
  }

}

