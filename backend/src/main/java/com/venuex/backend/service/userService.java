package com.venuex.backend.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.venuex.backend.entities.Role;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.RoleRepository;
import com.venuex.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository UserRepository;
    private final RoleRepository RoleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository UserRepository, RoleRepository RoleRepository, PasswordEncoder passwordEncoder) {
        this.UserRepository = UserRepository;
        this.RoleRepository = RoleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE
    public User createUser(User User) {
        if (UserRepository.existsByEmail(User.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User.setPassword_hash(passwordEncoder.encode(User.getPassword_hash()));

        Role userRole = RoleRepository.findByRoleName("USER")
            .orElseThrow(() -> new RuntimeException("USER role not found"));

        User.getRoles().add(userRole);

        return UserRepository.save(User);
    }

    // READ (by id)
    public User getUserById(Integer id) {
        return UserRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // READ (all)
    public List<User> getAllUsers() {
        return UserRepository.findAll();
    }

    // UPDATE
    public User updateUser(Integer id, User updatedUser) {
        User existing = getUserById(id);

        existing.setFirst_name(updatedUser.getFirst_name());
        existing.setLast_name(updatedUser.getLast_name());
        existing.setPhone(updatedUser.getPhone());

        return UserRepository.save(existing);
    }

    // UPDATE PASSWORD
    public void updatePassword(Integer id, String newPassword) {
        User User = getUserById(id);
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