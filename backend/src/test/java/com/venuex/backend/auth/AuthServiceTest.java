package com.venuex.backend.auth;

import com.venuex.backend.controller.request.LoginRequest;
import com.venuex.backend.controller.request.RegisterRequest;
import com.venuex.backend.entities.Role;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.UserRepository;
import com.venuex.backend.security.JwtUtil;
import com.venuex.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private JwtUtil jwtUtil;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private UserService userService;

    @InjectMocks private AuthService authService;

    private User testUser;
    private final String EMAIL = "test@venuex.com";
    private final String RAW_PW = "password123";
    private final String HASHED_PW = "encoded_hash";

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1);
        testUser.setEmail(EMAIL);
        testUser.setPasswordHash(HASHED_PW);

        Role userRole = new Role();
        userRole.setType("USER");
        testUser.setRoles(Set.of(userRole));
    }

    // HAPPY PATH CASES
    @Test
    @DisplayName("1. Authenticate: Correct credentials return full response")
    void authenticate_Success() {
        // Arrange
        LoginRequest request = new LoginRequest(EMAIL, RAW_PW);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(RAW_PW, HASHED_PW)).thenReturn(true);
        when(jwtUtil.generateToken(EMAIL, "USER")).thenReturn("token");

        // Act
        AuthResponse response = authService.authenticate(request);

        // Assert
        assertAll(
                () -> assertEquals(EMAIL, response.getEmail()),
                () -> assertEquals("USER", response.getRole()),
                () -> assertNotNull(response.getToken())
        );
    }

    @Test
    @DisplayName("2. Register: New user creation returns token")
    void register_Success() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setEmail(EMAIL);
        when(userService.registerNewUser(any())).thenReturn(testUser);
        when(jwtUtil.generateToken(EMAIL, "USER")).thenReturn("token");

        // Act
        AuthResponse response = authService.register(request);

        // Assert
        assertNotNull(response.getToken());
        verify(userService, times(1)).registerNewUser(request);
    }

    @Test
    @DisplayName("3. Highest Role: Logic correctly identifies SUPER_USER priority")
    void getHighestRole_SuperUserPriority() {
        // Arrange
        Role superRole = new Role(); superRole.setType("SUPER_USER");
        Role adminRole = new Role(); adminRole.setType("ADMIN");
        testUser.setRoles(Set.of(adminRole, superRole));
        LoginRequest request = new LoginRequest(EMAIL, RAW_PW);

        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);
        when(jwtUtil.generateToken(eq(EMAIL), eq("SUPER_USER"))).thenReturn("su-token");

        // Act
        AuthResponse res = authService.authenticate(request);

        // Assert
        assertEquals("SUPER_USER", res.getRole());
    }

    // NEGATIVE PATH CASES
    @Test
    @DisplayName("4. Authenticate: Throws error for non-existent email")
    void authenticate_UserNotFound() {
        // Arrange
        when(userRepository.findByEmail("fake@test.com")).thenReturn(Optional.empty());
        LoginRequest request = new LoginRequest("fake@test.com", "pw");

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.authenticate(request));
    }

    @Test
    @DisplayName("5. Authenticate: Throws error for incorrect password")
    void authenticate_WrongPassword() {
        // Arrange
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrong", HASHED_PW)).thenReturn(false);
        LoginRequest request = new LoginRequest(EMAIL, "wrong");

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.authenticate(request));
    }

    @Test
    @DisplayName("6. Register: Propagates error if UserService fails")
    void register_FailsWhenEmailTaken() {
        // Arrange
        when(userService.registerNewUser(any())).thenThrow(new RuntimeException("Email taken"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.register(new RegisterRequest()));
    }

    @Test
    @DisplayName("7. Role Logic: Defaults to USER if user has zero roles")
    void authenticate_EmptyRolesDefaultsToUser() {
        // Arrange
        testUser.setRoles(Collections.emptySet());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);
        LoginRequest request = new LoginRequest(EMAIL, RAW_PW);

        // Act
        authService.authenticate(request);

        // Assert
        verify(jwtUtil).generateToken(EMAIL, "USER");
    }

    // EDGE CASES

    @Test
    @DisplayName("8. Authenticate: Case sensitivity check on email lookup")
    void authenticate_EmailCaseSensitivity() {
        // Arrange
        LoginRequest request = new LoginRequest("TEST@VENUEX.COM", RAW_PW);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        // Act
        authService.authenticate(request);

        // Assert
        verify(userRepository).findByEmail("TEST@VENUEX.COM");
    }

    @Test
    @DisplayName("9. Register: Token is generated even if user has no ID yet")
    void register_NoIdSafety() {
        // Arrange
        User unsavedUser = new User();
        unsavedUser.setEmail("new@test.com");
        when(userService.registerNewUser(any())).thenReturn(unsavedUser);

        // Act
        authService.register(new RegisterRequest());

        // Assert
        verify(jwtUtil).generateToken("new@test.com", "USER");
    }

    @Test
    @DisplayName("10. Highest Role: Correctly picks HOST over USER")
    void getHighestRole_HostPriority() {
        // Arrange
        Role host = new Role(); host.setType("HOST");
        Role user = new Role(); user.setType("USER");
        testUser.setRoles(Set.of(host, user));
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);

        // Act
        AuthResponse res = authService.authenticate(new LoginRequest(EMAIL, RAW_PW));

        // Assert
        assertEquals("HOST", res.getRole());
    }

}
