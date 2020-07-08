import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SnackbarService } from './services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prosperity-gy-ui';
  loggedIn;
  userData;
  constructor(private auth:AuthService,private user: UserService,private snack:SnackbarService,private router:Router) {}

  ngOnInit(){
    this.loggedIn = this.auth.isAuthenticated()
  }
  authUser(){
    this.loggedIn = this.auth.isAuthenticated()
    if(this.loggedIn) {
      this.user.userData().subscribe(response => {
        this.userData = response;
        this.auth.setUserData(this.userData)
      })
    }
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
