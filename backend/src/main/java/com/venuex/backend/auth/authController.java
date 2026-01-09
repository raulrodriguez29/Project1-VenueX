package com.venuex.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venuex.backend.service.userService;

@RestController
@RequestMapping("/auth")
public class authController {

    private final userService UserService;

    public authController(userService UserService) {
        this.UserService = UserService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody authDTO request) {
        //UserService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }
}

