package com.venuex.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.venuex.backend.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer>{

    List<Notification> findByUserIdOrderBySentAtDesc(Integer userId);

}
