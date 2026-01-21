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

import com.venuex.backend.DTO.NotificationDTO;
import com.venuex.backend.entities.Notification;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.NotificationRepository;

@ExtendWith(MockitoExtension.class)
public class NotificationServiceTest { //tests per method are organized alphabetically
    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationService notificationService;

    User user;
    Notification notification;

    @BeforeEach
    void setup() {
        user = new User();
        user.setEmail("oscar.isaac79@gmail.com");
        user.setPhone("(972)-123-4567");
        user.setId(1);
        user.setFirstName("Oscar");
        user.setLastName("Isaac");
        user.setPasswordHash("password");
        // hopefully don't need user.setRoles();

        notification = new Notification();
        notification.setMessage("New Notification!");
        notification.setType("EMAIL");
        notification.setUser(user);
        notification.setSentAt(LocalDateTime.now());
    }

    @Test
    void createNotification_Success_ReturnNotification() { 
        when(notificationRepository.existsById(notification.getId()))
            .thenReturn(false);
        when(notificationRepository.save(notification))
            .thenReturn(notification);

        Notification result = notificationService.createNotification(notification);

        assertNotNull(result);
        assertSame(notification, result);

        verify(notificationRepository, times(1)).existsById(notification.getId());
        verify(notificationRepository, times(1)).save(notification);
    }

    @Test
    void createNotification_Failure_AlreadyExists() {
        when(notificationRepository.existsById(notification.getId()))
            .thenReturn(true);

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> notificationService.createNotification(notification)
        );

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        assertEquals("Notification already exists", exception.getReason());

        verify(notificationRepository).existsById(notification.getId());
        verify(notificationRepository, never()).save(any());
    }
    
    @Test
    void deleteNotification_Success_ReturnVoid() {
        when(notificationRepository.findById(notification.getId()))
            .thenReturn(Optional.of(notification));

        doNothing().when(notificationRepository).delete(notification);

        notificationService.deleteNotification(notification.getId());

        verify(notificationRepository, times(1)).findById(notification.getId());
        verify(notificationRepository, times(1)).delete(notification);
    }

    @Test
    void deleteNotification_Failure_NotFound() {
        when(notificationRepository.findById(notification.getId()))
            .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class, 
            () -> notificationService.deleteNotification(notification.getId()));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Notification not found", exception.getReason());

        verify(notificationRepository, times(1)).findById(notification.getId());
        verify(notificationRepository, never()).delete(notification);
    }

    @Test
    void getAllNotifications_Success_ReturnNotifications() {
        List<Notification> notifications = List.of(notification);
        when(notificationRepository.findAll()).thenReturn(notifications);

        List<Notification> result = notificationService.getAllNotifications();

        assertEquals(1, result.size());
        assertSame(notification, result.get(0));
        
        verify(notificationRepository, times(1)).findAll();
    }

    @Test
    void getAllNotifications_Failure_ReturnEmpty() {
        List<Notification> notifications = List.of();
        when(notificationRepository.findAll()).thenReturn(notifications);

        List<Notification> result = notificationService.getAllNotifications();

        assertEquals(0, result.size());
        
        verify(notificationRepository, times(1)).findAll();
    }

    @Test
    void getNotificationById_Success_ReturnNotification() {
        when(notificationRepository.findById(notification.getId()))
            .thenReturn(Optional.of(notification));

        Notification result = notificationService.getNotificationById(notification.getId());

        assertSame(notification, result);
        
        verify(notificationRepository, times(1)).findById(notification.getId());
    }

    @Test
    void getNotificationById_Failure_NotFound() {
        when(notificationRepository.findById(notification.getId()))
            .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class, 
            () -> notificationService.getNotificationById(notification.getId()));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Notification not found", exception.getReason());
        
        verify(notificationRepository, times(1)).findById(notification.getId());
    }

    @Test
    void getNotificationByUserId_Success_ReturnNotifications() {
        List<Notification> notifications = List.of(notification);
        when(notificationRepository.findByUserId(notification.getUser().getId()))
            .thenReturn(notifications);

        List<Notification> result = notificationService.getNotificationByUserId(notification.getUser().getId());

        assertEquals(1, result.size());
        assertSame(notification, result.get(0));
        
        verify(notificationRepository, times(1)).findByUserId(notification.getUser().getId());
    }

    @Test
    void getNotificationByUserId_Failure_ReturnEmpty() {
        List<Notification> notifications = List.of();
        when(notificationRepository.findByUserId(notification.getUser().getId()))
            .thenReturn(notifications);

        List<Notification> result = notificationService.getNotificationByUserId(notification.getUser().getId());

        assertEquals(0, result.size());
        
        verify(notificationRepository, times(1)).findByUserId(notification.getUser().getId());
    }

    @Test
    void mapToDTO_Success_ReturnNotificationDTO() {
        NotificationDTO expected = new NotificationDTO();
        expected.setMessage("New Notification!");
        expected.setType("EMAIL");
        expected.setUserId(user.getId());
        expected.setSentAt(notification.getSentAt());

        NotificationDTO result = notificationService.mapToDTO(notification);

        assertEquals(expected, result);
    }
}
