package com.venuex.backend.service;

import org.springframework.stereotype.Service;

import com.venuex.backend.entities.notification;
import com.venuex.backend.repository.notificationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class notificationService {
    private final notificationRepository repository;

    public notificationService(notificationRepository repository) {
        this.repository = repository;
    }

    public List<notification> getAllNotifications() {
        return repository.findAll();
    }

    public List<notification> getNotificationsByUserId(Integer userId) {
        return repository.findByUserId(userId);
    }

    public Optional<notification> getNotificationById(Integer id) {
        return repository.findById(id);
    }

    public notification saveNotification(notification notification) {
        return repository.save(notification);
    }

    public void deleteNotification(Integer id) {
        repository.deleteById(id);
    }
}
