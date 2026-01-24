package com.venuex.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.venuex.backend.DTO.NotificationDTO;
import com.venuex.backend.service.NotificationService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;
    
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/user/notifications")
    @ResponseStatus(HttpStatus.OK)
    public List<NotificationDTO> getAllNotifications(HttpServletRequest request) {
        String userEmail = (String) request.getAttribute("userEmail");
        return notificationService.getUserNotification(userEmail);
    }

    @DeleteMapping("/user/notifications/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNotification(@PathVariable Integer id, HttpServletRequest request) {
        String userEmail = (String) request.getAttribute("userEmail");
        notificationService.deleteNotification(id ,userEmail);
    }


}
