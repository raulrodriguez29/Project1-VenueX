package com.venuex.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.venuex.backend.DTO.NotificationDTO;
import com.venuex.backend.entities.Notification;
import com.venuex.backend.service.NotificationService;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;
    
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/notifications")
    public List<NotificationDTO> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        List<NotificationDTO> dtos = new ArrayList<>();

        for (Notification notification : notifications) {
            NotificationDTO dto = notificationService.mapToDTO(notification);
            dtos.add(dto);
        }

        return dtos;
    }

    @GetMapping("/notifications/{id}")
    public NotificationDTO getNotificationById(@PathVariable Integer id) {
        Notification notification = notificationService.getNotificationById(id);
        return notificationService.mapToDTO(notification);
    }

    @GetMapping("/user/notifications")
    @ResponseStatus(HttpStatus.OK)
    public List<NotificationDTO> getUserNotifications(@PathVariable Integer userId) {
        List<Notification> notifications = notificationService.getNotificationByUserId(userId);
        List<NotificationDTO> dtos = new ArrayList<>();

        for (Notification notification : notifications) {
            NotificationDTO dto = notificationService.mapToDTO(notification);
            dtos.add(dto);
        }

        return dtos;
    } 

    @PostMapping("/admin/notifications/send")
    @ResponseStatus(HttpStatus.CREATED)
    public NotificationDTO postNotification(@RequestBody Notification notification) {
        NotificationDTO wip = new NotificationDTO();
        return wip;
    }


}
