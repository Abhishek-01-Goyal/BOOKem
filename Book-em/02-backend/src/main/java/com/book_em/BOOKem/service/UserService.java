package com.book_em.BOOKem.service;

import com.book_em.BOOKem.dao.UsersRepository;
import com.book_em.BOOKem.entity.Users;
import com.book_em.BOOKem.entity.Users.UserStatus; // Correct import for nested enum
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

    @Autowired
    private UsersRepository userRepository;

    private Map<String, String> otpStore = new ConcurrentHashMap<>();

    // User Management Methods
    public Optional<Users> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    // OTP Methods
    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(1000000)); // Pad OTP with leading zeros
        otpStore.put(email, otp);
        return otp;
    }

    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStore.get(email);
        return storedOtp != null && storedOtp.equals(otp);
    }

    // User Activation Method
    public void activateUser(String email) {
        Optional<Users> user = findByEmail(email);
        if (user.isPresent()) {
            Users u = user.get();
            u.setStatus(UserStatus.ACTIVE); // Use the correct UserStatus enum
            saveUser(u);
        }
        otpStore.remove(email); // Clean up OTP store after activation
    }
}
