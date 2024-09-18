import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  isSignUp = true;  // Track whether it's sign-up or sign-in form
  signupForm: FormGroup;
  otpForm: FormGroup;
  loginForm: FormGroup;
  otpSent = false;
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
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Function to handle form toggle (sign-up/sign-in)
  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.otpSent = false; // Reset OTP state when toggling forms

    const container = this.el.nativeElement.querySelector('#container');
    if (this.isSignUp) {
      this.renderer.removeClass(container, 'right-panel-active');
    } else {
      this.renderer.addClass(container, 'right-panel-active');
    }
  }

  // Handles sign-up form submission
  signUp() {
    if (this.signupForm.valid) {
      this.authService.signUp(this.signupForm.value).subscribe(
        (response: any) => {
          if (response.otpRequired) {
            this.otpSent = true;
            this.otpData.email = this.signupForm.get('email')?.value;
          } else {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
    }
  }

  // OTP verification
  verifyOtp() {
    this.authService.verifyOtp(this.otpData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('OTP verification failed', error);
      }
    );
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

  // Function to send OTP for verification
  sendOtp() {
    if (this.otpData.email) {
      this.authService.sendOtp(this.otpData.email).subscribe(
        (response: any) => {
          this.otpSent = true;
        },
        (error) => {
          console.error('OTP sending failed', error);
        }
      );
    }
  }

  // Function for forgot password (yet to implement logic)
  forgotPassword() {
    console.log('Forgot Password');
  }

  // Social sign-up and login methods
  signUpWith(platform: string) {
    window.location.href = `https://localhost:8080/api/auth/${platform}/signup`;
  }

  loginWith(platform: string) {
    window.location.href = `https://localhost:8080/api/auth/${platform}/login`;
  }
}
