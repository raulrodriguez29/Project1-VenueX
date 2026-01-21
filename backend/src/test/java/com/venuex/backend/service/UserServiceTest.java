package com.venuex.backend.service;

import com.venuex.backend.DTO.UserResponseDTO;
import com.venuex.backend.controller.request.UserUpdateRequest;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock private UserRepository userRepository;
    @InjectMocks private UserService userService;

    private User testUser;
    private final Integer USER_ID = 1;
    private final String EMAIL = "owner@test.com";

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(USER_ID);
        testUser.setEmail(EMAIL);
        testUser.setFirstName("John");
        testUser.setLastName("Doe");
    }

    // HAPPY PATH CASES

    @Test
    @DisplayName("1. Get All: Should return list of DTOs for Admin")
    void getAllUsers_Success() {
        // Arrange
        when(userRepository.findAll()).thenReturn(List.of(testUser));

        // Act
        List<UserResponseDTO> result = userService.getAllUsers();

        // Assert
        assertEquals(1, result.size());
        assertEquals(EMAIL, result.get(0).getEmail());
    }

    @Test
    @DisplayName("2. Get By ID: Owner can view their own profile")
    void getUserById_AsOwner_Success() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));

        // Act
        UserResponseDTO result = userService.getUserById(USER_ID, EMAIL, "USER");

        // Assert
        assertNotNull(result);
        assertEquals(EMAIL, result.getEmail());
    }

    @Test
    @DisplayName("3. Update Profile: Owner successfully updates details")
    void updateUser_AsOwner_Success() {
        // Arrange
        UserUpdateRequest dto = new UserUpdateRequest();
        dto.setEmail("new@test.com");
        dto.setFirstName("Jane");

        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByEmail("new@test.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        User updated = userService.updateUser(USER_ID, dto, EMAIL, "USER");

        // Assert
        assertEquals("Jane", updated.getFirstName());
        verify(userRepository).save(testUser);
    }

    @Test
    @DisplayName("4. Delete: Owner can delete their own account")
    void deleteUser_AsOwner_Success() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));

        // Act
        userService.deleteUser(USER_ID, EMAIL, "USER");

        // Assert
        verify(userRepository, times(1)).delete(testUser);
    }

    // NEGATIVE PATH CASES

    @Test
    @DisplayName("5. Get By ID: Stranger viewing profile throws Exception")
    void getUserById_AsStranger_ThrowsException() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));

        // Act & Assert
        assertThrows(RuntimeException.class, () ->
                userService.getUserById(USER_ID, "hacker@test.com", "USER")
        );
    }

    @Test
    @DisplayName("6. Update Profile: Throws error if new email is already taken")
    void updateUser_EmailTaken_ThrowsException() {
        // Arrange
        UserUpdateRequest dto = new UserUpdateRequest();
        dto.setEmail("taken@test.com");
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByEmail("taken@test.com")).thenReturn(true);

        // Act & Assert
        assertThrows(RuntimeException.class, () ->
                userService.updateUser(USER_ID, dto, EMAIL, "USER")
        );
    }

    @Test
    @DisplayName("7. Delete: Stranger cannot delete account")
    void deleteUser_AsStranger_ThrowsException() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));

        // Act & Assert
        assertThrows(RuntimeException.class, () ->
                userService.deleteUser(USER_ID, "stranger@test.com", "USER")
        );
    }

    // EDGE CASES

    @Test
    @DisplayName("8. Update Profile: Partial update ignores null fields (Null Safety)")
    void updateUser_PartialUpdate_IgnoresNulls() {
        // Arrange
        UserUpdateRequest dto = new UserUpdateRequest();
        dto.setFirstName("NewName"); // Note: lastName/email are null in DTO
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        User result = userService.updateUser(USER_ID, dto, EMAIL, "USER");

        // Assert
        assertEquals("NewName", result.getFirstName());
        assertEquals("Doe", result.getLastName()); // Verify original data persists
    }

    @Test
    @DisplayName("9. Get By ID: Admin viewing any profile (Authorization Bypass)")
    void getUserById_AsAdmin_Success() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(testUser));

        // Act
        UserResponseDTO result = userService.getUserById(USER_ID, "admin@test.com", "ADMIN");

        // Assert
        assertNotNull(result);
        assertEquals(EMAIL, result.getEmail());
    }

    @Test
    @DisplayName("10. Search: Empty query returns empty list (Constraint Check)")
    void searchUsers_EmptyResult() {
        // Arrange
        String query = "NonExistentUser";
        when(userRepository.findByEmailContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(any(), any(), any()))
                .thenReturn(List.of());

        // Act
        List<UserResponseDTO> results = userService.searchUsers(query);

        // Assert
        assertTrue(results.isEmpty());
    }
}
