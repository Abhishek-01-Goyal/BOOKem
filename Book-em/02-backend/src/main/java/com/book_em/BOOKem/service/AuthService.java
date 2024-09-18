package com.book_em.BOOKem.service;

import com.book_em.BOOKem.dao.UsersRepository;
import com.book_em.BOOKem.dto.LoginRequest;
import com.book_em.BOOKem.dto.SignUpRequest;
import com.book_em.BOOKem.dto.SignUpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsersRepository userRepository; // Assuming you have a UserRepository for database operations

    public SignUpResponse signUp(SignUpRequest request) {
        // This method should be used to handle initial signup logic before OTP
        // If needed, you can add validation or additional steps here
        return new SignUpResponse("OTP sent to " + request.getEmail());
    }

    public void completeSignup(String email) {
        // Complete the signup process, e.g., save user to the database
        // Example:
        if (userExists(email)) {
            throw new RuntimeException("User already exists");
        }
        // Save user logic here
    }

    public String login(LoginRequest request) {
        // Implement your login logic here, e.g., validate credentials and generate token
        if (!validateCredentials(request)) {
            throw new RuntimeException("Invalid credentials");
        }
        return generateToken(request);
    }

    private boolean userExists(String email) {
        // Check if the user already exists
        return userRepository.existsByEmail(email);
    }

    private boolean validateCredentials(LoginRequest request) {
        // Validate user credentials
        return true; // Replace with actual validation logic
    }

    private String generateToken(LoginRequest request) {
        // Generate a token for the user
        return "token"; // Replace with actual token generation logic
    }
}
