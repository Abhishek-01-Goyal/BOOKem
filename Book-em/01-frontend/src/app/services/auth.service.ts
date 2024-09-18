import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Update with your actual API URL
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Observable to get current login status
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // Sign up method
  signUp(signUpData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, signUpData);
  }

  // Login method
  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginData).pipe(
      tap(() => this.loggedInSubject.next(true)) // Update login status
    );
  }

  // Logout method
  logout(): void {
    this.loggedInSubject.next(false); // Update login status
  }

  // Send OTP method
  sendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/send-otp`, { email });
  }

  // Verify OTP method
  verifyOtp(otpData: { email: string, otp: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-otp`, otpData);
  }
}
