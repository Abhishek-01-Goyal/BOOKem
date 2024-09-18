package com.book_em.BOOKem.controller;

import com.book_em.BOOKem.dto.*;
import com.book_em.BOOKem.service.EmailService;
import com.book_em.BOOKem.service.OtpService;
import com.book_em.BOOKem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthService authService;

    // Endpoint for signing up
    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            // Generate OTP
            String otp = otpService.generateOtp(signUpRequest.getEmail());
            // Send OTP via email
            emailService.sendOtpEmail(signUpRequest.getEmail(), otp);

            // Return a response indicating that OTP has been sent
            return ResponseEntity.ok(new SignUpResponse("OTP sent to " + signUpRequest.getEmail()));
        } catch (Exception e) {
            // Handle exceptions, e.g., user already exists
            return ResponseEntity.status(400).body(new SignUpResponse("Signup failed: " + e.getMessage()));
        }
    }

    // Endpoint for verifying OTP and completing the signup process
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationRequest request) {
        boolean isValidOtp = otpService.verifyOtp(request.getEmail(), request.getOtp());

        if (isValidOtp) {
            try {
                // Proceed with user registration or login
                authService.completeSignup(request.getEmail());
                return ResponseEntity.ok("OTP verified, user registered successfully");
            } catch (Exception e) {
                return ResponseEntity.status(400).body("User registration failed: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(401).body("Invalid OTP");
        }
    }

    // Endpoint for logging in
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Call service method to handle login
            String token = authService.login(loginRequest);
            return ResponseEntity.ok(new LoginResponse(token));
        } catch (Exception e) {
            // Handle exceptions, e.g., invalid credentials
            return ResponseEntity.status(401).body(new LoginResponse("Login failed: " + e.getMessage()));
        }
    }
}
