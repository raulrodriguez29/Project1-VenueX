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

import com.venuex.backend.entities.user;
import com.venuex.backend.service.userService;

@RestController
@RequestMapping("/users")
public class userController {

    private final userService UserService;

    public userController(userService UserService) {
        this.UserService = UserService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<user> createUser(@RequestBody user User) {
        return ResponseEntity.ok(UserService.createUser(User));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<user>> getAllUsers() {
        return ResponseEntity.ok(UserService.getAllUsers());
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<user> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(UserService.getUserById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<user> updateUser(@PathVariable Integer id, @RequestBody user User) {
        return ResponseEntity.ok(UserService.updateUser(id, User));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        UserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

