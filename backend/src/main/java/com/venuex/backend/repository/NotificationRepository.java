package com.venuex.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.venuex.backend.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer>{

    List<Notification> findByUserId(Integer userId);

    List<Notification> findByType(String type);

    List<Notification> findByUserIdAndType(Integer userId, String type);

    boolean existsByUserId(Integer userId);

    Integer countByUserId(Integer userId);


}
