import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/authentication'; // Backend URL

  constructor(private http: HttpClient) { }

  login(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  changePassword(data: { oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, data); // Update with actual backend endpoint
  }

  /**
   * Fetches the authenticated user's profile from the backend.
   */
  getUserProfile(): Observable<any> {
    return this.http.get<{ message: string; user: any }>(`${this.baseUrl}/profile`);
  }

  /**
  * Checks if the user is authenticated by verifying the token with the backend.
  * @returns Observable<boolean>
  */
  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ message: string; user: any }>(`${this.baseUrl}/verify`).pipe(
      map(response => {
        return !!response.user;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
