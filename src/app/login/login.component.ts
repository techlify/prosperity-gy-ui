import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  constructor(private fb: FormBuilder, private user: UserService, private snack: SnackbarService, private router: Router) { }


  emailFormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.email,
  ]));
  passwordFormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(5),
  ]));

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }
  loginUser() {
    this.userForm.value.remember_me = true;
    this.user.login(this.userForm.value).subscribe(response => {
      if (response) {
        this.snack.openSnack("Login success!!!")
        localStorage.setItem('userAuth',response.access_token)
        this.router.navigate(['/'])
      }
    }, error => {
      this.snack.openSnack("Login failed. Please check credentials")
    })
  }
}
