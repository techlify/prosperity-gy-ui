import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) { }

  feedData():any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.httpClient.get(environment.apiURL+'api/idea', httpOptions)
  }

  createIdea(model):any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userAuth')
      })
    };
    return this.httpClient.post(environment.apiURL+'api/auth/create-idea',model, httpOptions).pipe(catchError(this.handleError))
  }

  updateIdea(model):any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userAuth')
      })
    };
    return this.httpClient.post(environment.apiURL+'api/auth/update-idea',model, httpOptions).pipe(catchError(this.handleError))
  }
  fetchCategories():any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userAuth')
      })
    };
    return this.httpClient.get(environment.apiURL+'api/auth/category', httpOptions)
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
