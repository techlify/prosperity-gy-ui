import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData:any = {};
  constructor(private user: UserService, private snack: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.user.userData().subscribe(response => {
      this.userData = response;
    })
  }
  logout() {
    this.user.logOut().subscribe(response => {
      localStorage.removeItem('userAuth')
      this.snack.openSnack("Successfully logged out")
      this.router.navigate(['login'])
    }, error => {
      if (error.status != 422) {
        this.snack.openSnack("Something went wrong. Please try again")
      }
    })
  }

}
