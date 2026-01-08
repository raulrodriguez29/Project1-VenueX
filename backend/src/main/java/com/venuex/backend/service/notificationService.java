package com.venuex.backend.service;

import org.springframework.stereotype.Service;

import com.venuex.backend.entities.Notification;
import com.venuex.backend.repository.NotificationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    public List<Notification> getNotificationsByUserId(Integer userId) {
        return repository.findByUserId(userId);
    }

    public Optional<Notification> getNotificationById(Integer id) {
        return repository.findById(id);
    }

    public Notification saveNotification(Notification notification) {
        return repository.save(notification);
    }

    public void deleteNotification(Integer id) {
        repository.deleteById(id);
    }
}
