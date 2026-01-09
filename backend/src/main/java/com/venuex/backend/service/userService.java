package com.venuex.backend.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.venuex.backend.entities.role;
import com.venuex.backend.entities.user;
import com.venuex.backend.repository.roleRepository;
import com.venuex.backend.repository.userRepository;

@Service
public class userService {

    private final userRepository UserRepository;
    private final roleRepository RoleRepository;
    private final PasswordEncoder passwordEncoder;

    public userService(userRepository UserRepository, roleRepository RoleRepository, PasswordEncoder passwordEncoder) {
        this.UserRepository = UserRepository;
        this.RoleRepository = RoleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE
    public user createUser(user User) {
        if (UserRepository.existsByEmail(User.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User.setPassword_hash(passwordEncoder.encode(User.getPassword_hash()));

        role userRole = RoleRepository.findByRoleName("USER")
            .orElseThrow(() -> new RuntimeException("USER role not found"));

        User.getRoles().add(userRole);

        return UserRepository.save(User);
    }

    // READ (by id)
    public user getUserById(Integer id) {
        return UserRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // READ (all)
    public List<user> getAllUsers() {
        return UserRepository.findAll();
    }

    // UPDATE
    public user updateUser(Integer id, user updatedUser) {
        user existing = getUserById(id);

        existing.setFirst_name(updatedUser.getFirst_name());
        existing.setLast_name(updatedUser.getLast_name());
        existing.setPhone(updatedUser.getPhone());

        return UserRepository.save(existing);
    }

    // UPDATE PASSWORD
    public void updatePassword(Integer id, String newPassword) {
        user User = getUserById(id);
        User.setPassword_hash(passwordEncoder.encode(newPassword));
        UserRepository.save(User);
    }

    // DELETE
    public void deleteUser(Integer id) {
        if (!UserRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        UserRepository.deleteById(id);
    }
}