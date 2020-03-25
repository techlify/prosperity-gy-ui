import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  userData;
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userAuth');
    if (token) return true;
    return false
  }
  public setUserData(data){
    this.userData =  data;
  }
  public getUserData(){
    return this.userData;
  }
}
