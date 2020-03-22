import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snack:MatSnackBar) { }

  openSnack(message){
    this.snack.open(message, "", {
      duration: 5000
    })
  }
}
