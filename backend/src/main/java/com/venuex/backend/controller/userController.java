package com.venuex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venuex.backend.entities.User;
import com.venuex.backend.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService UserService;

    public UserController(UserService UserService) {
        this.UserService = UserService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User User) {
        return ResponseEntity.ok(UserService.createUser(User));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(UserService.getAllUsers());
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(UserService.getUserById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User User) {
        return ResponseEntity.ok(UserService.updateUser(id, User));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        UserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

