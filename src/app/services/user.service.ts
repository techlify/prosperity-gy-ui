import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  signup(model){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.apiURL+'api/auth/signup',model, { headers: headers }).pipe(catchError(this.handleError))
  }
  login(model):any{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.apiURL+'api/auth/login',model, { headers: headers }).pipe(catchError(this.handleError))
  }
  userData():any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userAuth')
      })
    };
    return this.httpClient.get(environment.apiURL+'api/auth/user', httpOptions).pipe(catchError(this.handleError))
  }
  logOut():any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userAuth')
      })
    };
    return this.httpClient.get(environment.apiURL+'api/auth/logout', httpOptions).pipe(catchError(this.handleError))
  }
  handleError(error) {

    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else { 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } 
    return throwError(error);
 
  }
}
