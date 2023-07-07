import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:3001/user/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  get(id:any): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  update(id:any, user:any):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/${id}`, JSON.stringify(user), this.httpOptions);
  }

}
