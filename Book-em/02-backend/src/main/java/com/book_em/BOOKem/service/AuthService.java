package com.book_em.BOOKem.service;

import com.book_em.BOOKem.dao.UsersRepository;
import com.book_em.BOOKem.dto.LoginRequest;
import com.book_em.BOOKem.dto.SignUpRequest;
import com.book_em.BOOKem.dto.SignUpResponse;
import com.book_em.BOOKem.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsersRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Sign up method with OTP
    public SignUpResponse signUp(SignUpRequest request) {
        if (userExists(request.getEmail())) {
            throw new RuntimeException("User already exists");
        }

        // Hash the password before saving the user
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Create a new User entity and save it to the database
        Users newUser = new Users();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(hashedPassword);
        newUser.setStatus(Users.UserStatus.INACTIVE); // Default status, pending activation via OTP
        userRepository.save(newUser);

        // Send OTP to user's email (the actual OTP sending logic is not shown here)
        // Generate and return OTP response
        return new SignUpResponse("OTP sent to " + request.getEmail());
    }

    // Complete sign-up after OTP validation
    public void completeSignup(String email) {
        Optional<Users> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.setStatus(Users.UserStatus.ACTIVE); // Activate user after OTP validation
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Login logic
    public String login(LoginRequest request) {
        // Retrieve user by email
        Optional<Users> userOptional = userRepository.findByEmail(request.getEmail());

        if (!userOptional.isPresent()) {
            throw new RuntimeException("Invalid credentials"); // User not found
        }

        Users user = userOptional.get();

        // Validate the password using BCryptPasswordEncoder
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials"); // Incorrect password
        }

        // Generate a token (JWT or any token mechanism)
        return generateToken(user);
    }

    // Helper methods
    private boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }

    private String generateToken(Users user) {
        // Logic for generating a token (e.g., JWT) after successful login
        // Placeholder for actual token generation
        return "token";
    }
}
