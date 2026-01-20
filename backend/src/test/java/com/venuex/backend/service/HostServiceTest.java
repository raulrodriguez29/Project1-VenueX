package com.venuex.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.HostRequestDTO;
import com.venuex.backend.entities.HostRequest;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.HostRequestRepository;

@ExtendWith(MockitoExtension.class)
public class HostServiceTest { //tests per method are organized alphabetically

    @Mock
    private HostRequestRepository hostRequestRepository;

    @InjectMocks
    private HostService hostService;

    User user;
    HostRequest hostRequest;

    @BeforeEach
    void setup() {
        user = new User();
        user.setEmail("timothy.olyphant68@gmail.com");
        user.setPhone("(469)-123-4567");
        user.setId(1);
        user.setFirstName("Timothy");
        user.setLastName("Olyphant");
        user.setPasswordHash("password");

        hostRequest = new HostRequest();
        hostRequest.setId(1);
        hostRequest.setUser(user);
        hostRequest.setStatus("PENDING");
        hostRequest.setRequestedAt(LocalDateTime.now().minusDays(1));
        hostRequest.setReviewedBy(user);
    }
    
    @Test
    void approveHostRequest_Success_ReturnHostRequest() {
        User admin = new User();
        admin.setEmail("drew.barrymore75@gmail.com");
        admin.setPhone("(469)-987-6543");
        admin.setId(2);
        admin.setFirstName("Drew");
        admin.setLastName("Barrymore");
        admin.setPasswordHash("password2");

        when(hostRequestRepository.findById(hostRequest.getId()))
            .thenReturn(Optional.of(hostRequest));

        when(hostRequestRepository.save(any(HostRequest.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        HostRequest result = hostService.approveHostRequest(hostRequest.getId(), admin);

        assertEquals(user, result.getUser());
        assertEquals("APPROVED", result.getStatus());
        assertEquals(hostRequest.getRequestedAt(), result.getRequestedAt());
        assertEquals(admin, result.getReviewedBy());

        verify(hostRequestRepository, times(1)).findById(hostRequest.getId());
        verify(hostRequestRepository, times(1)).save(hostRequest);
    }

    @Test
    void approveHostRequest_Failure_NotFound() {
        User admin = new User();
        admin.setEmail("drew.barrymore75@gmail.com");
        admin.setPhone("(469)-987-6543");
        admin.setId(2);
        admin.setFirstName("Drew");
        admin.setLastName("Barrymore");
        admin.setPasswordHash("password2");

        when(hostRequestRepository.findById(hostRequest.getId()))
            .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> hostService.approveHostRequest(hostRequest.getId(), admin)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Host Request not found", exception.getReason());


        verify(hostRequestRepository, times(1)).findById(hostRequest.getId());
        verify(hostRequestRepository, never()).save(any());
    }

    @Test
    void createHostRequest_Success_ReturnHostRequest() {
        when(hostRequestRepository.existsById(hostRequest.getId()))
            .thenReturn(false);
        when(hostRequestRepository.save(hostRequest))
            .thenReturn(hostRequest);

        HostRequest result = hostService.createHostRequest(hostRequest);

        assertNotNull(result);
        assertSame(hostRequest, result);

        verify(hostRequestRepository, times(1)).existsById(hostRequest.getId());
        verify(hostRequestRepository, times(1)).save(hostRequest);
    }

    @Test
    void createHostRequest_Failure_AlreadyExists() {
        when(hostRequestRepository.existsById(hostRequest.getId()))
            .thenReturn(true);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> hostService.createHostRequest(hostRequest)
        );

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        assertEquals("Host Request already exists", exception.getReason());

        verify(hostRequestRepository, times(1)).existsById(hostRequest.getId());
        verify(hostRequestRepository, never()).save(hostRequest);
    }

    @Test
    void deleteHostRequest_SUCCESS_ReturnVoid() {
        when(hostRequestRepository.existsById(hostRequest.getId()))
            .thenReturn(true);
        doNothing().when(hostRequestRepository).deleteById(hostRequest.getId());

        hostService.deleteHostRequest(hostRequest.getId());

        verify(hostRequestRepository, times(1)).existsById(hostRequest.getId());
        verify(hostRequestRepository, times(1)).deleteById(hostRequest.getId());
    }

    @Test
    void deleteHostRequest_FAILURE_NotFound() {
        when(hostRequestRepository.existsById(hostRequest.getId()))
            .thenReturn(false);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> hostService.deleteHostRequest(hostRequest.getId())
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Host Request not found", exception.getReason());

        verify(hostRequestRepository, times(1)).existsById(hostRequest.getId());
        verify(hostRequestRepository, never()).deleteById(any());
    }

    @Test
    void denyHostRequest_Success_ReturnHostRequest() {
        User admin = new User();
        admin.setEmail("drew.barrymore75@gmail.com");
        admin.setPhone("(469)-987-6543");
        admin.setId(2);
        admin.setFirstName("Drew");
        admin.setLastName("Barrymore");
        admin.setPasswordHash("password2");

        when(hostRequestRepository.findById(hostRequest.getId()))
            .thenReturn(Optional.of(hostRequest));

        when(hostRequestRepository.save(any(HostRequest.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        HostRequest result = hostService.denyHostRequest(hostRequest.getId(), admin);

        assertEquals(user, result.getUser());
        assertEquals("DENIED", result.getStatus());
        assertEquals(hostRequest.getRequestedAt(), result.getRequestedAt());
        assertEquals(admin, result.getReviewedBy());

        verify(hostRequestRepository, times(1)).findById(hostRequest.getId());
        verify(hostRequestRepository, times(1)).save(hostRequest);
    }

    @Test
    void denyHostRequest_Failure_NotFound() {
        User admin = new User();
        admin.setEmail("drew.barrymore75@gmail.com");
        admin.setPhone("(469)-987-6543");
        admin.setId(2);
        admin.setFirstName("Drew");
        admin.setLastName("Barrymore");
        admin.setPasswordHash("password2");

        when(hostRequestRepository.findById(hostRequest.getId()))
            .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> hostService.denyHostRequest(hostRequest.getId(), admin)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Host Request not found", exception.getReason());


        verify(hostRequestRepository, times(1)).findById(hostRequest.getId());
        verify(hostRequestRepository, never()).save(any());
    }

    @Test
    void getAllHostRequests_Success_ReturnHostRequests() {
        List<HostRequest> hostRequests = List.of(hostRequest);
        when(hostRequestRepository.findAll()).thenReturn(hostRequests);

        List<HostRequest> result = hostService.getAllHostRequests();

        assertEquals(1, result.size());
        assertSame(hostRequest, result.get(0));
        
        verify(hostRequestRepository, times(1)).findAll();
    }

    @Test
    void getAllHostRequests_Failure_ReturnEmpty() {
        List<HostRequest> hostRequests = List.of();
        when(hostRequestRepository.findAll()).thenReturn(hostRequests);

        List<HostRequest> result = hostService.getAllHostRequests();

        assertEquals(0, result.size());
        
        verify(hostRequestRepository, times(1)).findAll();
    }

    @Test
    void getHostRequest_Success_ReturnHostRequest() {
        when(hostRequestRepository.findById(hostRequest.getId())).
            thenReturn(Optional.of(hostRequest));

        HostRequest result = hostService.getHostRequest(hostRequest.getId());

        assertSame(hostRequest, result);
        
        verify(hostRequestRepository, times(1)).findById(hostRequest.getId());
    }

    @Test
    void getHostRequest_Failure_NotFound() {
        when(hostRequestRepository.findById(hostRequest.getId())).
            thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class, 
            () -> hostService.getHostRequest(hostRequest.getId()));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Host Request not found", exception.getReason());
        
        verify(hostRequestRepository, times(1)).findById(hostRequest.getId());
    }

    @Test
    void mapToDTO_Success_ReturnHostRequestDTO() {
        HostRequestDTO expected = new HostRequestDTO();
        expected.setId(hostRequest.getId());
        expected.setStatus(hostRequest.getStatus());
        expected.setUserId(user.getId());
        expected.setRequestedAt(hostRequest.getRequestedAt());
        expected.setReviewedBy(hostRequest.getReviewedBy().getId());

        HostRequestDTO result = hostService.mapToDTO(hostRequest);

        assertEquals(expected, result);
    }

    @Test
    void updateHostRequest_Success_ReturnHostRequest() {
        when(hostRequestRepository.existsById(hostRequest.getId()))
            .thenReturn(true);

        when(hostRequestRepository.save(hostRequest))
            .thenReturn(hostRequest);

        HostRequest result = hostService.updateHostRequest(hostRequest);

        assertEquals(hostRequest.getStatus(), result.getStatus());
        assertEquals(hostRequest.getRequestedAt(), result.getRequestedAt());
        assertEquals(hostRequest.getReviewedBy(), result.getReviewedBy());

        verify(hostRequestRepository, times(1)).existsById(hostRequest.getId());
        verify(hostRequestRepository, times(1)).save(hostRequest);
    }

    @Test
    void updateHostRequest_Failure_NotFound() {
        when(hostRequestRepository.existsById(hostRequest.getId()))
            .thenReturn(false);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class, 
            () -> hostService.updateHostRequest(hostRequest));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Host Request not found", exception.getReason());

        verify(hostRequestRepository, times(1)).existsById(hostRequest.getId());
        verify(hostRequestRepository, never()).save(any());

    }

}
