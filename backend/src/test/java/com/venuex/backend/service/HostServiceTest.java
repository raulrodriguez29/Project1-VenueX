package com.venuex.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.eq;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.HostRequestDTO;
import com.venuex.backend.entities.HostRequest.HostRequestStatus;
import com.venuex.backend.entities.Role;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.HostRequestRepository;
import com.venuex.backend.repository.RoleRepository;
import com.venuex.backend.repository.UserRepository;
import com.venuex.backend.entities.HostRequest;

@ExtendWith(MockitoExtension.class)
class HostServiceTest {

    @Mock
    private HostRequestRepository hostRequestRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private HostService hostService;

    private User user;
    private User admin;
    private HostRequest hostRequest;
    private Role hostRole;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);
        user.setEmail("user@test.com");
        user.setRoles(new HashSet<>());

        admin = new User();
        admin.setId(2);
        admin.setEmail("admin@test.com");

        hostRole = new Role();
        hostRole.setType("HOST");

        hostRequest = new HostRequest();
        hostRequest.setId(10);
        hostRequest.setUser(user);
        hostRequest.setStatus(HostRequestStatus.PENDING);
    }

    @Test
    void createHostRequest_success() {
        when(userRepository.findByEmail("user@test.com"))
            .thenReturn(Optional.of(user));
        when(hostRequestRepository.existsByUserAndStatus(user, HostRequestStatus.PENDING))
            .thenReturn(false);

        String result = hostService.createHostRequest("user@test.com", "USER");

        assertEquals("SUBMITTED", result);
        verify(hostRequestRepository).save(any(HostRequest.class));
    }

    @Test
    void createHostRequest_notUserRole_throwsUnauthorized() {
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
            () -> hostService.createHostRequest("user@test.com", "ADMIN"));

        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
    }

    @Test
    void getAllHostRequests_success() {
        when(hostRequestRepository.findAll())
            .thenReturn(List.of(hostRequest));

        List<HostRequestDTO> result = hostService.getAllHostRequests("ADMIN");

        assertEquals(1, result.size());
    }

    @Test
    void getAllHostRequests_notAdmin_throwsForbidden() {
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
            () -> hostService.getAllHostRequests("USER"));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
    }

    @Test
    void approveHostRequest_success() {
        when(userRepository.findByEmail("admin@test.com"))
            .thenReturn(Optional.of(admin));
        when(hostRequestRepository.findById(10))
            .thenReturn(Optional.of(hostRequest));
        when(roleRepository.findByRoleName("HOST"))
            .thenReturn(Optional.of(hostRole));

        hostService.approveHostRequest(10, "admin@test.com", "ADMIN");

        assertEquals(HostRequestStatus.APPROVED, hostRequest.getStatus());
        assertEquals(admin, hostRequest.getReviewedBy());
        assertTrue(user.getRoles().contains(hostRole));

        verify(notificationService).createNotification(eq(user), contains("approved"));
    }

    @Test
    void approveHostRequest_alreadyProcessed_throwsBadRequest() {
        hostRequest.setStatus(HostRequestStatus.APPROVED);

        when(userRepository.findByEmail("admin@test.com"))
            .thenReturn(Optional.of(admin));
        when(hostRequestRepository.findById(10))
            .thenReturn(Optional.of(hostRequest));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
            () -> hostService.approveHostRequest(10, "admin@test.com", "ADMIN"));

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }

    @Test
    void denyHostRequest_success() {
        when(userRepository.findByEmail("admin@test.com"))
            .thenReturn(Optional.of(admin));
        when(hostRequestRepository.findById(10))
            .thenReturn(Optional.of(hostRequest));

        hostService.denyHostRequest(10, "admin@test.com", "ADMIN");

        assertEquals(HostRequestStatus.DENIED, hostRequest.getStatus());
        assertEquals(admin, hostRequest.getReviewedBy());

        verify(notificationService).createNotification(eq(user), contains("denied"));
    }

    @Test
    void deleteHostRequest_creatorSuccess() {
        when(hostRequestRepository.findById(10))
            .thenReturn(Optional.of(hostRequest));

        hostService.deleteHostRequest(10, "user@test.com", "USER");

        verify(hostRequestRepository).delete(hostRequest);
    }

    @Test
    void deleteHostRequest_notCreatorOrAdmin_throwsForbidden() {
        when(hostRequestRepository.findById(10))
            .thenReturn(Optional.of(hostRequest));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
            () -> hostService.deleteHostRequest(10, "other@test.com", "USER"));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
    }
}
