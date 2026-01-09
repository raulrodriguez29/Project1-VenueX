package com.venuex.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venuex.backend.entities.Notification;
import com.venuex.backend.service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private NotificationService notificationService;
    
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }
}
