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
    private final String EMAIL = "josh@test.com";
    private final String RAW_PW = "password";
    private final String HASHED_PW = "$2a$10$lVZ1Fro/ltA8triMTiJ4O./LHOKiOCLk0SFg7Ah6HyA50CDY79g.y";

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1); // Integer ID
        testUser.setEmail(EMAIL);
        testUser.setPasswordHash(HASHED_PW);
        testUser.setFirstName("Josh");
        testUser.setLastName("Lian");
        testUser.setPhone("555-0103");

        Role userRole = new Role();
        userRole.setType("USER");
        testUser.setRoles(Set.of(userRole));
    }

    @Test
    @DisplayName("1. Authenticate: Correct credentials return all response fields")
    void authenticate_Success() {
        // Arrange
        LoginRequest request = new LoginRequest(EMAIL, RAW_PW);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(RAW_PW, HASHED_PW)).thenReturn(true);
        when(jwtUtil.generateToken(EMAIL, "USER")).thenReturn("jwt-token-123");

        // Act
        AuthResponse response = authService.authenticate(request);

        // Assert
        assertAll(
                () -> assertEquals(1, response.getId()),
                () -> assertEquals("jwt-token-123", response.getToken()),
                () -> assertEquals("USER", response.getRole()),
                () -> assertEquals(EMAIL, response.getEmail()),
                () -> assertEquals("Josh", response.getFirstName()),
                () -> assertEquals("Lian", response.getLastName()),
                () -> assertEquals("555-0103", response.getPhone())
        );
    }

    @Test
    @DisplayName("2. Register: New user creation maps all fields to response")
    void register_Success() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setEmail(EMAIL);
        when(userService.registerNewUser(any(RegisterRequest.class))).thenReturn(testUser);
        when(jwtUtil.generateToken(EMAIL, "USER")).thenReturn("reg-token");

        // Act
        AuthResponse response = authService.register(request);

        // Assert
        assertAll(
                () -> assertEquals(1, response.getId()),
                () -> assertEquals("reg-token", response.getToken()),
                () -> assertEquals("Josh", response.getFirstName()),
                () -> assertEquals("Lian", response.getLastName()),
                () -> assertEquals("555-0103", response.getPhone()),
                () -> assertEquals(EMAIL, response.getEmail())
        );
        verify(userService, times(1)).registerNewUser(request);
    }

    @Test
    @DisplayName("3. Highest Role: Logic correctly identifies ADMIN priority")
    void getHighestRole_AdminPriority() {
        // Arrange
        Role adminRole = new Role(); adminRole.setType("ADMIN");
        Role userRole = new Role(); userRole.setType("USER");
        testUser.setRoles(Set.of(userRole, adminRole));

        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);
        when(jwtUtil.generateToken(eq(EMAIL), eq("ADMIN"))).thenReturn("admin-token");

        // Act
        AuthResponse res = authService.authenticate(new LoginRequest(EMAIL, RAW_PW));

        // Assert
        assertEquals("ADMIN", res.getRole());
    }

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
    void register_FailsOnExistingEmail() {
        // Arrange
        when(userService.registerNewUser(any())).thenThrow(new RuntimeException("Email taken"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.register(new RegisterRequest()));
    }

    @Test
    @DisplayName("7. Role Logic: Defaults to USER if user has no roles assigned")
    void authenticate_EmptyRolesDefaultsToUser() {
        // Arrange
        testUser.setRoles(Collections.emptySet());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);
        LoginRequest request = new LoginRequest(EMAIL, RAW_PW);

        // Act
        AuthResponse res = authService.authenticate(request);

        // Assert
        assertEquals("USER", res.getRole());
        verify(jwtUtil).generateToken(EMAIL, "USER");
    }

    @Test
    @DisplayName("8. Role Logic: Priority check for HOST vs USER")
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

    @Test
    @DisplayName("9. Authenticate: Verifies repository and encoder interactions")
    void authenticate_VerifyWorkflow() {
        // Arrange
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(RAW_PW, HASHED_PW)).thenReturn(true);

        // Act
        authService.authenticate(new LoginRequest(EMAIL, RAW_PW));

        // Assert
        verify(userRepository).findByEmail(EMAIL);
        verify(passwordEncoder).matches(RAW_PW, HASHED_PW);
        verify(jwtUtil).generateToken(EMAIL, "USER");
    }

    @Test
    @DisplayName("10. Highest Role: Peak priority for SUPER_USER")
    void getHighestRole_SuperUserPriority() {
        // Arrange
        Role superRole = new Role(); superRole.setType("SUPER_USER");
        Role adminRole = new Role(); adminRole.setType("ADMIN");
        testUser.setRoles(Set.of(adminRole, superRole));

        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);

        // Act
        AuthResponse res = authService.authenticate(new LoginRequest(EMAIL, RAW_PW));

        // Assert
        assertEquals("SUPER_USER", res.getRole());
    }
}