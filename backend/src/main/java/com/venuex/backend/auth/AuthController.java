package com.venuex.backend.auth;

import com.venuex.backend.controller.request.LoginRequest;
import com.venuex.backend.entities.User;
import com.venuex.backend.entities.Role;
import com.venuex.backend.repository.UserRepository;
import com.venuex.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Find user in DB
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        // Validate user and password 
        // NOTE: Use BCrypt.checkpw or a PasswordEncoder here in production!
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {

            // Pick the "highest" role instead of joining them all
            // For example, if they have USER and ADMIN, we want "ADMIN"
            String primaryRole = user.getRoles().stream()
                    .map(Role::getType)
                    .sorted((a, b) -> compareRoles(b, a)) // Custom logic to pick best role
                    .findFirst()
                    .orElse("USER");

            // Generate token with the email and the roles string
            String token = jwtUtil.generateToken(user.getEmail(), primaryRole);

            // DEBUG: Check if something is null before making the map
            System.out.println("Token: " + token);
            System.out.println("Role: " + primaryRole);
            System.out.println("Email: " + user.getEmail());

            // Use a HashMap instead of Map.of() to avoid the NullPointer crash
            Map<String, String> responseMap = new java.util.HashMap<>();
            responseMap.put("token", token);
            responseMap.put("role", primaryRole);
            responseMap.put("email", user.getEmail());

            return ResponseEntity.ok(responseMap);
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if user exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email already exists!");
        }

        // Hash the password!
        // We encode the raw password before saving to DB
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // Helper method to prioritize roles
    private int compareRoles(String r1, String r2) {
        List<String> priority = Arrays.asList("GUEST", "USER", "HOST", "ADMIN", "SUPER_USER");
        return Integer.compare(priority.indexOf(r1), priority.indexOf(r2));
    }
}