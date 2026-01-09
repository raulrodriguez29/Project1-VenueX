package com.venuex.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venuex.backend.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService UserService;

    public AuthController(UserService UserService) {
        this.UserService = UserService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthDTO request) {
        //UserService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }
}

