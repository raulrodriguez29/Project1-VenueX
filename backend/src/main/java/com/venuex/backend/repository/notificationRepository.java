package com.venuex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.venuex.backend.entities.notification;

public interface notificationRepository extends JpaRepository<notification, Integer>{

    List<notification> findByUserId(Integer userId);


}
