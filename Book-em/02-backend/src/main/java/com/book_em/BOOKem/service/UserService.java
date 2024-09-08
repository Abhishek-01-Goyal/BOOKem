package com.book_em.BOOKem.service;

import com.book_em.BOOKem.dao.UsersRepository;
import com.book_em.BOOKem.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UsersRepository userRepository;

    public Optional<Users> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Users saveUser(Users user) {
        return userRepository.save(user);
    }
}