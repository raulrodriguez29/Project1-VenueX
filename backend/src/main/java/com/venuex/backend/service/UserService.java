package com.venuex.backend.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.venuex.backend.entities.Role;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.RoleRepository;
import com.venuex.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        Role userRole = roleRepository.findByRoleName("USER")
            .orElseThrow(() -> new RuntimeException("USER role not found"));

        user.getRoles().add(userRole);

        return userRepository.save(user);
    }

    // READ (by id)
    public User getUserById(Integer id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // READ (all)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // UPDATE
    public User updateUser(Integer id, User updatedUser) {
        User existing = getUserById(id);

        existing.setFirstName(updatedUser.getFirstName());
        existing.setLastName(updatedUser.getLastName());
        existing.setPhone(updatedUser.getPhone());

        return userRepository.save(existing);
    }

    // UPDATE PASSWORD
    public void updatePassword(Integer id, String newPassword) {
        User User = getUserById(id);
        User.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(User);
    }

    // DELETE
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}