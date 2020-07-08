import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaViewService {

  constructor(private httpclient:HttpClient) { }

  feedFetch(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.httpclient.get(environment.apiURL+'api/idea/'+id, httpOptions)
  }

  createwriteup(model):any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userAuth')
      })
    };
    return this.httpclient.post(environment.apiURL+'api/auth/create-writeup',model, httpOptions).pipe(catchError(this.handleError))
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
