import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Update with your actual API URL
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  // Sign up method
  signUp(signUpData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, signUpData);
  }

  // Login method (API call)
  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginData);
  }

  // Send OTP method
  sendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/send-otp`, { email });
  }

  // Verify OTP method
  verifyOtp(otpData: { email: string, otp: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-otp`, otpData);
  }

  // Mock login state for frontend logic; in a real app, this would check tokens, etc.
  isAuthenticated(): boolean {
    // You can add logic to check authentication (e.g., JWT tokens)
    return this.loggedIn;
  }

  // Update frontend login status after login
  setLoginStatus(status: boolean): void {
    this.loggedIn = status;
  }

  // Logout method
  logout(): void {
    this.loggedIn = false;
    // Perform any additional logout logic, like clearing tokens
  }
}
