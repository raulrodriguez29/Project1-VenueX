package com.venuex.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.NotificationDTO;
import com.venuex.backend.entities.Notification;
import com.venuex.backend.repository.NotificationRepository;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public NotificationDTO mapToDTO(Notification notification) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setId(notification.getId());
        notificationDTO.setUserId(notification.getUser().getId());
        notificationDTO.setType(notification.getType());
        notificationDTO.setMessage(notification.getMessage());
        notificationDTO.setSentAt(notification.getSentAt());
        
        return notificationDTO;
    }

    public Notification getNotificationById(Integer id) {
        return notificationRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found"));
    }

    public List<Notification> getNotificationByUserId(Integer userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification createNotification(Notification notification) {
        if (notificationRepository.existsById(notification.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Notification already exists");
        }
        return notificationRepository.save(notification);
    }

    public void deleteNotification(Integer id) {
        Notification existingNotification = notificationRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found"));
        notificationRepository.delete(existingNotification);
    }

}
