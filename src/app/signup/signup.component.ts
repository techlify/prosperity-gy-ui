import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private user: UserService, private snack: SnackbarService, private router: Router) { }


  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.email,
  ]));
  passwordFormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(5),
  ]));

  verifyPasswordFormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(5),
  ]));


  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: this.nameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      verifyPassword: this.verifyPasswordFormControl
    }, {
      validator: this.passwordValidator
    })
  }


  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;
    return condition ? { passwordsDoNotMatch: true } : null;
  }

  addUser() {
    this.userForm.value.password_confirmation = this.userForm.value.verifyPassword;
    this.user.signup(this.userForm.value).subscribe(response => {
      if (response) {
        this.snack.openSnack("User Creates Successfully!!! Please login")
      }
      this.router.navigate(['/login'])
    }, error => {
      if (error.status == 422) {
        this.userForm.get('email').setErrors({ 'incorrect': true })
      } else {
        this.snack.openSnack("Something went wrong. Please try again")
      }
    })
  }

}
