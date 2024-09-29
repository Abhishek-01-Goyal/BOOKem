import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Assuming the AuthService is located in 'services'
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  isSignUp: boolean = true; // Track whether it's sign-up or login form
  signupForm: FormGroup;
  otpForm: FormGroup;
  loginForm: FormGroup;
  otpSent: boolean = false;
  showOTPInput: boolean = false; // Show OTP input field only after sending OTP

  // Data for OTP and login handling
  otpData = {
    email: '',
    otp: ''
  };
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // Initialize forms with validation
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      otp: [''] // OTP field (used after OTP is sent)
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Function to toggle between sign-up and login forms
  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.showOTPInput = false;
    this.otpSent = false; // Reset OTP state when toggling forms

    const container = this.el.nativeElement.querySelector('#container');
    if (this.isSignUp) {
      this.renderer.removeClass(container, 'right-panel-active');
    } else {
      this.renderer.addClass(container, 'right-panel-active');
    }
  }

  // Sign-up flow: handles OTP sending, verification, and sign-up
  signUp() {
    if (this.signupForm.invalid) {
      // Handle validation errors
      return;
    }

    if (!this.showOTPInput) {
      // Step 1: Send OTP for email verification
      const email = this.signupForm.get('email')?.value;
      this.authService.sendOtp(email).subscribe(
        response => {
          this.showOTPInput = true; // Show OTP input field
          this.otpData.email = email; // Store email for OTP verification
        },
        error => {
          console.error('Error sending OTP:', error);
        }
      );
    } else {
      // Step 2: Verify OTP and complete sign-up
      this.otpData.otp = this.signupForm.get('otp')?.value;
      this.authService.verifyOtp(this.otpData).subscribe(
        response => {
          // OTP verified, now complete user registration
          this.authService.signUp(this.signupForm.value).subscribe(
            res => {
              localStorage.setItem('token', res.token);
              this.router.navigate(['/home']);
            },
            err => {
              console.error('Sign-up failed:', err);
            }
          );
        },
        error => {
          console.error('Invalid OTP:', error);
        }
      );
    }
  }

  // Handles login form submission
  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

  // Function to reset password (logic to be implemented later)
  //forgotPassword() {
    //const email = this.loginForm.get('email')?.value;
    //this.authService.resetPassword(email).subscribe(
      //response => {
        //console.log('Reset password email sent');
      //},
      //error => {
        //console.error('Error resetting password:', error);
      //}
    //);
  //}

  // Social sign-up and login methods
  signUpWith(platform: string) {
    window.location.href = `https://localhost:8080/api/auth/${platform}/signup`;
  }

  loginWith(platform: string) {
    window.location.href = `https://localhost:8080/api/auth/${platform}/login`;
  }
}
