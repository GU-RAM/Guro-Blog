import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Post, User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  constructor() {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/users`);
  }

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiURL}/users/${userId}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiURL}/posts`);
  }

  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiURL}/posts/`, {
      params: { userId: userId },
    });
  }

  getFilteredUserService(
    firstName?: string,
    lastName?: string,
    email?: string
  ): Observable<User[]> {
    let params = new HttpParams();
    if (firstName) {
      params = params.set('firstName', firstName);
    }
    if (lastName) {
      params = params.set('lastName', lastName);
    }
    if (email) {
      params = params.set('email', email);
    }

    console.log('Params:', params.toString()); // Log the parameters being sent

    return this.http.get<User[]>(`${environment.apiURL}/users/`, { params });
  }
}
