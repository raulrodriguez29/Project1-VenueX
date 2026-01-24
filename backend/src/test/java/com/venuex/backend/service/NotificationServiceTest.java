package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.NotificationDTO;
import com.venuex.backend.entities.Notification;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.NotificationRepository;
import com.venuex.backend.repository.UserRepository;



@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private NotificationService notificationService;

    private User user;
    private Notification notification;

    @BeforeEach
    void setup() {
        user = new User();
        user.setId(1);
        user.setEmail("test@gmail.com");
        user.setFirstName("Josh");

        notification = new Notification(
            user,
            Notification.EmailType.EMAIL,
            "Test message"
        );
        notification.setSentAt(LocalDateTime.now());
    }

    @Test
    void mapToDTO_success() {
        NotificationDTO dto = notificationService.mapToDTO(notification);

        assertNotNull(dto);
        assertEquals("Josh", dto.getUserName());
        assertEquals("Test message", dto.getMessage());
        assertEquals(notification.getSentAt(), dto.getSentAt());
    }

    @Test
    void getUserNotification_success() {
        when(userRepository.findByEmail("test@gmail.com"))
            .thenReturn(Optional.of(user));
        when(notificationRepository.findByUserIdOrderBySentAtDesc(1))
            .thenReturn(List.of(notification));

        List<NotificationDTO> result =
            notificationService.getUserNotification("test@gmail.com");

        assertEquals(1, result.size());
        assertEquals("Josh", result.get(0).getUserName());
        assertEquals("Test message", result.get(0).getMessage());
    }

    @Test
    void getUserNotification_userNotFound() {
        when(userRepository.findByEmail("test@gmail.com"))
            .thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () -> notificationService.getUserNotification("test@gmail.com")
        );

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("User not found", ex.getReason());
    }

    @Test
    void createNotification_success() {
        when(notificationRepository.save(any(Notification.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        Notification result =
            notificationService.createNotification(user, "Hello!");

        assertNotNull(result);
        assertEquals("Hello!", result.getMessage());
        assertEquals(user, result.getUser());
        verify(notificationRepository).save(any(Notification.class));
    }

    @Test
    void createNotification_userNull() {
        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () -> notificationService.createNotification(null, "Hello")
        );

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("User not found", ex.getReason());
        verify(notificationRepository, never()).save(any());
    }

    @Test
    void createNotification_messageBlank() {
        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () -> notificationService.createNotification(user, " ")
        );

        assertEquals(HttpStatus.NOT_ACCEPTABLE, ex.getStatusCode());
        assertEquals("Message cannot be empty", ex.getReason());
        verify(notificationRepository, never()).save(any());
    }

    @Test
    void deleteNotification_success() {
        when(notificationRepository.findById(1))
            .thenReturn(Optional.of(notification));

        notificationService.deleteNotification(1, "test@gmail.com");

        verify(notificationRepository).delete(notification);
    }

    @Test
    void deleteNotification_notFound() {
        when(notificationRepository.findById(1))
            .thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () -> notificationService.deleteNotification(1, "test@gmail.com")
        );

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Notification not found", ex.getReason());
    }

    @Test
    void deleteNotification_unauthorized() {
        when(notificationRepository.findById(1))
            .thenReturn(Optional.of(notification));

        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () -> notificationService.deleteNotification(1, "other@gmail.com")
        );

        assertEquals(HttpStatus.UNAUTHORIZED, ex.getStatusCode());
        assertEquals("User not authorized to delete", ex.getReason());
        verify(notificationRepository, never()).delete(any());
    }
}
